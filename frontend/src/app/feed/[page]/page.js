import Newsfeed from '@/app/components/Newsfeed/page';
import Pagination from '@/app/components/Pagination/page';
import axios from 'axios';
import React from 'react';

const Feed = async ({ params }) => {
    const page = params?.page || 1;

    try {
        const response = await axios.get(`https://news-pm9f.onrender.com/api/articles`, {
            params: {
                limit: 10,
                page: page,
            },
        });
        const articles = response.data;

        return (
            <div className="p-1 mt-2 bg-gray-600 mx-4 sm:mx-10 lg:mx-40 xl:mx-72">
                <Newsfeed articles={articles.data} />
                <Pagination />
            </div>

        );
    } catch (error) {
        console.error('Error fetching articles:', error);
        return (
            <div className="p-1 mt-2 sm:ml-96 sm:mr-96 bg-gray-600">
                <p>Error loading articles. Please try again later.</p>
            </div>
        );
    }
};

export default Feed;