import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext"
import React from "react";
import '/node_modules/primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import appLogo from '../../assets/logo_red.png'
import { Link } from "react-router-dom";
import { FloatLabel } from "primereact/floatlabel";
import { callRegister } from "../../api/api";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormData {
    fullName: string
    email: string
    password: string
    confirmPassword: string
}

const RegisterPage: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>({
         mode: "onChange"
    });

    const password = watch('password', '');

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const res = await callRegister(data.fullName, data.email, data.password)
        if (res) {
            console.log(res)
        } else {
            console.log('Lỗi rồi kìa')
        }
    };

    return (
        <div className="px-5 min-h-screen flex justify-content-center align-items-center">
            <form onSubmit={handleSubmit(onSubmit)} className="border-1 surface-border surface-card border-round py-7 px-4 md:px-7 z-1">
                <div className="text-center mb-5">
                    <img src={appLogo} alt="ute-shop" height={50} className="mb-3" />
                    <div className="text-900 text-3xl font-medium mb-3">
                        Hãy bắt đầu
                        <br />
                        đăng ký tài khoản nào!
                    </div>
                </div>

                {/* Full Name field */}
                <FloatLabel className="field">
                    <InputText
                        style={{ width: '278px' }}
                        id="fullName"
                        {...register("fullName", { required: "*Tên không được để trống" })}
                    />
                    <label htmlFor="fullName">Full Name</label>
                </FloatLabel>
                {errors.fullName && <small className="p-error field">{errors.fullName.message}</small>}

                {/* Email field */}
                <FloatLabel className="field">
                    <InputText
                        style={{ width: '278px' }}
                        id="email"
                        {...register("email", {
                            required: "*Email không được để trống",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "*Email không đúng định dạng"
                            }
                        })}
                    />
                    <label htmlFor="email">Email</label>
                </FloatLabel>
                {errors.email && <small className="p-error field">{errors.email.message}</small>}

                {/* Password field */}
                <FloatLabel className="field">
                    <InputText type="password"
                        id="password"
                        {...register("password", { 
                            required: "*Mật khẩu không được để trống",
                            pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                                message: "*Mật khẩu ít nhất 6 kí tự, bao gồm cả chữ và số"
                            }
                        })}
                    />
                    <label htmlFor="password">Mật khẩu</label>
                </FloatLabel>
                {errors.password && <small className="p-error field">{errors.password.message}</small>}

                {/* Confirm password field */}
                <FloatLabel className="field">
                    <InputText type="password"
                        id="confirmPassword"
                        {...register("confirmPassword", {
                            required: "*Mật khẩu xác nhận không được để trống",
                            validate: value => value === password || "*Mật khẩu xác nhận không khớp"
                        })}
                    />
                    <label htmlFor="confirmPassword">Xác nhận lại mật khẩu</label>
                </FloatLabel>
                {errors.confirmPassword && <small className="p-error field">{errors.confirmPassword.message}</small>}

                {/* Link to login */}
                <div className="flex align-items-center justify-content-between field">
                    <span className="text-600 font-medium line-height-3">Bạn đã có tài khoản?</span>
                    <Link to="/login" className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Đăng nhập ngay!</Link>
                </div>

                {/* Submit button */}
                <div>
                    <Button label="Đăng ký" icon="pi pi-send" type="submit" className="field" />
                </div>
            </form>
        </div>
    )
}

export default RegisterPage