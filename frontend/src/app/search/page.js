'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const Search = () => {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await axios.get('https://news-pm9f.onrender.com/api/topics');

                // Assign a random color to each topic
                const topicsWithColors = response.data.map(topic => ({
                    ...topic,
                    bgColor: getRandomColor(), // Assign random background color
                }));

                setTopics(topicsWithColors);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTopics();
    }, []);



    return (
        <div className="p-4 sm:ml-72 sm:mr-72 bg-gray-600 ">
            <div className="p-4 bg-gray-700 mt-14 h-screen">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>

                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none cursor-pointer">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>

                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
                </div>

                {loading ? (
                    <div className="flex justify-center mt-4 mb-4">
                        <div className="spinner"></div>
                    </div>
                ) : error ? (
                    <div>Error: {error.message}</div>
                ) : (
                    <div className="flex flex-wrap space-x-2 mt-5 ">
                        {topics.map((topic, index) => (
                            <span
                                key={index}
                                style={{ backgroundColor: topic.bgColor }} // Apply the random color
                                className="text-base text-white font-medium me-2 px-4 py-3 rounded-full mb-3 mt-3 cursor-pointer"
                            >
                                {topic.name}
                            </span>
                        ))}
                    </div>
                )}


            </div>
        </div>
    );
};

export default Search;