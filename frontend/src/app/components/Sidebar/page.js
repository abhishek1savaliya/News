'use client'
import { useState } from 'react';
import { usePathname } from 'next/navigation';

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
];

const Sidebar = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    // Hide the sidebar on specific pages like '/profile' or '/admin'
    if (pathname === '/profile' || pathname === '/admin' || pathname === '/signin'|| pathname === '/signup') {
        return null;
    }

    return (
        <>
            {/* Hamburger icon for small screens */}
            <button
                onClick={toggleSidebar}
                className="sm:hidden fixed top-4 left-4 z-50 p-2 text-gray-500 bg-white rounded-md focus:outline-none focus:ring"
            >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M3 6h18M3 12h18m-9 6h9" clipRule="evenodd" />
                </svg>
            </button>

            {/* Sidebar */}
            <aside
                id="logo-sidebar"
                className={`fixed top-0 left-0 z-40 w-72 h-screen pt-20 bg-white border-r border-gray-200 transition-transform dark:bg-gray-800 dark:border-gray-700 ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
                aria-label="Sidebar"
            >
                <div className="h-full px-4 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">News Categories</h2>
                   
                        <button
                            onClick={toggleSidebar}
                            className="p-2 sm:hidden text-gray-500"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6 6L14 14M6 14L14 6" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>

                    <ul className="space-y-2 font-medium mt-4">
                        {newsCategories.map((category, index) => (
                            <li key={index}>
                                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                        <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">{category.field}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>

            {/* Overlay for small screens when the sidebar is open */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-30 sm:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}
        </>
    );
};

export default Sidebar;