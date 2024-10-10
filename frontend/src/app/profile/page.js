'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { BsPencilSquare } from "react-icons/bs";
import { useRouter } from 'next/navigation';
import axios from 'axios';

const UserProfile = () => {
    const router = useRouter();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState(''); // Initialize email state
    const [subscribedTopics, setSubscribedTopics] = useState([]);
    const [availableTopics, setAvailableTopics] = useState([]);
    const [firstJoin, setFirstJoin] = useState('');
    const [likedNewsTotal, setLikedNewsTotal] = useState(0);
    const [dislikedNewsTotal, setDislikedNewsTotal] = useState(0);
    const [isEditingFirstName, setIsEditingFirstName] = useState(false);
    const [isEditingLastName, setIsEditingLastName] = useState(false);
    const [isEditingSubscribedTopics, setIsEditingSubscribedTopics] = useState(false);
    const [error, setError] = useState(''); // State for error messages

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/signin');
        } else {
            fetchUserProfile(token);
            fetchAvailableTopics(token);
        }
    }, [router]);

    const fetchUserProfile = useCallback(async (token) => {
        try {
            const response = await axios.get('https://news-pm9f.onrender.com/api/users/me', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const userData = response.data;

            setFirstName(userData.fName);
            setLastName(userData.lName);
            setEmail(userData.email); // Fetch and set email
            setSubscribedTopics(userData.subscribedTopic || []);
            setFirstJoin(userData.firstJoin || '');
            setLikedNewsTotal(userData.likedNews.length || 0);
            setDislikedNewsTotal(userData.dislikedNews.length || 0);
        } catch (error) {
            console.error('Error fetching user profile:', error);
            setError('Failed to fetch user profile.'); // Set error message
        }
    }, []);

    const fetchAvailableTopics = useCallback(async (token) => {
        try {
            const response = await axios.get('https://news-pm9f.onrender.com/api/topics', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAvailableTopics(response.data);
        } catch (error) {
            console.error('Error fetching available topics:', error);
            setError('Failed to fetch available topics.'); // Set error message
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/signin');
    };

    const updateUserProfile = async () => {
        const token = localStorage.getItem('token');
        const updatedUser = {
            fName: firstName,
            lName: lastName,
            subscribedTopic: subscribedTopics,
        };

        try {
            const response = await axios.put('https://news-pm9f.onrender.com/api/users/me', updatedUser, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log('User profile updated successfully:', response.data);
            fetchUserProfile(token);
            setIsEditingFirstName(false);
            setIsEditingLastName(false);
            setIsEditingSubscribedTopics(false);
        } catch (error) {
            console.error('Error updating user profile:', error);
            setError('Failed to update user profile.'); // Set error message
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 p-6 pt-20">
            <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
                {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
                <div className="flex items-center mb-6">
                    <img
                        src="https://via.placeholder.com/100"
                        alt="User"
                        className="w-24 h-24 rounded-full border-2 border-gray-700"
                    />
                    <div className="ml-4">
                        <div className="text-white text-2xl flex items-center">
                            {isEditingFirstName ? (
                                <>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="bg-gray-700 text-white rounded p-2"
                                    />
                                    <button
                                        onClick={updateUserProfile}
                                        className="ml-2 bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
                                    >
                                        Update
                                    </button>
                                </>
                            ) : (
                                <>
                                    <span>{firstName}</span>
                                    <BsPencilSquare
                                        className="h-5 w-5 text-gray-400 ml-2 cursor-pointer"
                                        onClick={() => setIsEditingFirstName(true)}
                                    />
                                </>
                            )}
                        </div>
                        <div className="text-white text-2xl flex items-center">
                            {isEditingLastName ? (
                                <>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="bg-gray-700 text-white rounded p-2"
                                    />
                                    <button
                                        onClick={updateUserProfile}
                                        className="ml-2 bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
                                    >
                                        Update
                                    </button>
                                </>
                            ) : (
                                <>
                                    <span>{lastName}</span>
                                    <BsPencilSquare
                                        className="h-5 w-5 text-gray-400 ml-2 cursor-pointer"
                                        onClick={() => setIsEditingLastName(true)}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    <h3 className="text-gray-400">Email Address</h3>
                    <p className="text-white flex items-center">{email}</p>
                </div>

                <div className="mb-4 overflow-x-auto">
                    <h3 className="text-gray-400">Subscribed Topics</h3>
                    {isEditingSubscribedTopics ? (
                        <div className="flex flex-wrap">
                            {availableTopics.map((topic, index) => (
                                <div key={topic._id} className="flex items-center mb-2 w-1/5 px-2">
                                    <input
                                        type="checkbox"
                                        id={topic._id}
                                        checked={subscribedTopics.includes(topic.name)}
                                        onChange={() => {
                                            if (subscribedTopics.includes(topic.name)) {
                                                setSubscribedTopics(subscribedTopics.filter(t => t !== topic.name));
                                            } else {
                                                setSubscribedTopics([...subscribedTopics, topic.name]);
                                            }
                                        }}
                                        className="accent-blue-500" // Custom checkbox color (optional)
                                    />
                                    <label htmlFor={topic._id} className="ml-2 text-white">
                                        {topic.name}
                                    </label>
                                </div>
                            ))}
                            <button
                                onClick={updateUserProfile}
                                className="mt-2 bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
                            >
                                Update
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <span className="text-white overflow-hidden whitespace-nowrap">{subscribedTopics.join(', ')}</span>
                            <BsPencilSquare
                                className="h-5 w-5 text-gray-400 ml-2 cursor-pointer"
                                onClick={() => setIsEditingSubscribedTopics(true)}
                            />
                        </div>
                    )}
                </div>


                <div className="mb-4">
                    <h3 className="text-gray-400">First Join Date</h3>
                    <p className="text-white">{firstJoin}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-gray-400">Liked News Total</h3>
                    <p className="text-white">{likedNewsTotal}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-gray-400">Disliked News Total</h3>
                    <p className="text-white">{dislikedNewsTotal}</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default UserProfile;