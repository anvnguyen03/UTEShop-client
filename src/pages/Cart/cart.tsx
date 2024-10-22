// Cart.tsx
import React, { useState } from 'react';
import { Button } from 'primereact/button';
import 'primeflex/primeflex.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import WebLayout from '../../components/Layout/WebLayout';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { useNavigate } from 'react-router-dom';

export interface CartItem {
    id: number
    image: string
    name: string
    size: string
    price: number
    quantity: number
    available: number
    deliveryDate: string
}

const mockCartItems: CartItem[] = [
    {
        id: 101,
        image: 'https://www.primefaces.org/cdn/primereact/images/product/headphones.jpg',
        name: 'Excellent',
        size: 'Medium',
        price: 20.0,
        quantity: 1,
        available: 8,
        deliveryDate: 'Dec 23',
    },
    {
        id: 102,
        image: 'https://www.primefaces.org/cdn/primereact/images/product/light-green-t-shirt.jpg',
        name: 'Holly Water',
        size: 'Medium',
        price: 62.0,
        quantity: 1,
        available: 2,
        deliveryDate: 'Dec 23',
    },
]

const CartPage: React.FC = () => {
    const navigate = useNavigate()
    const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems)

    const handleQuantityChange = (e: InputNumberValueChangeEvent, itemId: number) => {
        const updatedCart = cartItems.map((item) =>
            item.id === itemId ? { ...item, quantity: e.value || 0 } : item
        );
        setCartItems(updatedCart)
    }

    const handleRemove = (itemId: number) => {
        const updatedCart = cartItems.filter((item) => item.id !== itemId);
        setCartItems(updatedCart)
    }

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const total = subtotal

    const handleCheckout = async () => {
        navigate('/checkout')
    }

    return (
        <WebLayout>
            <div className="surface-section px-4 py-8 md:px-6 lg:px-8">
                <div className="flex flex-column align-items-center mb-6">
                    <div className="text-900 text-4xl mb-4 font-medium">
                        Your cart total is ${subtotal.toFixed(2)}
                    </div>
                    <p className="text-600 font-medium text-xl mt-0 mb-4">
                        FREE SHIPPING AND RETURN
                    </p>
                    <Button label="Check Out" onClick={handleCheckout}/>
                </div>

                <ul className="list-none p-0 m-0">
                    {cartItems.map((item, index) => (
                        <li
                            key={index}
                            className="flex flex-column md:flex-row py-6 border-top-1 border-bottom-1 surface-border md:align-items-center"
                        >
                            <img
                                src={item.image}
                                className="w-12rem flex-shrink-0 mx-auto md:mx-0"
                                alt={item.name}
                            />
                            <div className="flex-auto py-5 md:pl-5">
                                <div className="flex flex-wrap align-items-start sm:align-items-center sm:flex-row sm:justify-content-between surface-border pb-6">
                                    <div className="w-full sm:w-6 flex flex-column">
                                        <span className="text-900 text-xl font-medium mb-3">
                                            {item.name}
                                        </span>
                                        <span className="text-600">{item.size}</span>
                                    </div>

                                    <div className="w-full sm:w-6 flex align-items-start justify-content-end mt-3 sm:mt-0">
                                        <div className="flex flex-column sm:align-items-end">
                                            <span className="text-900 text-2xl font-medium mb-2 sm:mb-3">
                                                ${item.price.toFixed(2)}
                                            </span>
                                            <a
                                                className="cursor-pointer text-pink-500 font-medium hover:text-pink-600 transition-colors transition-duration-300"
                                                onClick={() => handleRemove(item.id)}
                                            >
                                                Remove
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-column">
                                    <span className='inline-flex align-items-center mb-3'>
                                        <span className="text-600 pr-4">
                                            <span className="font-bold">Quantity: </span>
                                        </span>
                                        <InputNumber 
                                            value={item.quantity} 
                                            onValueChange={(e) => handleQuantityChange(e, item.id)} 
                                            mode="decimal" 
                                            showButtons min={1} max={item.available} 
                                            pt={{ 
                                                input: { 
                                                    root: { className: 'w-5rem' } 
                                                } 
                                            }} />
                                    </span>
                                    <span className="inline-flex align-items-center mb-3">
                                        <i className="pi pi-envelope text-600 mr-2" />
                                        <span className="text-600 mr-2">Order today.</span>
                                    </span>
                                    <span className="inline-flex align-items-center mb-3">
                                        <i className="pi pi-send text-600 mr-2" />
                                        <span className="text-600">
                                            Delivery by <span className="font-bold">{item.deliveryDate}</span>
                                        </span>
                                    </span>
                                    <span className="flex align-items-center">
                                        <i className="pi pi-exclamation-triangle text-600 mr-2" />
                                        <span className="text-600">Only {item.available} Available.</span>
                                    </span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="flex mt-6">
                    <div className="w-12rem hidden md:block"></div>
                    <ul className="list-none py-0 pr-0 pl-0 md:pl-5 mx-0 mb-0 flex-auto">
                        <li className="flex justify-content-between mb-4">
                            <span className="text-xl text-900">Subtotal</span>
                            <span className="text-xl text-900">${subtotal.toFixed(2)}</span>
                        </li>
                        <li className="flex justify-content-between mb-4">
                            <span className="text-xl text-900">Shipping</span>
                            <span className="text-xl text-900">Free</span>
                        </li>
                        <li className="flex justify-content-between border-top-1 surface-border mb-4 pt-4">
                            <span className="text-xl text-900 font-bold text-3xl">Total</span>
                            <span className="text-xl text-900 font-bold text-3xl">
                                ${total.toFixed(2)}
                            </span>
                        </li>
                        <li className="flex justify-content-end">
                            <Button label="Check Out" onClick={handleCheckout}/>
                        </li>
                    </ul>
                </div>
            </div>
        </WebLayout>
    )
}

export default CartPage
