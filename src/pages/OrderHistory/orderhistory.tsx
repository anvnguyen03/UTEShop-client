import React, { Suspense, useEffect, useState } from 'react'
import { Divider } from 'primereact/divider'
import { Button } from 'primereact/button'
import 'primeflex/primeflex.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import WebLayout from '../../components/Layout/WebLayout'
import { Link } from 'react-router-dom'
import './orderhistory.css'
import { TabPanel, TabPanelHeaderTemplateOptions, TabView } from 'primereact/tabview'
import { ProgressSpinner } from 'primereact/progressspinner'
import { IGetOrderHistory } from '../../types/backend'
import * as api from '../../api/api'
import { Badge } from 'primereact/badge'

interface OrderItem {
    image: string
    name: string
    color: string
    size: string
    price: string
    status: string
    date: string
}

interface Order {
    orderNumber: string
    orderDate: string
    totalAmount: string
    items: OrderItem[]
}

const OrderHistory: React.FC = () => {

    const [orders, setOrders] = useState<IGetOrderHistory[]>([])
    const [expenses, setExpenses] = useState<number>(0)
    const [newOrders, setNewOrders] = useState<IGetOrderHistory[]>([])
    const [confirmedOrders, setConfirmedOrders] = useState<IGetOrderHistory[]>([])
    const [packagingOrders, setPackagingOrders] = useState<IGetOrderHistory[]>([])
    const [shippingOrders, setShippingOrders] = useState<IGetOrderHistory[]>([])
    const [deliveredOrders, setDeliverdOrders] = useState<IGetOrderHistory[]>([])
    const [canceledOrders, setCanceledOrders] = useState<IGetOrderHistory[]>([])

    useEffect(() => {
        const getOrderHistory = async () => {
            const response: any = await api.getOrderHistory()
            if (response?.data) {
                setOrders(response.data)
            }
        }
        getOrderHistory()
    }, [])

    useEffect(() => {
        const calculateExpenses = () => {
            const totalDeviredExpenses = orders
                .filter(order => order.status === 'delivered')
                .reduce((sum, order) => sum + parseFloat(order.totalAmount.replace('$', '')), 0)
            setExpenses(totalDeviredExpenses)
        }
        calculateExpenses()
    }, [orders])

    useEffect(() => {
        const calculateOrdersByStatus = () => {
            setNewOrders(orders.filter(order => order.status === 'place order'))
            setConfirmedOrders(orders.filter(order => order.status === 'confirmed'))
            setPackagingOrders(orders.filter(order => order.status === 'packaging'))
            setShippingOrders(orders.filter(order => order.status === 'shipping'))
            setDeliverdOrders(orders.filter(order => order.status === 'delivered'))
            setCanceledOrders(orders.filter(order => order.status === 'canceled'))
        }
        calculateOrdersByStatus()
    }, [orders])

    const renderOrders = (renderOrders: IGetOrderHistory[]): JSX.Element => (
        <>
            {renderOrders?.map((order, orderIndex) => (
                <div key={orderIndex} className="surface-card grid grid-nogutter border-round shadow-2 mb-5">
                    <div className="col-12 flex p-2 surface-100 border-round-top">
                        <div className="p-2 flex-auto text-center md:text-left">
                            <span className="text-700 block">Order Number</span>
                            <span className="text-900 font-medium block mt-2">{order.orderNumber}</span>
                        </div>
                        <Divider layout="vertical" className="mx-0 lg:mx-3 surface-border" />
                        <div className="p-2 flex-auto text-center md:text-left">
                            <span className="text-700 block">Order Date</span>
                            <span className="text-900 font-medium block mt-2">{order.orderDate}</span>
                        </div>
                        <Divider layout="vertical" className="mx-0 lg:mx-3 surface-border" />
                        <div className="p-2 flex-auto text-center md:text-left">
                            <span className="text-700 block">Total Amount</span>
                            <span className="text-900 font-medium block mt-2">{order.totalAmount}</span>
                        </div>
                        <Divider layout="vertical" className="mx-0 lg:mx-3 surface-border" />
                        <div className="p-2 flex-auto text-center md:text-left">
                            <span className="text-700 block">Status</span>
                            <span className="text-900 font-medium block mt-2">
                                <span className="text-green-600">
                                    {order.status}
                                </span></span>
                        </div>
                    </div>

                    {order.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="col-12">
                            <div className="p-2 my-4 flex flex-column lg:flex-row justify-content-between align-items-center">
                                <div className="flex flex-column lg:flex-row justify-content-center align-items-center px-2">
                                    <img
                                        src={item.image[0]}
                                        alt="product"
                                        className="w-8rem h-8rem mr-3 flex-shrink-0"
                                    />
                                    <div className="flex flex-column my-auto text-center md:text-left">
                                        <span className="text-900 font-medium mb-3 mt-3 lg:mt-0">{item.name}</span>
                                        <span className="text-600 text-sm mb-3">
                                            Quantity x {item.quantity}
                                        </span>
                                    </div>
                                </div>

                                <div
                                    className="bg-green-50 mr-0 lg:mr-3 mt-4 lg:mt-0 p-2 flex align-items-center"
                                    style={{ borderRadius: '2.5rem' }}
                                >
                                    <Button
                                        label={`Buy Again | ${item.price}`}
                                        className="p-button-outlined p-button-primary w-9rem mx-auto lg:mx-0 mr-5"
                                    />
                                </div>
                            </div>
                            <Divider className="w-full block lg:hidden surface-border" />
                        </div>
                    ))}

                    <div className="col-12 p-0 flex border-top-1 surface-border">
                        <Link
                            to={`/ordersummary?id=${order.orderNumber}`}
                            tabIndex={0}
                            className="cursor-pointer py-4 flex flex-column md:flex-row text-center justify-content-center align-items-center font-medium text-primary hover:bg-primary hover:text-0 transition-duration-150 w-full"
                            style={{ borderBottomLeftRadius: '6px' }}
                        >
                            <i className="pi pi-folder mr-2 mb-2 md:mb-0"></i>See order details
                        </Link>

                    </div>
                </div>
            ))}
        </>
    )

    const tabHeaderTemplate = (badgeValue: number, content: string) => {
        return (options: TabPanelHeaderTemplateOptions) => (
            <div className="flex align-items-center gap-2 p-3" style={{ cursor: 'pointer' }} onClick={options.onClick}>
                <span className="font-bold white-space-nowrap">{content}</span>
                <Badge value={badgeValue} />
            </div>
        )
    };

    return (
        <WebLayout>
            <div className="surface-ground px-4 py-8 md:px-6 lg:px-8">
                <div className="flex flex-column md:flex-row justify-content-between align-items-center mb-4">
                    <div className="flex flex-column text-center md:text-left">
                        <span className="text-900 text-3xl font-medium mb-2">My Orders</span>
                        <span className="text-600 text-xl">Track your orders</span>
                    </div>
                </div>

                <div className="grid mb-2">
                    <div className="col-12 lg:col-6 xl:col-3">
                        <div className="statistic-card mb-0">
                            <div className="flex justify-content-between mb-3">
                                <div>
                                    <span className="block text-500 font-medium mb-3">Total Orders</span>
                                    <div className="text-900 font-medium text-xl">{orders.length}</div>
                                </div>
                                <div className="flex align-items-center justify-content-center
                                 bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                    <i className="pi pi-receipt text-blue-500 text-xl"></i>
                                </div>
                            </div>
                            <span className="text-green-500 font-medium">1 new </span>
                            <span className="text-500">since last visit</span>
                        </div>
                    </div>

                    <div className="col-12 lg:col-6 xl:col-3">
                        <div className="statistic-card mb-0">
                            <div className="flex justify-content-between mb-3">
                                <div>
                                    <span className="block text-500 font-medium mb-3">Expenses</span>
                                    <div className="text-900 font-medium text-xl">${expenses.toLocaleString('en-US')}</div>
                                </div>
                                <div className="flex align-items-center justify-content-center
                                 bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                    <i className="pi pi-dollar text-orange-500 text-xl"></i>
                                </div>
                            </div>
                            <span className="text-green-500 font-medium">Only delivered orders</span>
                        </div>
                    </div>

                    <div className="col-12 lg:col-6 xl:col-3">
                        <div className="statistic-card mb-0">
                            <div className="flex justify-content-between mb-3">
                                <div>
                                    <span className="block text-500 font-medium mb-3">New orders</span>
                                    <div className="text-900 font-medium text-xl">{newOrders.length}</div>
                                </div>
                                <div className="flex align-items-center justify-content-center
                                 bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                    <i className="pi pi-sparkles text-cyan-500 text-xl"></i>
                                </div>
                            </div>
                            <span className="text-green-500 font-medium">1 new </span>
                            <span className="text-500">since last visit</span>
                        </div>
                    </div>

                    <div className="col-12 lg:col-6 xl:col-3">
                        <div className="statistic-card mb-0">
                            <div className="flex justify-content-between mb-3">
                                <div>
                                    <span className="block text-500 font-medium mb-3">Delivered</span>
                                    <div className="text-900 font-medium text-xl">{deliveredOrders.length}</div>
                                </div>
                                <div className="flex align-items-center justify-content-center
                                 bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                    <i className="pi pi-box text-purple-500 text-xl"></i>
                                </div>
                            </div>
                            <span className="text-green-500 font-medium">0 new </span>
                            <span className="text-500">since last visit</span>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <TabView>
                        <TabPanel header="All">
                            <Suspense fallback={<ProgressSpinner />}>
                                {renderOrders(orders)}
                            </Suspense>
                        </TabPanel>
                        <TabPanel header="New orders" headerClassName="flex align-items-center">
                            {renderOrders(orders.filter(order => order.status === 'place order'))}
                        </TabPanel>
                        <TabPanel header="Confirmed" headerClassName="flex align-items-center">
                            {renderOrders(orders.filter(order => order.status === 'confirmed'))}
                        </TabPanel>
                        <TabPanel header="Packaging" headerClassName="flex align-items-center">
                            {renderOrders(orders.filter(order => order.status === 'packaging'))}
                        </TabPanel>
                        <TabPanel header="Shipping" headerClassName="flex align-items-center">
                            {renderOrders(orders.filter(order => order.status === 'shipping'))}
                        </TabPanel>
                        <TabPanel header="Delivered" headerClassName="flex align-items-center">
                            {renderOrders(orders.filter(order => order.status === 'delivered'))}
                        </TabPanel>
                        <TabPanel header="Canceled" headerClassName="flex align-items-center">
                            {renderOrders(orders.filter(order => order.status === 'canceled'))}
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        </WebLayout>
    )
}

export default OrderHistory
