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

export interface IGetCategory {
    name: string;
}

export interface IGetProduct {
    id: string,
    categoryName: string,
    name: string,
    image: string,
    price: number,
    inventoryStatus: string,
    rating: number;
}