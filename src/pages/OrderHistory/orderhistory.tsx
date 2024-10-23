import React from 'react'
import { Divider } from 'primereact/divider'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import 'primeflex/primeflex.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import WebLayout from '../../components/Layout/WebLayout'
import { Link } from 'react-router-dom'

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

const orders: Order[] = [
    {
        orderNumber: '45123',
        orderDate: '7 February 2023',
        totalAmount: '$123.00',
        items: [
            {
                image: 'https://blocks.primereact.org/demo/images/blocks/ecommerce/ordersummary/order-summary-1-1.png',
                name: 'Product Name Placeholder A Little Bit Long One',
                color: 'White',
                size: 'Small',
                price: '$12',
                status: 'Delivered',
                date: '7 February 2023'
            },
            {
                image: 'https://blocks.primereact.org/demo/images/blocks/ecommerce/ordersummary/order-summary-1-2.png',
                name: 'Product Name Placeholder A Little Bit Long One',
                color: 'White',
                size: 'Small',
                price: '$12',
                status: 'Delivered',
                date: '7 February 2023'
            }
        ]
    },
    {
        orderNumber: '45124',
        orderDate: '8 February 2023',
        totalAmount: '$145.00',
        items: [
            {
                image: '/demo/images/blocks/ecommerce/orderhistory/orderhistory-1-3.png',
                name: 'Another Product Name Placeholder',
                color: 'Black',
                size: 'Medium',
                price: '$22',
                status: 'Delivered',
                date: '8 February 2023'
            },
            {
                image: '/demo/images/blocks/ecommerce/orderhistory/orderhistory-1-4.png',
                name: 'Another Product Name Placeholder',
                color: 'Red',
                size: 'Large',
                price: '$25',
                status: 'Delivered',
                date: '8 February 2023'
            }
        ]
    }
]

const OrderHistory: React.FC = () => {
    return (
        <WebLayout>
            <div className="surface-ground px-4 py-8 md:px-6 lg:px-8">
                <div className="flex flex-column md:flex-row justify-content-between align-items-center mb-4">
                    <div className="flex flex-column text-center md:text-left">
                        <span className="text-900 text-3xl font-medium mb-2">My Orders</span>
                        <span className="text-600 text-xl">History of all your orders</span>
                    </div>
                    <span className="p-input-icon-right mt-5 mb-2 md:mt-0 md:mb-0 w-full lg:w-25rem">
                        <i className="pi pi-search text-gray-400"></i>
                        <InputText className="w-full lg:w-25rem surface-50" placeholder="Search" />
                    </span>
                </div>

                {orders.map((order, orderIndex) => (
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
                        </div>

                        {order.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="col-12">
                                <div className="p-2 my-4 flex flex-column lg:flex-row justify-content-between align-items-center">
                                    <div className="flex flex-column lg:flex-row justify-content-center align-items-center px-2">
                                        <img
                                            src={item.image}
                                            alt="product"
                                            className="w-8rem h-8rem mr-3 flex-shrink-0"
                                        />
                                        <div className="flex flex-column my-auto text-center md:text-left">
                                            <span className="text-900 font-medium mb-3 mt-3 lg:mt-0">{item.name}</span>
                                            <span className="text-600 text-sm mb-3">
                                                {item.color} | {item.size}
                                            </span>
                                            <Button
                                                label={`Buy Again | ${item.price}`}
                                                className="p-button-outlined p-button-primary w-9rem mx-auto lg:mx-0"
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className="bg-green-50 mr-0 lg:mr-3 mt-4 lg:mt-0 p-2 flex align-items-center"
                                        style={{ borderRadius: '2.5rem' }}
                                    >
                                        <span
                                            className="bg-green-500 text-white flex align-items-center justify-content-center border-circle mr-2"
                                            style={{ minWidth: '2rem', minHeight: '2rem' }}
                                        >
                                            <i className="pi pi-check"></i>
                                        </span>
                                        <span className="text-green-600">
                                            {item.status} on {item.date}
                                        </span>
                                    </div>
                                </div>
                                <Divider className="w-full block lg:hidden surface-border" />
                            </div>
                        ))}

                        <div className="col-12 p-0 flex border-top-1 surface-border">
                            <Link
                                to={`/ordersummary?${order.orderNumber}`}
                                tabIndex={0}
                                className="cursor-pointer py-4 flex flex-column md:flex-row text-center justify-content-center align-items-center font-medium text-primary hover:bg-primary hover:text-0 transition-duration-150 w-full"
                                style={{ borderBottomLeftRadius: '6px' }}
                            >
                                <i className="pi pi-folder mr-2 mb-2 md:mb-0"></i>Order details
                            </Link>
                            <a
                                tabIndex={0}
                                className="cursor-pointer py-4 flex flex-column md:flex-row text-center justify-content-center align-items-center font-medium text-primary hover:bg-primary hover:text-0 transition-duration-150 w-full"
                            >
                                <i className="pi pi-refresh mr-2 mb-2 md:mb-0"></i>Return
                            </a>
                            <a
                                tabIndex={0}
                                className="cursor-pointer py-4 flex flex-column md:flex-row text-center justify-content-center align-items-center font-medium text-primary hover:bg-primary hover:text-0 transition-duration-150 w-full"
                            >
                                <i className="pi pi-file mr-2 mb-2 md:mb-0"></i>View Invoice
                            </a>
                            <a
                                tabIndex={0}
                                className="cursor-pointer py-4 flex flex-column md:flex-row text-center justify-content-center align-items-center font-medium text-primary hover:bg-primary hover:text-0 transition-duration-150 w-full"
                                style={{ borderBottomRightRadius: '6px' }}
                            >
                                <i className="pi pi-comment mr-2 mb-2 md:mb-0"></i>Write a Review
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </WebLayout>
    )
}

export default OrderHistory
