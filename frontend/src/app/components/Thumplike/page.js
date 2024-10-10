'use client';
import React from 'react';
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import moment from 'moment';
import { GoSignIn } from "react-icons/go";
import Link from 'next/link';

const Thumplike = ({ country, state, city, date, like, dislike, id }) => {
    const now = moment();
    const diffDuration = moment.duration(now.diff(moment(date)));
    const days = diffDuration.asDays();
    const hours = diffDuration.asHours();
    const minutes = diffDuration.asMinutes();

    let formattedTimeAgo;
    if (days >= 1) {
        formattedTimeAgo = `${Math.floor(days)} day${Math.floor(days) !== 1 ? 's' : ''} ago`;
    } else if (hours >= 1) {
        formattedTimeAgo = `${Math.floor(hours)} hour${Math.floor(hours) !== 1 ? 's' : ''} ago`;
    } else {
        formattedTimeAgo = `${Math.floor(minutes)} minute${Math.floor(minutes) !== 1 ? 's' : ''} ago`;
    }

    const formattedDate = moment(date).format('DD/MM/YY hh:mm A');

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    return (
        <>
            <div className="tooltip tooltip-left tooltip-accent" data-tip={`${state} ${country}`}>
                <span className="text-white">{city}</span>
            </div>
            <div className="tooltip tooltip-left tooltip-success" data-tip={formattedDate}>
                <span className="text-white">{formattedTimeAgo}</span>
            </div>

            {token ? ( 
                <>
                    <button className="text-gray-800 dark:text-gray-200 cursor-pointer">
                        <FaThumbsUp />
                    </button>
                    <button className="text-gray-800 dark:text-gray-200 cursor-pointer">
                        <FaThumbsDown />
                    </button>
                </>
            ) : (
                <Link href="/signin" className={`block text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400`}>
                    <GoSignIn />
                </Link>
            )}
        </>
    );
}

export default Thumplike;
