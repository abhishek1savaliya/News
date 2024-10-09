'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const isActiveLink = (path) => {
        return pathname === path;
    }

    return (
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    <Link
                        href="/"

                    >
                        <div className="flex-shrink-0">
                            <span className='text-2xl text-blue-600'>
                                ANews
                            </span>
                        </div>
                    </Link>
                    {/* Menu Toggle Button for Mobile */}
                    <div className="block lg:hidden">
                        <button
                            onClick={toggleMobileMenu}
                            className="inline-flex items-center justify-center p-2 text-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                            aria-expanded={isMobileMenuOpen}
                            aria-label="Main menu"
                        >
                            <svg
                                className="w-6 h-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Menu (Center) */}
                    <div className="hidden lg:flex lg:items-center lg:justify-center flex-1">
                        <div className="flex space-x-20">
                            <Link
                                href="/"
                                className={`text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 ${isActiveLink('/feed/1') || isActiveLink('/') ? 'text-blue-500 font-bold' : ''
                                    }`}
                            >
                                Home
                            </Link>

                            <Link href="/photo" className={`text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 ${isActiveLink('/photo') ? 'text-blue-500 font-bold' : ''}`}>
                                Photo
                            </Link>
                            <Link href="/search" className={`text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 ${isActiveLink('/search') ? 'text-blue-500 font-bold' : ''}`}>
                                Search
                            </Link>
                            <Link href="/contact" className={`text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 ${isActiveLink('/contact') ? 'text-blue-500 font-bold' : ''}`}>
                                Contact
                            </Link>
                        </div>
                    </div>

                    {/* Profile Section (Right) */}
                    <div className="hidden lg:flex lg:items-center">
                        <Link href="/profile">
                            <img className="w-10 h-10 rounded-full cursor-pointer" src="https://img.freepik.com/premium-photo/beautiful-wallpaper-hd-best-quality-hyper-realistic-colorful-image-background_621955-8118.jpg" alt="Rounded avatar" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white dark:bg-gray-800">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link href="/" className={`block text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 ${isActiveLink('/') ? 'text-blue-500 font-bold' : ''}`}>
                            Home
                        </Link>
                        <Link href="/about" className={`block text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 ${isActiveLink('/about') ? 'text-blue-500 font-bold' : ''}`}>
                            About
                        </Link>
                        <Link href="/services" className={`block text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 ${isActiveLink('/services') ? 'text-blue-500 font-bold' : ''}`}>
                            Services
                        </Link>
                        <Link href="/contact" className={`block text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 ${isActiveLink('/contact') ? 'text-blue-500 font-bold' : ''}`}>
                            Contact
                        </Link>
                        <Link href="/profile" className={`block text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 ${isActiveLink('/profile') ? 'text-blue-500 font-bold' : ''}`}>
                            Profile
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;