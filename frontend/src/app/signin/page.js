'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // Add loading state

    const router = useRouter();

    const handleSignin = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true
        try {
            const response = await axios.post('https://news-pm9f.onrender.com/api/auth/login', {
                email,
                password,
            });
            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                router.push('/');
            }
        } catch (err) {
            setError('Invalid email or password');
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleSignin} className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="mb-6 text-center text-2xl font-bold">Sign In</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                    required
                />
                <button
                    type="submit"
                    className={`w-full text-white p-2 rounded ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
                    disabled={loading} // Disable button while loading
                >
                    {loading ? 'Signing In...' : 'Sign In'}
                </button>
                {loading && <div className="text-center mt-4">Loading...</div>} {/* Loader message */}
            </form>
        </div>
    );
};

export default Signin;
