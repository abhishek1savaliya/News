import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Thumplike from '../components/Thumplike/page';
import { FaEye } from 'react-icons/fa';

const news = [
    {
        id: 1,
        headline: "અમદાવાદમાં ફરીથી વેપારીને લૂંટવાની ઘટના, પોલીસ તપાસમાં લાગી!",
        photo: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
        position: true
    },
]

const Main = () => {
    return (
        <div className="p-4 sm:ml-96 sm:mr-96 bg-gray-600">
            <div className="p-4 dark:border-gray-700 mt-14">
                {news.map((article, id) => {
                    return article.position ? (
                        <div key={article.id} className="relative flex flex-col h-96 mb-4 bg-gray-50 dark:bg-gray-800">
                            <Link href={`/article/${article.id}`}>
                                <div className="cursor-pointer flex flex-col h-full">
                                    <Image
                                        src={article.photo}
                                        alt={article.headline}
                                        width={800}
                                        height={500}
                                        className="h-72 object-cover"
                                    />
                                    <p className="text-gray-800 text-lg dark:text-gray-200 p-4" style={{ letterSpacing: '0.05em' }}>
                                        {article.headline}
                                    </p>
                                </div>
                            </Link>

                            <div className="absolute top-2 right-2 text-gray-800 dark:text-gray-200">
                                <FaEye />
                            </div>

                            <div>
                                <Thumplike />
                            </div>

                        </div>

                    ) : (

                        <div className="relative flex flex-col md:flex-row h-auto mb-4 rounded bg-gray-50 dark:bg-gray-800">
                            <Link href={`/article/${article.id}`}>
                                <div className="flex flex-col md:flex-row w-full">
                                    <Image
                                        src={article.photo}
                                        alt={article.headline} // Better alt text for accessibility
                                        width={200}
                                        height={500}
                                        className="h-36 w-full md:w-1/3 object-cover rounded-l rounded-tr-none"
                                    />
                                    <p className="text-gray-800 text-lg dark:text-gray-200 p-4 flex-grow" style={{ letterSpacing: '0.05em' }}>
                                        {article.headline}
                                    </p>
                                </div>
                            </Link>

                            <div className="absolute top-2 right-2 cursor-pointer text-gray-800 dark:text-gray-200">
                                <FaEye />
                            </div>

                            <div>
                                <Thumplike />
                            </div>

                        </div>

                    );
                })}
            </div>
        </div>
    );
};

export default Main;