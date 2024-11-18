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
    address: string;
    role: string;
}

export interface IGetAddress {
    address: string;
    city: string;
    country: string;
    telephone: string;
}

export interface IGetCategory {
    name: string;
}

export interface IGetProduct {
    id: string,
    categoryName: string,
    description: string,
    name: string,
    image: string,
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