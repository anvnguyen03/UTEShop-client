export interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
}

export interface IAccount {
    accessToken: string;
    refreshToken: string;
    user: {
        email: string;
        fullName: string;
        address: string;
        role: string;
    }
}

export interface IGetAccount {
    email: string;
    fullName: string;
    address: IGetAddress;
    role: string;
}

export interface IGetAddress {
    address: string;
    city: string;
    country: string;
    telephone: string;
}

export interface IGetCategory {
    _id:string ;
    name: string;
}

export interface IGetProduct {
    id: string,
    categoryName: string,
    description: string,
    name: string,
    image: string,
    images: string[]; 
    price: number,
    inventoryStatus: string,
    rating: number;
}

export type IGetOneProduct = {
    id: string,
    categoryName: string,
    description: string,
    name: string,
    images: string[],
    price: number,
    inventoryStatus: string,
    rating: number,
    stock: number;
}

export type ICartItem = {
    id: string,     // productId
    image: string,
    name: string,
    quantity: number,
    available: number,
    price: number
}

export type IGetCart = {
    cartItems: ICartItem[],
}

export type IOrderItem = {
    id: number
    productId: number
    image: string
    name: string
    color: string
    size: string
    quantity: number
    price: number
}

export type IGetOrderHistory = {
    orderNumber: string
    orderDate: string
    totalAmount: string
    status: string
    items: {
        image: any
        name: any
        price: number,
        quantity: number
    }[]
}

export type ICoupon = {
    name: string,
    price: number
    isActivated: boolean
}

export type IGetOrderDetails = {
    orderNumber: string
    orderDate: string
    totalAmount: string
    status: string
    userId: string
    userName: string
    items: {
        image: any
        name: any
        price: number,
        quantity: number
    }[] 
}