import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { callVerifyOTP } from '../../api/api';

const VerifyOTP: React.FC = () => {
    const [otp, setOtp] = useState<string>('');
    const [email, setEmail] = useState<string>(''); 
    const [otpError, setOtpError] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<boolean>(false); // State cho lỗi email
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        if (id === 'otp') {
            setOtp(value);
            setOtpError(value.length !== 6);
        } else if (id === 'email') {
            setEmail(value);
            setEmailError(!validateEmail(value));
        }
    }

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);

        if (otp.length !== 6 || !validateEmail(email)) {
            setOtpError(otp.length !== 6);
            setEmailError(!validateEmail(email));
            setSubmitted(false);
            return;
        }

        try {
            const res: any = await callVerifyOTP(email, otp);
            console.log(res.statusCode)
            if (res?.statusCode === 200) {
                navigate('/reset-password'); 
            } else {
                setErrorMessage('OTP không hợp lệ, vui lòng thử lại.');
            }
        } catch (error) {
            setErrorMessage('Có lỗi xảy ra, vui lòng thử lại sau.');
        } finally {
            setSubmitted(false);
        }
    }

    return (
        <div className="verify-otp-container">
            <h2>Nhập mã OTP</h2>
            <p>Vui lòng nhập mã OTP và email mà chúng tôi đã gửi đến bạn.</p>

            <form onSubmit={handleSubmit} className="verify-otp-form">
                <div className="field">
                    <span className="p-float-label">
                        <InputText
                            id="email"
                            value={email}
                            onChange={handleInputChange}
                            className={emailError ? 'p-invalid' : ''}
                        />
                        <label htmlFor="email">Email</label>
                    </span>
                    {emailError && <small className="p-error">Email không hợp lệ.</small>}
                </div>

                <div className="field">
                    <span className="p-float-label">
                        <InputText
                            id="otp"
                            value={otp}
                            onChange={handleInputChange}
                            className={otpError ? 'p-invalid' : ''}
                        />
                        <label htmlFor="otp">Mã OTP</label>
                    </span>
                    {otpError && <small className="p-error">Mã OTP phải có 6 ký tự.</small>}
                </div>

                <div className="field">
                    <Button label="Xác thực OTP" icon="pi pi-check" type="submit" disabled={submitted} />
                </div>

                {submitted && <p>Đang xác thực...</p>}
                {errorMessage && <p className="p-error">{errorMessage}</p>}
            </form>
        </div>
    );
}

export default VerifyOTP;
