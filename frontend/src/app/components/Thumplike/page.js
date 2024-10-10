'use client';
import React from 'react';
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import moment from 'moment';

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

    return (
        <>
            <div className="tooltip tooltip-left tooltip-accent" data-tip={`${state} ${country}`}>
                <span className="text-white">{city}</span>
            </div>
            <div className="tooltip tooltip-left tooltip-success" data-tip={formattedDate}>
                <span className="text-white">{formattedTimeAgo}</span>
            </div>


            <button className="text-gray-800 dark:text-gray-200 cursor-pointer">
                <FaThumbsUp />
            </button>
            <button className="text-gray-800 dark:text-gray-200 cursor-pointer">
                <FaThumbsDown />
            </button>
        </>

        // </div>
    );
}

export default Thumplike;
