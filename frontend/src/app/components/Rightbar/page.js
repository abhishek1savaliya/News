'use client'
import { usePathname } from 'next/navigation'
import React from 'react';

const newsCategories = [
    { field: "Top News", icon: "" }
];

const Rightbar = () => {

    const pathname = usePathname()

    if (pathname === '/profile' || pathname === '/admin') {
        return null;
    }

    return (

        <aside id="logo-sidebar" class="fixed top-0 right-0 z-40 w-72 h-screen pt-20 transition-transform -translate-x-full bg-white border-l border-gray-200 sm:translate-x-0 sm:block hidden dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
            <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
                    <li className="bg-gray-200 dark:bg-gray-700 rounded-lg p-20 pb-44">
                        <span className="flex-1 whitespace-nowrap">abc</span>
                    </li>
                    <li className="bg-gray-200 dark:bg-gray-700 rounded-lg p-20 pb-44">
                        <span className="flex-1 whitespace-nowrap">abc</span>
                    </li>
                </ul>
            </div>
        </aside>
    );
}

export default Rightbar;

