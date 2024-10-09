import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { FaEye } from 'react-icons/fa';
import moment from 'moment'
import Thumplike from '../Thumplike/page';

const Newsfeed = ({ articles }) => {
    return (
        <div className="p-1 dark:border-gray-700 mt-14">
            {articles?.sort((a, b) => b.frontPage - a.frontPage).map((article, id) => {
                return article.frontPage ? (
                    <div key={article._id} className="relative flex flex-col h-96 mb-2 bg-gray-50 dark:bg-gray-800">
                        <Link href={`/article/${article._id}`}>
                            <div className="cursor-pointer flex flex-col h-full">
                                {article.photos && article.photos[0]?.url ? (
                                    <Image
                                        src={article.photos[0].url}  // Accessing the 'url' property correctly
                                        alt={article.headline}
                                        width={800}
                                        height={500}
                                        className="h-72 object-cover"
                                    />
                                ) : (
                                    <Image
                                        src="/fallback-image.jpg"
                                        alt="Fallback image"
                                        width={800}
                                        height={500}
                                        className="h-72 object-cover"
                                    />
                                )}
                                <p className="text-gray-800 text-lg dark:text-gray-200 p-4" style={{ letterSpacing: '0.05em' }}>
                                    {article.headline}
                                </p>
                            </div>
                        </Link>

                        <div className="absolute top-2 right-2 text-gray-800 dark:text-gray-200">
                            <div className="tooltip tooltip-left tooltip-info" data-tip={article.view}>
                                <FaEye />
                            </div>
                        </div>

                        <div>
                            <Thumplike country={article.country} state={article.state} city={article.city} date={article.createdAt} like={article.like} dislike={article.dislike} id={article._id} />
                        </div>
                    </div>

                ) : (
                    <div className="relative flex flex-col md:flex-row h-auto mb-2 rounded bg-gray-50 dark:bg-gray-800">
                        <Link href={`/article/${article._id}`}>
                            <div className="flex flex-col md:flex-row w-full">
                                {article.photos && article.photos[0]?.url ? (
                                    <Image
                                        src={article.photos[0].url}
                                        alt={article.headline}
                                        width={140}
                                        height={140}
                                        className="h-36 w-full md:w-1/3 object-cover rounded-l rounded-tr-none"
                                    />
                                ) : (
                                    <Image
                                        src="/fallback-image.jpg" 
                                        alt="Fallback image"
                                        width={140}
                                        height={140}
                                        className="h-36 w-full md:w-1/3 object-cover rounded-l rounded-tr-none"
                                    />
                                )}
                                <p className="text-gray-800 text-lg dark:text-gray-200 p-4 flex-grow" style={{ letterSpacing: '0.05em' }}>
                                    {article.headline}
                                </p>
                            </div>
                        </Link>

                        <div className="absolute top-2 right-2 cursor-pointer text-gray-800 dark:text-gray-200">
                            <div className="tooltip tooltip-left tooltip-info" data-tip={article.view}>
                                <FaEye />
                            </div>
                        </div>

                        <div>
                            <Thumplike country={article.country} state={article.state} city={article.city} date={article.createdAt} like={article.like} dislike={article.dislike} id={article._id} />
                        </div>
                    </div>
                );
            })}

        </div>
    )
}

export default Newsfeed
