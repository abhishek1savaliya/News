import Newsfeed from '@/app/components/Newsfeed/page';
import Pagination from '@/app/components/Pagination/page';
import React from 'react'

const Feed = async ({ params }) => {

    const page = params?.page || 1;

    const response = await fetch(`https://news-pm9f.onrender.com/api/articles?limit=10&page=${page}`);
    const articles = await response.json();

    return (
   
           <div className="p-1 mt-2 sm:ml-96 sm:mr-96 bg-gray-600">
            <Newsfeed articles={articles.data} />
            <Pagination />
            </div>
      
    )
}

export default Feed
