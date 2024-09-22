import React, { useState, ChangeEvent, FormEvent } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { callSentOtp } from '../../api/api';
import './sentotp.css';


const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const navigate = useNavigate(); 

    // Validate email format
    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setEmailError(!validateEmail(e.target.value));
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSubmitted(true);

        if (!validateEmail(email)) {
            setEmailError(true);
            setSubmitted(false);
            return;
        }

        try {
            const res: any = await callSentOtp(email);
            console.log(res.statusCode); 
            if (res?.statusCode === 200) {
                setSuccessMessage('Yêu cầu reset mật khẩu đã được gửi. Vui lòng kiểm tra email của bạn!');
                navigate('/verify-otp');
            } else {
                setSuccessMessage('Có lỗi xảy ra. Vui lòng thử lại sau.');
            }
        } catch (error) {
            setSuccessMessage('Có lỗi xảy ra. Vui lòng thử lại sau.');
        } finally {
            setSubmitted(false);
        }
    }

    return (
        <div className="forgot-password-container">
            <h2>Quên mật khẩu</h2>
            <p>Vui lòng nhập email của bạn để nhận hướng dẫn reset mật khẩu.</p>

            <form onSubmit={handleSubmit} className="forgot-password-form">
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
                    {emailError && <small className="p-error">Địa chỉ email không hợp lệ.</small>}
                </div>

                <div className="field">
                    <Button label="Gửi yêu cầu" icon="pi pi-envelope" type="submit" disabled={submitted} />
                </div>

                {submitted && <p>Đang gửi yêu cầu...</p>}
                {successMessage && <p>{successMessage}</p>}
            </form>
        </div>
    );
};

export default ForgotPassword;
