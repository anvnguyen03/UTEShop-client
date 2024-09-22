import { IAccount, IBackendRes, IGetAccount } from '../types/backend';
import axios from './axios-customize';

export const callLogin = (email: string, password: string) => {
    return axios.post<IBackendRes<IAccount>>('/api/v1/auth/login', { email, password })
}

export const callFetchAccount = () => {
    return axios.get<IBackendRes<IGetAccount>>('/api/v1/auth/account')
}

export const callRegister = (fullName: string, email: string, password: string) => {
    return axios.post('/api/v1/auth/register', { fullName, email, password })
}