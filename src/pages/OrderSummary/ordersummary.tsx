import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'primereact/button'
import 'primeflex/primeflex.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import WebLayout from '../../components/Layout/WebLayout'
import { Steps } from 'primereact/steps'
import { useLocation, useSearchParams } from 'react-router-dom'
import { Toast } from 'primereact/toast'
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog'
import { MenuItem } from 'primereact/menuitem'
import { Rating } from 'primereact/rating'
import { InputTextarea } from 'primereact/inputtextarea'
import { IGetOrderHistory, IOrderItem } from '../../types/backend'
import * as api from '../../api/api';

interface FormReview {
    productId: number
    rate: number | null
    content: string
}

const OrderSummary: React.FC = () => {

    const location = useLocation()
    const [searchParams] = useSearchParams();
    const toast = useRef<Toast>(null)
    const [isLoading, setLoading] = useState(false)
    const [isCancelDisabled, setCancelDisabled] = useState(false)
    const [isReviewDisabled, setReviewDisabled] = useState(true)

    const [isOrderCanceled, setOrderCanceled] = useState(false)
    const [selectedItem, setSelectedItem] = useState<IOrderItem>()
    const [formReview, setFormReview] = useState<FormReview>({ productId: 0, content: 'Excellent', rate: 1 })
    const [order, setOrder] = useState<IGetOrderHistory>()
    const [orderItems, setOrderItems] = useState<IOrderItem[]>([]);
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [total, setTotal] = useState(0);
    const [orderNumber, setOrderNumber] = useState("");
    const [activeIndex, setActiveIndex] = useState<number>(0)

    useEffect(() => {
        const getOrderItems = async () => {
            const orderId = localStorage.getItem("orderId") || searchParams.get("id");
            if (orderId) {
                setOrderNumber(orderId);
                const orderResponse: any = await api.getOrder(orderId);
                if (orderResponse?.data) {
                    setOrder(orderResponse.data)
                }

                const orderItemResponse: any = await api.getOrderItem(orderId);
                if (orderItemResponse?.data) {
                    setOrderItems(orderItemResponse.data);
                }
            }
        }
        getOrderItems();
    }, [searchParams]);

    useEffect(() => {
        setPrice(orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
        setDiscount(12);

        const calculatedTotal = price - discount;
        setTotal(calculatedTotal);

        const index = process.findIndex(step => step.label === order?.status)
        setActiveIndex(index)
        if (index > 1) {
            setCancelDisabled(true)
        }
        if (index == 4) {
            setReviewDisabled(false)
        }

        const isOrderCancel = order?.status === 'canceled' ? true : false
        setOrderCanceled(isOrderCancel)
        if (isOrderCancel == true) {
            setCancelDisabled(true)
        }

    }, [discount, orderItems, price])

    const acceptCancelOrder = () => {
        setLoading(true)

        setTimeout(() => {
            toast.current!.show({ severity: 'info', summary: 'Confirmed', detail: 'Order canceled', life: 2000 })
            setLoading(false)
            setCancelDisabled(true)
            setOrderCanceled(true)
        }, 2000)
    }

    const handleCancelClick = () => {
        confirmDialog({
            message: 'Do you want to cancel this order?',
            header: 'Cancel confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept: acceptCancelOrder,
        })
    }

    const process: MenuItem[] = [
        { label: 'place order' },
        { label: 'confirmed' },
        { label: 'packaging' },
        { label: 'shipping' },
        { label: 'delivered' }
    ]

    const canceledStep: MenuItem[] = [
        {
            icon: 'pi pi-times',
            label: 'Canceled',
            template: (<span
                className="inline-flex align-items-center justify-content-center align-items-center border-circle border-red-500 border-1 h-3rem w-3rem z-1 cursor-pointer"
                style={{ backgroundColor: 'var(--red-500)', color: 'var(--surface-b)', marginTop: '-25px' }}
            >
                <i className={'pi pi-times text-xl'} />
            </span>)
        }
    ]

    const showSuccess = () => {
        toast.current!.show({
            severity: 'success',
            summary: 'Success',
            detail: 'Order placed',
            life: 2000
        })
    }

    const handleReviewClick = (orderItem: IOrderItem) => {
        setSelectedItem(orderItem)
        setFormReview({ productId: orderItem.productId, content: 'Excellent', rate: 1 })
        confirmDialog({
            group: 'headless',
            message: 'Are you sure you want ?',
            header: 'Product review',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
        })
    }

    const submitReview = () => {
        console.log(formReview)
        setLoading(true)
        setTimeout(() => {
            toast.current?.show({ severity: 'info', summary: 'Done', detail: `Submit review for ${formReview.productId}`, life: 3000 });
            setLoading(false)
        }, 2000)
    }

    const handleInputChange = (field: keyof FormReview, value: any) => {
        setFormReview((prev) => ({ ...prev, [field]: value }))
    }

    useEffect(() => {
        if (location.state?.showSuccess) {
            showSuccess()
            console.log('show toast')
            // Xóa state sau khi đã hiển thị toast để không lặp lại
            window.history.replaceState({}, document.title)
        }
    }, [])
    return (
        <WebLayout>
            <div className="surface-section px-4 py-8 md:px-6 lg:px-8">
                <Toast ref={toast} position='top-right' />
                <span className="text-700 text-xl">Thanks!</span>
                {!isOrderCanceled ? (
                    <div className="text-900 font-bold text-4xl my-2">
                        Successful Place Order 🚀
                    </div>) : (
                    <div className="text-900 font-bold text-4xl my-2">
                        Order Canceled
                    </div>)
                }
                {!isOrderCanceled && <p className="text-700 text-xl mt-0 mb-4 p-0">
                    Wait for order confirmation.
                </p>}
                <div
                    style={{
                        height: '3px',
                        background: 'linear-gradient(90deg, #2196F3 0%, rgba(33, 150, 243, 0) 50%)',
                    }}
                />
                {!isOrderCanceled && <p className='font-bold'>Order Processing</p>}
                {!isOrderCanceled ? (
                    activeIndex >= 0 ? (
                        <Steps readOnly model={process} activeIndex={activeIndex} />
                    ) : null
                ) : (
                    <Steps readOnly model={canceledStep} activeIndex={0} />
                )}

                <div className="flex flex-column sm:flex-row sm:align-items-center sm:justify-content-between py-5">
                    <div className="mb-3 sm:mb-0">
                        <span className="font-medium text-xl text-900 mr-2">Order number:</span>
                        <span className="font-medium text-xl text-blue-500">{orderNumber}</span>
                    </div>
                    <ConfirmDialog />
                    <div>
                        <Button
                            visible={!isCancelDisabled}
                            className="mr-2 "
                            outlined
                            label="Cancel"
                            icon="pi pi-times"
                            severity="danger"
                            loading={isLoading}
                            onClick={handleCancelClick} />
                    </div>
                </div>

                <div className="border-round surface-border border-1">
                    <ul className="list-none p-0 m-0">
                        {orderItems.map((item) => (
                            <li
                                key={item.id}
                                className="p-3 border-bottom-1 surface-border flex align-items-start sm:align-items-center"
                            >
                                <img
                                    src={item.image}
                                    className="w-3rem sm:w-8rem flex-shrink-0 mr-3 shadow-2"
                                    alt={item.name}
                                />
                                <div className="flex flex-column">
                                    <span className="text-900 font-medium text-xl mb-2">{item.name}</span>
                                    <span className="text-900 font-medium">Quantity {item.quantity}</span>
                                    <span className="text-900 font-medium text-lg align-content-center">
                                        ${item.price.toFixed(2)}
                                    </span>
                                </div>
                                <Button
                                    className='ml-auto'
                                    visible={!isOrderCanceled && !isReviewDisabled}
                                    outlined
                                    label="Review"
                                    icon="pi pi-star"
                                    severity="help"
                                    onClick={() => handleReviewClick(item)}
                                />
                            </li>
                        ))}
                        {/* Review dialog */}
                        <ConfirmDialog
                            group="headless"
                            content={({ headerRef, contentRef, footerRef, hide, message }) => (
                                <div className="flex flex-column align-items-center p-5 surface-overlay border-round">
                                    <div className="border-circle bg-primary inline-flex justify-content-center align-items-center h-6rem w-6rem -mt-8">
                                        <i className="pi pi-pencil text-5xl"></i>
                                    </div>
                                    <span className="font-bold text-2xl block mb-2 mt-4" ref={headerRef}>
                                        {message.header}
                                    </span>
                                    <img
                                        src={selectedItem!.image}
                                        className="w-3rem sm:w-8rem flex-shrink-0 shadow-2 mb-3"
                                        alt={selectedItem!.name}
                                    />
                                    <Rating value={formReview.rate!} onChange={(e) => handleInputChange('rate', e.value)} cancel={false} />
                                    <div className="field">
                                        <label htmlFor="content" className="block mb-2">
                                            Review:
                                        </label>
                                        <InputTextarea
                                            id="content"
                                            name="content"
                                            rows={4}
                                            cols={30}
                                            value={formReview.content}
                                            onChange={(e) => handleInputChange('content', e.target.value)}
                                            autoResize
                                        />
                                    </div>

                                    <p className="mb-0" ref={contentRef}>
                                        {message.message}
                                    </p>
                                    <div className="flex align-items-center gap-2 mt-4" ref={footerRef}>
                                        <Button
                                            label="Submit"
                                            onClick={(event) => {
                                                hide(event)
                                                submitReview()
                                            }}
                                            className="w-8rem"
                                            loading={isLoading}
                                        ></Button>
                                        <Button
                                            label="Cancel"
                                            outlined
                                            onClick={(event) => {
                                                hide(event)
                                            }}
                                            className="w-8rem"
                                        ></Button>
                                    </div>
                                </div>
                            )}
                        />
                    </ul>
                </div>

                <div className="flex flex-wrap mt-5 pb-3">
                    {/* Shipping Address */}
                    <div className="w-full lg:w-6 pl-3">
                        <span className="font-medium text-900">Shipping Address</span>
                        <div className="flex flex-column text-900 mt-3 mb-5">
                            <span className="mb-1">Celeste Slater</span>
                            <span className="mb-1">606-3727 Ullamcorper. Roseville NH 11523</span>
                            <span>(786) 713-8616</span>
                        </div>

                        <span className="font-medium text-900">Payment</span>
                        <div className="flex align-items-center mt-3">
                            <div className="flex flex-column">
                                <span className="text-900 mb-1">Ship CODE</span>
                            </div>
                        </div>
                    </div>

                    {/* Summary Section */}
                    <div className="w-full lg:w-6 pl-3 lg:pl-0 lg:pr-3 flex align-items-end mt-5 lg:mt-0">
                        <ul className="list-none p-0 m-0 w-full">
                            <li className="mb-3">
                                <span className="font-medium text-900">Summary</span>
                            </li>
                            <li className="flex justify-content-between mb-3">
                                <span className="text-900">Subtotal</span>
                                <span className="text-900 font-medium text-lg">${price}</span>
                            </li>
                            <li className="flex justify-content-between mb-3">
                                <span className="text-900">Shipping</span>
                                <span className="text-900 font-medium text-lg text-green-500">Free</span>
                            </li>
                            <li className="flex justify-content-between mb-3">
                                <span className="text-900">Discount</span>
                                <span className="text-900 font-medium text-lg">${discount}</span>
                            </li>
                            <li className="flex justify-content-between border-top-1 surface-border py-3">
                                <span className="text-900 font-medium">Total</span>
                                <span className="text-900 font-bold text-lg">${total}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </WebLayout>
    )
}

export default OrderSummary;
