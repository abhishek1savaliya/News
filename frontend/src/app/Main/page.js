import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Thumplike from '../components/Thumplike/page';
import { FaEye } from 'react-icons/fa';

const fetchArticles = async () => {
    const res = await fetch('https://news-pm9f.onrender.com/api/articles?limit=27&page=1', {
        cache: 'no-store', 
    });

    if (!res.ok) {
        throw new Error('Failed to fetch articles');
    }

    const data = await res.json();
    return data.data || [];
};

const Main = async () => {
    const articles = await fetchArticles();

    return (
        <div className="p-1 mt-2 sm:ml-96 sm:mr-96 bg-gray-600">
            <div className="p-1 dark:border-gray-700 mt-14">
                {articles
                    .sort((a, b) => b.frontPage - a.frontPage) // Sort articles: frontPage true first
                    .map((article, id) => {
                        return article.frontPage ? (
                            <div key={article._id} className="relative flex flex-col h-96 mb-2 bg-gray-50 dark:bg-gray-800">
                                <Link href={`/article/${article._id}`}>
                                    <div className="cursor-pointer flex flex-col h-full">
                                        <Image
                                            src={article.photos[0]}
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
                                    <Thumplike  />
                                </div>
                            </div>
                        ) : (
                            <div className="relative flex flex-col md:flex-row h-auto mb-2 rounded bg-gray-50 dark:bg-gray-800">
                                <Link href={`/article/${article._id}`}>
                                    <div className="flex flex-col md:flex-row w-full">
                                        <Image
                                            src={article.photos[0]}
                                            alt={article.headline}
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