'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'

const Signup = () => {
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSignup = async (e) => {
        const router = useRouter()

        e.preventDefault();

        try {
            const response = await axios.post('https://news-pm9f.onrender.com/api/auth/register', {
                fName,
                lName,
                email,
                password,
            });
            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                router.push('/')
            }
        } catch (err) {
            setError('Signup failed. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleSignup} className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="mb-6 text-center text-2xl font-bold">Sign Up</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <input
                    type="text"
                    placeholder="First Name"
                    value={fName}
                    onChange={(e) => setFName(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lName}
                    onChange={(e) => setLName(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                    required
                />
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
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Signup;
