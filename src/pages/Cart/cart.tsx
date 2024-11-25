import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import 'primeflex/primeflex.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import WebLayout from '../../components/Layout/WebLayout';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { useNavigate } from 'react-router-dom';
import * as api from '../../api/api';
import { ICartItem } from '../../types/backend';

const CartPage: React.FC = () => {
    const navigate = useNavigate()
    const [cartItems, setCartItems] = useState<ICartItem[]>([]);
    const [selectedCartItems, setSelectedCartItems] = useState<ICartItem[]>([]);
    const [total, setTotal] = useState(0);
    const [subtotal, setSubtotal] = useState(0);

    useEffect(() => {
        console.log(cartItems.length);
        const getCarts = async() => {
            const response: any = await api.getCarts();
            if (response?.data) {
                setCartItems(response.data.cartItems);
            }
        }
        getCarts();
        
        console.log(subtotal);
    }, []);

    useEffect(() => {
        console.log("Hello: " + selectedCartItems);
        if(selectedCartItems.length > 0) {
            const calculatedSubtotal = selectedCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
            setSubtotal(calculatedSubtotal);
            setTotal(calculatedSubtotal);
        } else {
            setSubtotal(0);
            setTotal(0);
        }
        
    }, [selectedCartItems, cartItems]);

    const handleQuantityChange = (e: InputNumberValueChangeEvent, itemId: string) => {
        const updatedCart = cartItems.map((item) =>
            item.id === itemId ? { ...item, quantity: e.value || 0 } : item
        );
        setCartItems(updatedCart);
        setSubtotal(cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)); 
        setTotal(subtotal);
    }

    const handleRemove = (itemId: string) => {
        const updatedCartItems = cartItems.filter((cartItem) => cartItem.id !== itemId);
        const updatedSelectedCartItems = selectedCartItems.filter((cartItem) => cartItem.id !== itemId);
        setCartItems(updatedCartItems);
        setSelectedCartItems(updatedSelectedCartItems);
        const updateCart = async() => {
            const response: any = await api.updateCart(updatedCartItems);
            if (response?.data) {
                console.log(response.data);
            }   
        }
        updateCart();
    }

    const handleCheckItem = (e: React.ChangeEvent<HTMLInputElement>, itemId: string, item: ICartItem) => {
        let updatedCartItems;
        if(e.target.checked) {
            updatedCartItems = [...selectedCartItems, item];
            setSelectedCartItems(updatedCartItems);
        } else {
            updatedCartItems = selectedCartItems.filter((cartItem) => cartItem.id !== itemId);
            setSelectedCartItems(updatedCartItems);
        }
    }

    const handleCheckout = async () => {
        // call api update cart
        const updateCart = async() => {
            const response: any = await api.updateCart(cartItems);
            if (response?.data) {
                console.log(response.data);
                // navigate to checkout
                navigate('/checkout', { state: { selectedCartItems, total, subtotal } });
            }   
        }
        updateCart();
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
                                    </div>

                                    <div className="w-full sm:w-6 flex align-items-start justify-content-end mt-3 sm:mt-0">
                                        <div className="flex flex-column sm:align-items-end">
                                            <span className="text-900 text-2xl font-medium mb-2 sm:mb-3">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </span>
                                            <a
                                                className="cursor-pointer text-pink-500 font-medium hover:text-pink-600 transition-colors transition-duration-300"
                                                onClick={() => handleRemove(item.id)}
                                            >
                                                Remove
                                            </a>
                                            <input type="checkbox" value={item.id} onChange={(e) => handleCheckItem(e, item.id, item)} />
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
