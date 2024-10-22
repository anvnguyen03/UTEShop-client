import React, { useState } from 'react'
import { Button } from 'primereact/button'
import 'primeflex/primeflex.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import WebLayout from '../../components/Layout/WebLayout'
import { Steps } from 'primereact/steps'

const mockOrderItems = [
    {
        id: 101,
        image: 'https://blocks.primereact.org/demo/images/blocks/ecommerce/ordersummary/order-summary-1-1.png',
        name: 'White long-hand shirt',
        color: 'Blue',
        size: 'Medium',
        quantity: 1,
        price: 12.0,
    },
    {
        id: 102,
        image: 'https://blocks.primereact.org/demo/images/blocks/ecommerce/ordersummary/order-summary-1-2.png',
        name: 'Jackie Chan',
        color: 'Yellow',
        size: 'Large',
        quantity: 1,
        price: 24.0,
    }
]

const OrderSummary: React.FC = () => {

    const [loading, setLoading] = useState(false);

    const load = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000)
    }

    const handlePrintClick = () => {

    }

    const process = [
        {
            label: 'Ordered'
        },
        {
            label: 'Packaging'
        },
        {
            label: 'Shipping'
        },
        {
            label: 'Delivered'
        }
    ]

    const price = mockOrderItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const discount = 12
    const total = price - discount
    return (
        <WebLayout>
            <div className="surface-section px-4 py-8 md:px-6 lg:px-8">
                <span className="text-700 text-xl">Thanks!</span>
                <div className="text-900 font-bold text-4xl my-2">
                    Successful Place Order 🚀
                </div>
                <p className="text-700 text-xl mt-0 mb-4 p-0">
                    Wait for order confirmation.
                </p>
                <div
                    style={{
                        height: '3px',
                        background: 'linear-gradient(90deg, #2196F3 0%, rgba(33, 150, 243, 0) 50%)',
                    }}
                />
                <p className='font-bold'>Order Processing</p>
                <Steps readOnly model={process} activeIndex={0}/>

                <div className="flex flex-column sm:flex-row sm:align-items-center sm:justify-content-between py-5">
                    <div className="mb-3 sm:mb-0">
                        <span className="font-medium text-xl text-900 mr-2">Order number:</span>
                        <span className="font-medium text-xl text-blue-500">451234</span>
                    </div>
                    <div>
                        <Button 
                            className="mr-2 "
                            outlined
                            label="Cancel" 
                            icon="pi pi-times" 
                            severity="danger"
                            loading={loading} 
                            onClick={load} />
                        <Button
                            disabled
                            outlined
                            label="Review"
                            icon="pi pi-star"
                            severity="help"
                            onClick={handlePrintClick}
                        />
                    </div>
                </div>

                <div className="border-round surface-border border-1">
                    <ul className="list-none p-0 m-0">
                        {mockOrderItems.map((item) => (
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
                                    <span className="text-600 mb-3">{`${item.color} | ${item.size}`}</span>
                                    <span className="text-900 font-medium">Quantity {item.quantity}</span>
                                </div>
                                <span className="text-900 font-medium text-lg ml-auto">
                                    ${item.price.toFixed(2)}
                                </span>
                            </li>
                        ))}
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
