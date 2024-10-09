'use client';
import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Pagination = async () => {

    const pathname = usePathname();
    const feedNumber = pathname.split('/').pop();



    const fetchPaginationData = async () => {
        try {
            const response = await axios.get(`https://news-pm9f.onrender.com/api/articles/pagination?limit=10&page=1`);
            return response.data.data; // Return the data directly
        } catch (error) {
            console.error("Error fetching pagination data:", error);
            return { currentPage: 1, totalPages: 1 }; // Default return if error occurs
        }
    };

    // Fetch the data for pagination
    const data = await fetchPaginationData();
    const currentPage = data.currentPage;
    const totalPages = data.totalPages;

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex justify-center mb-3">
            <nav aria-label="Page navigation example">
                <ul className="inline-flex -space-x-px text-base h-10">
                    {/* Page numbers */}
                    {pageNumbers.map((page) => (
                        <li key={page}>
                            <Link href={`/feed/${page}`} passHref>
                                <button
                                    className={`flex items-center justify-center px-4 h-10 leading-tight 
                border border-gray-300 
                text-gray-500 
                hover:bg-gray-100 hover:text-gray-700 
                dark:bg-gray-800 dark:border-gray-700 
                dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white
                ${feedNumber === page.toString() ? 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white' : ''}`} // Highlight current page
                                >
                                    {page}
                                </button>

                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;