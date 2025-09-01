import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            await new Promise<void>(resolve => setTimeout(resolve, 1500));
            const tempEmail: string = 'elbambo@gmail.com';
            const tempPassword: string = 'elbambo06';
            const riderEmail: string = 'rider@gmail.com';
            const riderPassword: string = 'rider123';

            if (email === tempEmail && password === tempPassword) {
                console.log('Login successful:', { email, rememberMe });
                toast.success('Login successful! Welcome back.');
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1000);
            } else if (email === riderEmail && password === riderPassword) {
                console.log('Rider login successful:', { email, rememberMe });
                toast.success('Rider login successful! Welcome.');
                setTimeout(() => {
                    navigate('/riderdashboard');
                }, 1000);
            } else { 
                toast.error('Invalid credentials. Please contact administrator for access.');
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError('Login failed. Please try again.');
            toast.error('Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            handleSubmit(e as any);
        }
    };

    const handleForgotPassword = (): void => {
        console.log('Forgot password clicked');
    };

    return (
        <div
            className="h-screen w-screen flex items-center justify-center bg-[#e0e0e0] bg-center"
            style={{ backgroundImage: "url('/Gallery3/coffeebeans.jpg')" }}
        >
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                className="custom-toast-container"
                toastClassName="custom-toast"
                bodyClassName="custom-toast-body"
            />

            {isLoading && (
                <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            <div className="w-full max-w-md p-8 rounded-xl bg-white border border-white">
                <div className="text-center mb-8">
                    <img
                        src="./images/Gallery1/cup-of-coffee.png"
                        alt="Logo"
                        className="w-16 h-16 mx-auto mb-4 object-contain"
                    />
                    <p className="text-black">Enter your credentials to access your account.</p>
                </div>

                {error && (
                    <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                        {error}
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
                            Email
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-black rounded-lg text-black placeholder-black"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium text-black mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-black rounded-lg text-black placeholder-black"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                checked={rememberMe}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRememberMe(e.target.checked)}
                                className="h-4 w-4 text-blue-800 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="rememberMe" className="ml-2 block text-sm text-black">
                                Remember me
                            </label>
                        </div>
                        
                        <button
                            type="button"
                            className="flex items-center text-sm text-black hover:text-gray-700 hover:underline"
                            onClick={handleForgotPassword}
                        >
                            Forgot password?
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 ml-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4v1m0 14v1m8-9h1M4 12H3m15.364 6.364l.707.707M6.343 6.343l-.707-.707m12.728 0l.707-.707M6.343 17.657l-.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"
                                />
                            </svg>
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex items-center justify-center bg-black hover:bg-gray-700 text-white font-medium py-4 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        {isLoading ? (
                            'Logging in...'
                        ) : (
                            <>
                                LOG IN
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 ml-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5m5 5H3"
                                    />
                                </svg>
                            </>
                        )}
                    </button>
                </form>
            </div>

            <style>{`
                .custom-toast-container {
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                    top: 20px;
                    z-index: 9999;
                }
                .custom-toast {
                    padding: 20px;
                    font-size: 1.2rem;
                    min-height: 80px;
                    border-radius: 12px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                    margin-bottom: 15px;
                }
                .Toastify__toast--success {
                    background-color: #4CAF50 !important;
                    color: white !important;
                }
                .Toastify__toast--error {
                    background-color: #F44336 !important;
                    color: white !important;
                }
            `}</style>
        </div>
    );
};

export default Login;