import { IAccount, IBackendRes, ICartItem, ICoupon, IGetAccount, IGetAddress, IGetCart, IGetCategory, IGetOneProduct, IGetOrderHistory, IGetProduct, IOrderItem } from '../types/backend';
import axios from './axios-customize';

export const callLogin = (email: string, password: string) => {
    return axios.post<IBackendRes<IAccount>>('/api/v1/auth/login', { email, password })
}

export const callFetchAccount = () => {
    return axios.get<IBackendRes<IGetAccount>>('/api/v1/auth/account')
}
export const updateUser = (data: any) => {
    return axios.put<IBackendRes<any>>('/api/v1/users', data);
};
export const callFetchAllUsers = () => {
    return axios.get<IBackendRes<IGetAccount[]>>('/api/v1/users/users');
};

export const callFetchAddress = () => {
    return axios.get<IBackendRes<IGetAddress>>('/api/v1/users');
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
export const addToCategory = async (category: IGetCategory) => {
    return axios.post<IBackendRes<any>>(`/api/v1/categories`, { category });
}
export const deleteCategory = async (categoryId: string) => {
    return axios.delete<IBackendRes<any>>(`/api/v1/categories/${categoryId}`);
};
export const updateCategory = async (categoryId: string, category: any) => {
    return axios.put<IBackendRes<any>>(`/api/v1/categories/${categoryId}`, { category });
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
export const deleteProduct = async (id: string) => {
    return axios.delete<IBackendRes<any>>(`/api/v1/products/${id}`);
};
export const editProduct = async (id: string, product: Partial<IGetProduct>) => {
    return axios.put<IBackendRes<any>>(`/api/v1/products/${id}`, product);
};

export const addProduct = async (product: any) => {
    return axios.post<IBackendRes<any>>(`/api/v1/products`,  product, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    } );
}
export const addToProduct = async (product: any) => {
    return axios.post<IBackendRes<any>>(`/api/v1/carts`, {product});
}

// Cart module
export const addToCart = async (productId: string, quantity: number) => {
    return axios.post<IBackendRes<any>>(`/api/v1/carts`, { productId, quantity });
}

export const getCarts = async () => {
    return axios.get<IBackendRes<IGetCart>>("/api/v1/carts");
}

export const updateCart = async (cartItems: ICartItem[]) => {
    return axios.put<IBackendRes<IGetCart>>("/api/v1/carts/update", cartItems);
}

// order module
export const createOrder = async (cartItems: ICartItem[], totalPrice: number) => {
    return axios.post<IBackendRes<any>>("/api/v1/orders", {cartItems, totalPrice});
}
export const getAllOrders = () => {
    return axios.get<IBackendRes<any>>('/api/v1/orders');
}

export const getOrderItem = async (orderId: string) => {
    return axios.get<IBackendRes<IOrderItem>>(`/api/v1/orders/items/${orderId}`);
}

export const getOrderHistory = async () => {
    return axios.get<IBackendRes<IGetOrderHistory[]>>(`/api/v1/orders/history`);
}

export const getOrder = async (orderId: string) => {
    return axios.get<IBackendRes<IGetOrderHistory>>(`/api/v1/orders/${orderId}`);
}

export const changeOrderStatus = async (orderId: string, status: string) => {
    return axios.post<IBackendRes<any>>('/api/v1/orders/update/status', {orderId, status})
}

export const getRevenueStatistics = async () => {
    return axios.get<IBackendRes<any>>('/api/v1/orders/revenue-statistics')
}

// coupon module
export const getCoupons = async () => {
    return axios.get<IBackendRes<ICoupon[]>>('/api/v1/coupons')
}

export const addCoupon = async (coupon: ICoupon) => {
    return axios.post<IBackendRes<ICoupon[]>>('/api/v1/coupons', coupon)
}

// admin module
export const getUsersStatistics = async (currentYear: number) => {
    return axios.post<IBackendRes<any>>('/api/v1/admin/users/statistics', {currentYear})
}

export const getGeneralStatistics = async () => {
    return axios.get<IBackendRes<any>>('/api/v1/admin/general-statistics')
}