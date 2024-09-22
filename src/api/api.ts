import { IAccount, IBackendRes, IGetAccount } from '../types/backend';
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

