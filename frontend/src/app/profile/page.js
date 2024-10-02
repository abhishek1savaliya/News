import React from 'react';
import { BsPencilSquare } from "react-icons/bs"; // Assuming you are using Heroicons for icons

const UserProfile = () => {
    return (
        <div className="min-h-screen bg-gray-900 p-6 pt-20">
            <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
                <div className="flex items-center mb-6">
                    <img
                        src="https://via.placeholder.com/100"
                        alt="User"
                        className="w-24 h-24 rounded-full border-2 border-gray-700"
                    />
                    <div className="ml-4">
                        <div className="text-white text-2xl flex items-center">
                            <span>First Name</span>
                            <BsPencilSquare  className="h-5 w-5 text-gray-400 ml-2 cursor-pointer" />
                        </div>
                        <div className="text-white text-2xl flex items-center">
                            <span>Last Name</span>
                            <BsPencilSquare  className="h-5 w-5 text-gray-400 ml-2 cursor-pointer" />
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    <h3 className="text-gray-400">Email Address</h3>
                    <p className="text-white">user@example.com</p>
                </div>

                <div className="mb-4">
                    <h3 className="text-gray-400">Subscribed Topics</h3>
                    <p className="text-white flex items-center">
                        News, Technology, Sports
                        <BsPencilSquare  className="h-5 w-5 text-gray-400 ml-2 cursor-pointer" />
                    </p>
                </div>

                <div className="mb-4">
                    <h3 className="text-gray-400">First Join</h3>
                    <p className="text-white">January 1, 2023</p>
                </div>

                <div className="mb-4">
                    <h3 className="text-gray-400">Liked News Total</h3>
                    <p className="text-white">42</p>
                </div>

                <div className="mb-4">
                    <h3 className="text-gray-400">Disliked News Total</h3>
                    <p className="text-white">7</p>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;