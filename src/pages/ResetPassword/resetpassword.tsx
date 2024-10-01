import React, { useState } from 'react';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { callResetPassword } from '../../api/api'; 

const ResetPassword: React.FC = () => {
    const [email, setEmail] = useState<string>(''); 
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [emailError, setEmailError] = useState<boolean>(false); 
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const navigate = useNavigate();

    // Validate email format
    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setEmailError(!validateEmail(e.target.value)); 
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setPasswordError(e.target.value.length < 6);
    }

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        setConfirmPasswordError(e.target.value !== password);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);

        if (!validateEmail(email)) {
            setEmailError(true);
            setSubmitted(false);
            return;
        }

        if (password.length < 6) {
            setPasswordError(true);
            setSubmitted(false);
            return;
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError(true);
            setSubmitted(false);
            return;
        }

        try {
            const res:any = await callResetPassword(email, password); 
            if (res?.statusCode == 200) {
                navigate('/login');
            } else {
                setErrorMessage('Có lỗi xảy ra. Vui lòng thử lại.');
            }
        } catch (error) {
            setErrorMessage('Có lỗi xảy ra. Vui lòng thử lại.');
        } finally {
            setSubmitted(false);
        }
    }

    return (
        <div className="reset-password-container">
            <h2>Đặt lại mật khẩu</h2>
            <p>Vui lòng nhập email và mật khẩu mới của bạn.</p>

            <form onSubmit={handleSubmit} className="reset-password-form">
                {/* Trường Email */}
                <div className="field">
                    <span className="p-float-label">
                        <InputText
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            className={emailError ? 'p-invalid' : ''}
                        />
                        <label htmlFor="email">Email</label>
                    </span>
                    {emailError && <small className="p-error">Email không hợp lệ.</small>}
                </div>

                {/* Trường Mật khẩu */}
                <div className="field">
                    <span className="p-float-label">
                        <Password
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className={passwordError ? 'p-invalid' : ''}
                            feedback={false}
                        />
                        <label htmlFor="password">Mật khẩu mới</label>
                    </span>
                    {passwordError && <small className="p-error">Mật khẩu phải dài ít nhất 6 ký tự.</small>}
                </div>

                {/* Trường Xác nhận Mật khẩu */}
                <div className="field">
                    <span className="p-float-label">
                        <Password
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            className={confirmPasswordError ? 'p-invalid' : ''}
                            feedback={false}
                        />
                        <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                    </span>
                    {confirmPasswordError && <small className="p-error">Mật khẩu xác nhận không khớp.</small>}
                </div>

                {/* Nút Đặt lại Mật khẩu */}
                <div className="field">
                    <Button label="Đặt lại mật khẩu" icon="pi pi-refresh" type="submit" disabled={submitted} />
                </div>

                {submitted && <p>Đang đặt lại mật khẩu...</p>}
                {errorMessage && <p className="p-error">{errorMessage}</p>}
            </form>
        </div>
    );
}

export default ResetPassword;
