import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import appLogo from '../../assets/logo_red.png';
import './login.css';
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import { callLogin } from "../../api/api";
import { setUserLoginInfo } from '../../redux/slice/accountSlide';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IAccount, IBackendRes } from "../../types/backend";

interface FormData {
    username: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const [form, setForm] = useState<FormData>({ username: "", password: "" });
    const [submitted, setSubmitted] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [touchedFields, setTouchedFields] = useState({ email: false, password: false });
    const [isValidForm, setValidForm] = useState(false);
    const dispatch = useDispatch();
    const isAuthenticated = useAppSelector(state => state.account.isAuthenticated);
    // let location = useLocation();
    // let params = new URLSearchParams(location.search);
    // const callback = params?.get("callback");

    useEffect(() => {
        //đã login => redirect to '/'
        // if(localStorage.getItem("access_token")) {
        //     window.location.href = '/';
        // }
        if (isAuthenticated) {
            // navigate('/');
            console.log("Authenticated");
            window.location.href = '/';
        }
    }, [isAuthenticated])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prevForm => {
            const newForm = { ...prevForm, [name]: value };
            validateForm(newForm);
            return newForm;
        });
    }

    const validateForm = (formData: FormData) => {
        setValidForm(!!formData.username && validateEmail(formData.username) && !!formData.password);
    }

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(email);
        setEmailError(!isValidEmail);
        return isValidEmail;
    };
    

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        const res: any = await callLogin(form.username, form.password);
        setSubmitted(false);

        if (res) {
            if(res.data) {
                localStorage.setItem('access_token', res.data.accessToken);
                dispatch(setUserLoginInfo(res.data.user))
                console.log(res);
                // message.success('Đăng nhập tài khoản thành công!');
                // window.location.href = callback ? callback : '/';
            }
            
        } else {
            // notification.error({
            //     message: "Có lỗi xảy ra",
            //     description:
            //         res.message && Array.isArray(res.message) ? res.message[0] : res.message,
            //     duration: 5
            // })
            console.log("Looix");
        }
    };

    const handleFieldFocus = (field: 'email' | 'password') => {
        setTouchedFields(prev => ({ ...prev, [field]: true }));
    }

    return (
        <div className="px-5 min-h-screen flex justify-content-center align-items-center">
            <form onSubmit={handleSubmit} className="border-1 surface-border surface-card border-round py-7 px-4 md:px-7 z-1">
            <div className="text-center mb-5">
                <img src={appLogo} alt="ute-shop" height={50} className="mb-3" />
                <div className="text-900 text-3xl font-medium mb-3">Chào mừng quý khách</div>
                <span className="text-600 font-medium line-height-3">Bạn chưa có tài khoản ?</span>
                <Link to="/register" className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Tạo ngay!</Link>
            </div>
                {/* Email field */}
                <FloatLabel className="field">
                    <InputText style={{width: '278px'}} 
                        id="username" 
                        name="username" 
                        value={form.username} 
                        onChange={handleInputChange}
                        onFocus={() => handleFieldFocus('email')}
                        // onBlur={() => handleFieldFocus('email')}
                    />
                    <label htmlFor="username">Email</label>
                </FloatLabel>
                {!form.username && touchedFields.email && <small className="p-error field">*Email không được để trống</small>}
                {form.username && emailError && <small className="p-error field">*Email không đúng định dạng</small>}

                {/* Password field */}
                <FloatLabel className="field">
                    <Password inputId="password" 
                        id="password" 
                        name="password"
                        value={form.password}
                        onChange={handleInputChange} 
                        onFocus={() => handleFieldFocus('password')}
                        // onBlur={() => handleFieldFocus('password')}
                        feedback={false}
                        toggleMask 
                    />
                    <label htmlFor="password">Mật khẩu</label>
                </FloatLabel>
                {!form.password && touchedFields.password && <small className="p-error field">Mật khẩu không được để trống</small>}
                <div className="flex align-items-center justify-content-between field">
                    <a className="font-medium no-underline text-blue-500 text-right cursor-pointer">Bạn quên mật khẩu à?</a>
                </div>
                <div>
                    {
                        isValidForm ? (
                            <Button label="Đăng nhập" icon="pi pi-sign-in" type="submit" className="field"/>
                        ) : (<Button label="Đăng nhập" icon="pi pi-sign-in" type="submit" className="field" disabled/>)
                        
                    }
                </div>
                
            </form>
        </div>
        
    )
}
export default LoginPage;