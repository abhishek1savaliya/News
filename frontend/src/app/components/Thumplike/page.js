
'use client'
import React from 'react'
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa'

const Thumplike = () => {
    return (
        <div className="absolute right-0 bottom-0 flex items-center p-4 space-x-4">

            <button className="text-gray-800 dark:text-gray-200 cursor-pointer">
                <FaThumbsUp />
            </button>
            <button className="text-gray-800 dark:text-gray-200 cursor-pointer">
                <FaThumbsDown />
            </button>
            <span className="text-white">3 days ago</span>
        </div>
    )
}

export default Thumplike
