'use client';
import React from 'react';
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import moment from 'moment';

const Thumplike = ({ date, like, dislike, id }) => {

    const days = moment().diff(moment(date), 'days');

    return (
        <div className="absolute right-0 bottom-0 flex items-center p-4 space-x-4">
            <button className="text-gray-800 dark:text-gray-200 cursor-pointer">
                <div className="tooltip tooltip-top z-50" data-tip={like}>
                    <FaThumbsUp />
                </div>
            </button>
            <button className="text-gray-800 dark:text-gray-200 cursor-pointer">
                <div className="tooltip tooltip-top z-50" data-tip={dislike}>
                    <FaThumbsDown />
                </div>
            </button>
            <span className="text-white">{days} days ago</span>
        </div>
    );
}

export default Thumplike;
