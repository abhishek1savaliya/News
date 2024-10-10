import Thumplike from '@/app/components/Thumplike/page';
import Image from 'next/image';
import React from 'react';

const Article = async ({ params }) => {
    try {
        const response = await fetch(`https://news-pm9f.onrender.com/api/articles/single/${params.id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch the article');
        }
        const article = await response.json();
        if (!article) {
            return <p>Article not found</p>;
        }

        const { headline, photos = [], content, country, state, city, createdAt, like, dislike, _id } = article;
        const headlinePhoto = photos.length > 0 ? photos[0].url : null;

        return (
            
            <div className="p-4 mt-16 bg-gray-200 mx-4 sm:mx-10 lg:mx-40 xl:mx-72 rounded-lg shadow-md">
                <div
                    key={_id}
                    className="relative flex flex-col h-auto md:h-96 mb-4 bg-white dark:bg-gray-900 rounded-lg shadow-md"
                >
                    <div>
                        <p
                            className="text-gray-900 text-center font-serif font-bold text-5xl md:text-6xl dark:text-gray-100 p-6"
                            style={{ letterSpacing: '0.02em' }}
                        >
                            {headline}
                        </p>
                    </div>

                    <div className="cursor-pointer flex flex-col h-full mb-4">
                        {headlinePhoto ? (
                            <Image
                                src={headlinePhoto}
                                alt={headline}
                                width={1000}
                                height={600}
                                className="h-60 md:h-72 object-cover rounded-t-lg"
                            />
                        ) : (
                            <Image
                                src="/fallback-image.jpg"
                                alt="Fallback image for article"
                                width={800}
                                height={500}
                                className="h-60 md:h-72 object-cover rounded-t-lg"
                            />
                        )}
                    </div>

                    <div className="p-4 text-gray-800 dark:text-gray-300">
                        <p className="text-base md:text-lg">{content}</p>
                    </div>

                    <div className="flex justify-between items-center mt-6 p-4 border-t border-gray-300 dark:border-gray-700">
                        <Thumplike
                            country={country}
                            state={state}
                            city={city}
                            date={createdAt}
                            like={like}
                            dislike={dislike}
                            id={_id}
                        />
                    </div>
                </div>
            </div>


        );
    } catch (error) {
        console.error(error);
        return <p>Error loading the article. Please try again later.</p>;
    }
};

export default Article;