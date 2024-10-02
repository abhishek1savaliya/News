'use client'
import { usePathname } from 'next/navigation'
import React from 'react';
import { useRouter } from 'next/router';

const newsCategories = [
    { field: "Top News", icon: "" },
    { field: "Local", icon: "" },
    { field: "Gujarat", icon: "" },
    { field: "Entertainment", icon: "" },
    { field: "Sports", icon: "" },
    { field: "India", icon: "" },
    { field: "Dharm Darshan", icon: "" },
    { field: "World", icon: "" },
    { field: "Utility", icon: "" },
    { field: "Lifestyle", icon: "" },
    { field: "Business", icon: "" },
    { field: "Rashifal", icon: "" },
    { field: "Magazine", icon: "" }
];

const Sidebar = () => {
    const pathname = usePathname()

    if (pathname === '/profile' || pathname === '/admin') {
        return null;
    }

    return (
        <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-96 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
            <div className="h-full px-16 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
                    {newsCategories.map((category, index) => (
                        <li key={index}>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">{category.field}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}

export default Sidebar;