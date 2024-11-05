import { IAccount, IBackendRes, IGetAccount, IGetCategory, IGetOneProduct, IGetProduct } from '../types/backend';
import axios from './axios-customize';

export const callLogin = (email: string, password: string) => {
    return axios.post<IBackendRes<IAccount>>('/api/v1/auth/login', { email, password })
}

export const callFetchAccount = () => {
    return axios.get<IBackendRes<IGetAccount>>('/api/v1/auth/account')
}

export const callSentOtp = (email: string) => {
    return axios.post<IBackendRes<any>>('/api/v1/auth/forgot-password', { email });
}

export const callVerifyOTP = (email: string, otp: string) => {
    return axios.post<IBackendRes<any>>('/api/v1/auth/verify-otp', { email, otp });
}

export const callResetPassword = async (email: string, newPassword: string) => {
    return await axios.post('/api/v1/auth/reset-password', { email, newPassword });
};

export const callRegister = (fullName: string, email: string, password: string) => {
    return axios.post('/api/v1/auth/register', { fullName, email, password })
}

// Category module
export const getAllCategory = async () => {
    return axios.get<IBackendRes<IGetCategory>>('/api/v1/categories');
}

// Product module
export const getProductsByCategoryName = async (categoryName: string) => {
    return axios.get<IBackendRes<IGetProduct>>(`/api/v1/products?categoryName=${categoryName}`);
}

export const getAllProducts = async () => {
    return axios.get<IBackendRes<IGetProduct>>('/api/v1/products');
}

export const getProduct = async (productId: string) => {
    return axios.get<IBackendRes<IGetOneProduct>>(`/api/v1/products/${productId}`);
}

// Cart module
export const addToCart = async (productId: string, quantity: number) => {
    return axios.post<IBackendRes<any>>(`/api/v1/carts`, { productId, quantity });
}

