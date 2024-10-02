import React from 'react'

const tags = [
    {
        "name": "Breaking News",
        "bgColor": "bg-blue-800",   // Dark blue background
        "textColor": "text-blue-100" // Light blue text
    },
    {
        "name": "Top Stories",
        "bgColor": "bg-yellow-800",  // Dark yellow background
        "textColor": "text-yellow-100" // Light yellow text
    },
    {
        "name": "Latest Updates",
        "bgColor": "bg-green-800",    // Dark green background
        "textColor": "text-green-100"  // Light green text
    },
    {
        "name": "Opinion",
        "bgColor": "bg-red-800",      // Dark red background
        "textColor": "text-red-100"    // Light red text
    },
    {
        "name": "Featured",
        "bgColor": "bg-purple-800",    // Dark purple background
        "textColor": "text-purple-100"  // Light purple text
    },
    {
        "name": "Exclusive",
        "bgColor": "bg-pink-800",      // Dark pink background
        "textColor": "text-pink-100"    // Light pink text
    },
    {
        "name": "Community Picks",
        "bgColor": "bg-indigo-800",     // Dark indigo background
        "textColor": "text-indigo-100"   // Light indigo text
    },
    {
        "name": "World News",
        "bgColor": "bg-gray-800",      // Dark gray background
        "textColor": "text-gray-100"    // Light gray text
    },
    {
        "name": "Local News",
        "bgColor": "bg-green-900",     // Dark green background
        "textColor": "text-green-200"   // Light green text
    },
    {
        "name": "Health",
        "bgColor": "bg-teal-800",      // Dark teal background
        "textColor": "text-teal-100"    // Light teal text
    },
    {
        "name": "Science",
        "bgColor": "bg-emerald-800",   // Dark emerald background
        "textColor": "text-emerald-100" // Light emerald text
    },
    {
        "name": "Technology",
        "bgColor": "bg-cyan-800",      // Dark cyan background
        "textColor": "text-cyan-100"    // Light cyan text
    },
    {
        "name": "Travel",
        "bgColor": "bg-blue-600",      // Medium blue background
        "textColor": "text-blue-100"    // Light blue text
    },
    {
        "name": "Lifestyle",
        "bgColor": "bg-purple-600",    // Medium purple background
        "textColor": "text-purple-100"  // Light purple text
    },
    {
        "name": "Food",
        "bgColor": "bg-yellow-600",    // Medium yellow background
        "textColor": "text-yellow-100"  // Light yellow text
    },
    {
        "name": "Sports",
        "bgColor": "bg-red-600",       // Medium red background
        "textColor": "text-red-100"     // Light red text
    },
    {
        "name": "Finance",
        "bgColor": "bg-green-600",     // Medium green background
        "textColor": "text-green-100"   // Light green text
    },
    {
        "name": "Entertainment",
        "bgColor": "bg-pink-600",      // Medium pink background
        "textColor": "text-pink-100"    // Light pink text
    },
    {
        "name": "Education",
        "bgColor": "bg-indigo-600",     // Medium indigo background
        "textColor": "text-indigo-100"   // Light indigo text
    },
    {
        "name": "Weather",
        "bgColor": "bg-blue-300",      // Light blue background
        "textColor": "text-blue-800"    // Dark blue text
    },
    {
        "name": "Breaking Sports",
        "bgColor": "bg-yellow-700",     // Darker yellow background
        "textColor": "text-yellow-200"   // Light yellow text
    },
    {
        "name": "Fashion",
        "bgColor": "bg-purple-700",    // Darker purple background
        "textColor": "text-purple-200"  // Light purple text
    },
    {
        "name": "Motivation",
        "bgColor": "bg-green-700",     // Darker green background
        "textColor": "text-green-200"   // Light green text
    },
    {
        "name": "Tips & Tricks",
        "bgColor": "bg-red-700",       // Darker red background
        "textColor": "text-red-200"     // Light red text
    },
    {
        "name": "How-To",
        "bgColor": "bg-indigo-700",    // Darker indigo background
        "textColor": "text-indigo-200"  // Light indigo text
    },
    {
        "name": "Inspiration",
        "bgColor": "bg-teal-700",      // Darker teal background
        "textColor": "text-teal-200"    // Light teal text
    },
    {
        "name": "Product Reviews",
        "bgColor": "bg-emerald-700",   // Darker emerald background
        "textColor": "text-emerald-200" // Light emerald text
    },
    {
        "name": "Parenting",
        "bgColor": "bg-cyan-700",      // Darker cyan background
        "textColor": "text-cyan-200"    // Light cyan text
    },
    {
        "name": "Gaming",
        "bgColor": "bg-blue-400",      // Light blue background
        "textColor": "text-blue-800"    // Dark blue text
    },
    {
        "name": "Pets",
        "bgColor": "bg-pink-400",      // Light pink background
        "textColor": "text-pink-800"    // Dark pink text
    },
    {
        "name": "Photography",
        "bgColor": "bg-purple-400",    // Light purple background
        "textColor": "text-purple-800"  // Dark purple text
    },
    {
        "name": "Events",
        "bgColor": "bg-yellow-400",    // Light yellow background
        "textColor": "text-yellow-800"  // Dark yellow text
    },
    {
        "name": "Announcements",
        "bgColor": "bg-red-400",       // Light red background
        "textColor": "text-red-800"     // Dark red text
    },
    {
        "name": "Interviews",
        "bgColor": "bg-green-400",     // Light green background
        "textColor": "text-green-800"   // Dark green text
    },
    {
        "name": "Reviews",
        "bgColor": "bg-indigo-400",    // Light indigo background
        "textColor": "text-indigo-800"  // Dark indigo text
    },
    {
        "name": "Features",
        "bgColor": "bg-teal-400",      // Light teal background
        "textColor": "text-teal-800"    // Dark teal text
    },
    {
        "name": "Editorial",
        "bgColor": "bg-emerald-400",   // Light emerald background
        "textColor": "text-emerald-800" // Dark emerald text
    },
    {
        "name": "Motorsport",
        "bgColor": "bg-cyan-400",      // Light cyan background
        "textColor": "text-cyan-800"    // Dark cyan text
    },
    {
        "name": "Culture",
        "bgColor": "bg-blue-200",      // Light blue background
        "textColor": "text-blue-900"    // Dark blue text
    },
    {
        "name": "Social Media",
        "bgColor": "bg-pink-200",      // Light pink background
        "textColor": "text-pink-900"    // Dark pink text
    },
    {
        "name": "In-Depth",
        "bgColor": "bg-purple-200",    // Light purple background
        "textColor": "text-purple-900"  // Dark purple text
    },
    {
        "name": "Real Estate",
        "bgColor": "bg-yellow-200",    // Light yellow background
        "textColor": "text-yellow-900"  // Dark yellow text
    },
    {
        "name": "Volunteering",
        "bgColor": "bg-red-200",       // Light red background
        "textColor": "text-red-900"     // Dark red text
    },
    {
        "name": "Philanthropy",
        "bgColor": "bg-green-200",     // Light green background
        "textColor": "text-green-900"   // Dark green text
    },
    {
        "name": "Sustainability",
        "bgColor": "bg-indigo-200",    // Light indigo background
        "textColor": "text-indigo-900"  // Dark indigo text
    },
    {
        "name": "Future Trends",
        "bgColor": "bg-teal-200",      // Light teal background
        "textColor": "text-teal-900"    // Dark teal text
    },
    {
        "name": "Youth",
        "bgColor": "bg-emerald-200",   // Light emerald background
        "textColor": "text-emerald-900" // Dark emerald text
    },
    {
        "name": "Retirement",
        "bgColor": "bg-cyan-200",      // Light cyan background
        "textColor": "text-cyan-900"    // Dark cyan text
    },
    {
        "name": "Diversity",
        "bgColor": "bg-blue-100",      // Light blue background
        "textColor": "text-blue-900"    // Dark blue text
    },
    {
        "name": "Women Empowerment",
        "bgColor": "bg-pink-100",      // Light pink background
        "textColor": "text-pink-900"    // Dark pink text
    },
    {
        "name": "Global Issues",
        "bgColor": "bg-purple-100",    // Light purple background
        "textColor": "text-purple-900"  // Dark purple text
    },
    {
        "name": "Human Rights",
        "bgColor": "bg-yellow-100",    // Light yellow background
        "textColor": "text-yellow-900"  // Dark yellow text
    },
    {
        "name": "Crisis Management",
        "bgColor": "bg-red-100",       // Light red background
        "textColor": "text-red-900"     // Dark red text
    },
    {
        "name": "Urban Development",
        "bgColor": "bg-green-100",     // Light green background
        "textColor": "text-green-900"   // Dark green text
    },
    {
        "name": "Digital Marketing",
        "bgColor": "bg-indigo-100",    // Light indigo background
        "textColor": "text-indigo-900"  // Dark indigo text
    },
    {
        "name": "Artificial Intelligence",
        "bgColor": "bg-teal-100",      // Light teal background
        "textColor": "text-teal-900"    // Dark teal text
    },
    {
        "name": "Blockchain",
        "bgColor": "bg-emerald-100",   
        "textColor": "text-emerald-900" 
    }
];


const Search = () => {
    return (
        <div className="p-4 sm:ml-96 sm:mr-96 bg-gray-600">
            <div className="p-4  bg-gray-700 mt-14">

                <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>

                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none cursor-pointer">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>

                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />

                </div>

                <div class="flex flex-wrap space-x-2 mt-5">

                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className={`${tag.bgColor} ${tag.textColor} text-base font-medium me-2 px-4 py-3 rounded-full mb-3 mt-3 cursor-pointer`}
                        >
                            {tag.name}
                        </span>
                    ))}


                </div>



            </div>
        </div>
    )
}

export default Search
