import React, { useState } from 'react'
import { Button } from 'primereact/button'
import 'primeflex/primeflex.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import WebLayout from '../../components/Layout/WebLayout'
import { useNavigate } from 'react-router-dom'
import { CartItem } from '../Cart/cart'

const mockCartItems: CartItem[] = [
    {
        id: 101,
        image: 'https://blocks.primereact.org/demo/images/blocks/ecommerce/ordersummary/order-summary-1-1.png',
        name: 'White long-hand shirt',
        color: 'Blue',
        size: 'Medium',
        quantity: 1,
        available: 100,
        price: 12.0,
        deliveryDate: 'Dec 23'
    },
    {
        id: 102,
        image: 'https://blocks.primereact.org/demo/images/blocks/ecommerce/ordersummary/order-summary-1-2.png',
        name: 'Jackie Chan',
        color: 'Yellow',
        size: 'Large',
        quantity: 1,
        available: 87,
        price: 24.0,
        deliveryDate: 'Dec 23'
    }
]

const CheckoutForm: React.FC = () => {
    
    const navigate = useNavigate()
    const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems)

    const handlePlaceOrder = () => {
        navigate('/ordersummary')
    }

    const price = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const discount = 12
    const total = price - discount

    return (
        <WebLayout>
            <div className="surface-50 px-4 py-8 md:px-6 lg:px-8">
                <div className="text-900 font-medium text-3xl mb-5">
                    Your order is almost done
                </div>

                <div className="grid -mr-3 -ml-3">
                    <div className="col-12 lg:col-9 p-3">
                        <div className="px-0 py-4 lg:px-4 surface-card border-round shadow-2">
                            {/* Address Section */}
                            <div className="flex">
                                <div
                                    className="flex flex-column align-items-center ml-3"
                                    style={{ width: '2rem' }}
                                >
                                    <span
                                        className="bg-green-500 text-0 flex align-items-center justify-content-center border-circle"
                                        style={{ minWidth: '3rem', minHeight: '3rem' }}
                                    >
                                        <i className="pi pi-directions text-xl" />
                                    </span>
                                    <div
                                        className="h-full border-dashed border-1 border-green-500"
                                        style={{ minHeight: '12rem' }}
                                    />
                                </div>

                                <div className="ml-0 lg:ml-5 p-2 flex-auto">
                                    <div className="mb-3">
                                        <span className="text-900 text-xl block ml-2">Address</span>
                                    </div>

                                    <div className="grid flex-column lg:flex-row">
                                        <div className="col p-3">
                                            <div className="flex flex-column border-round border-1 surface-border p-4 cursor-pointer hover:border-primary transition-duration-150 border-primary">
                                                <div className="flex justify-content-between mb-3">
                                                    <span className="text-900 text-xl font-medium">Home</span>
                                                    <span className="text-600 font-medium">
                                                        <i className="pi pi-pencil mr-2" /> Edit
                                                    </span>
                                                </div>
                                                <span className="inline-block text-600 mb-3">
                                                    Jacob Obrechtstraat 5, 1071 KC Amsterdam The Netherlands
                                                </span>
                                                <span className="inline-block text-600">
                                                    <i className="pi pi-mobile mr-2" /> +123456789
                                                </span>
                                            </div>
                                        </div>

                                        <div className="col p-3">
                                            <div className="flex flex-column border-round border-1 surface-border p-4 cursor-pointer hover:border-primary transition-duration-150">
                                                <div className="flex justify-content-between mb-3">
                                                    <span className="text-900 text-xl font-medium">Office</span>
                                                    <span className="text-600 font-medium">
                                                        <i className="pi pi-pencil mr-2" /> Edit
                                                    </span>
                                                </div>
                                                <span className="inline-block text-600 mb-3">
                                                    Jacob Obrechtstraat 5, 1072 KC Amsterdam The Netherlands
                                                </span>
                                                <span className="inline-block text-600">
                                                    <i className="pi pi-mobile mr-2" /> +123456789
                                                </span>
                                            </div>
                                        </div>

                                        <div className="col p-3">
                                            <div className="flex h-full flex-column justify-content-center align-items-center text-center py-5 border-round border-1 surface-border surface-100 cursor-pointer hover:border-primary transition-duration-150">
                                                <span className="text-600 border-circle border-2 w-2rem h-2rem flex align-items-center justify-content-center">
                                                    <i className="pi pi-fw pi-plus" />
                                                </span>
                                                <span className="text-600 mt-3">Add New Address</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Cart Section */}
                            <div className="flex">
                                <div className="flex flex-column align-items-center ml-3" style={{ width: '2rem' }}>
                                    <span
                                        className="bg-green-500 text-0 flex align-items-center justify-content-center border-circle"
                                        style={{ minWidth: '3rem', minHeight: '3rem' }}
                                    >
                                        <i className="pi pi-image text-xl" />
                                    </span>
                                    <div
                                        className="h-full border-dashed border-1 surface-border"
                                        style={{ minHeight: '12rem' }}
                                    />
                                </div>

                                <div className="ml-0 lg:ml-5 p-2 flex-auto">
                                    <div className="mb-3">
                                        <span className="text-900 text-xl block ml-2">Cart</span>
                                    </div>
                                    {/* item */}
                                    {cartItems.map((item) => (
                                        <div className="p-2 flex flex-column lg:flex-row flex-wrap lg:align-items-center">
                                        <img
                                            src={item.image}
                                            className="w-8rem h-8rem mb-3 lg:mb-0 flex-shrink-0"
                                            alt="product"
                                        />
                                        <div className="flex-auto lg:ml-3">
                                            <div className="flex align-items-center justify-content-between mb-3">
                                                <span className="text-900 font-medium">{item.name}</span>
                                                <span className="text-900 font-medium">${item.price}</span>
                                            </div>
                                            <div className="text-600 text-sm mb-3">{item.size} | {item.color}</div>
                                            <div className="text-600 text-sm mb-3">x{item.quantity}</div>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                            </div>

                            {/* Payment Method Section */}
                            <div className="flex">
                                <div
                                    className="flex flex-column align-items-center ml-3"
                                    style={{ width: '2rem' }}
                                >
                                    <span
                                        className="bg-gray-200 text-500 flex align-items-center justify-content-center border-circle"
                                        style={{ minWidth: '3rem', minHeight: '3rem' }}
                                    >
                                        <i className="pi pi-credit-card text-xl" />
                                    </span>
                                </div>

                                <div className="ml-0 lg:ml-5 p-2 flex-auto">
                                    <div className="mb-3">
                                        <span className="text-900 text-xl block ml-2">Payment Method (Ship COD only)</span>
                                    </div>
                                    <div className="grid flex-column lg:flex-row">
                                        <div className="col p-3">
                                            <div className="flex flex-column border-round border-1 surface-border p-4 cursor-pointer hover:border-primary transition-duration-150 border-primary">
                                                <img
                                                    src="https://blocks.primereact.org/demo/images/blocks/ecommerce/checkoutform/checkoutform-1-5.png"
                                                    className="w-6rem"
                                                    alt="Visa"
                                                />
                                                <span className="inline-block text-900 text-lg lg:text-xl mt-3">
                                                    **** **** **** 1234
                                                </span>
                                                <div className="flex justify-content-between align-items-center mt-3">
                                                    <span className="inline-block text-600 text-sm">
                                                        Cardholder Name
                                                    </span>
                                                    <span className="inline-block text-600 text-sm text-right">
                                                        Expiry Date
                                                    </span>
                                                </div>
                                                <div className="flex justify-content-between align-items-center mt-3">
                                                    <span className="inline-block text-900 font-bold">
                                                        John Warden
                                                    </span>
                                                    <span className="inline-block text-900 font-bold">12/25</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col p-3">
                                            <div className="flex h-full flex-column justify-content-center align-items-center text-center py-5 border-round border-1 surface-border surface-100 cursor-pointer hover:border-primary transition-duration-150">
                                                <span className="text-600 border-circle border-2 w-2rem h-2rem flex align-items-center justify-content-center">
                                                    <i className="pi pi-fw pi-plus" />
                                                </span>
                                                <span className="text-600 mt-3 text-center">
                                                    Add New Credit Card
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="col-12 lg:col-3 p-3">
                        <div className="surface-card p-4 border-round shadow-2">
                            <div className="border-bottom-1 surface-border pb-4">
                                <span className="text-900 text-xl block">Order Summary</span>
                            </div>
                            <div className="border-bottom-1 surface-border my-3 py-2">
                                <div className="flex justify-content-between mb-3">
                                    <span className="text-900">Price</span>
                                    <span className="text-900">${price}</span>
                                </div>
                                <div className="flex justify-content-between mb-3">
                                    <span className="text-900">Delivery</span>
                                    <span className="text-green-500">Free</span>
                                </div>
                                <div className="flex justify-content-between mb-3">
                                    <span className="text-900">Discount</span>
                                    <span className="text-900">${discount}</span>
                                </div>
                            </div>
                            <div className="border-bottom-1 surface-border my-3 py-2">
                                <div className="flex justify-content-between mb-3">
                                    <span className="text-900 font-medium">Total</span>
                                    <span className="text-900 font-bold">${total}</span>
                                </div>
                            </div>
                            <Button
                                label="Place Order"
                                className="surface-400 border-none hover:bg-primary w-full mt-3"
                                onClick={handlePlaceOrder}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </WebLayout>
    )
}

export default CheckoutForm