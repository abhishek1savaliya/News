import React from 'react';

const Article = async () => {
    // Fetch article data from the API
    const response = await fetch('https://news-pm9f.onrender.com/api/articles/single/66fd737c47418650922c8fd2');
    const article = await response.json();

    // Destructure the necessary fields from the article
    const { headline, photos, content } = article;
    const headlinePhoto = photos.length > 0 ? photos[0].url : null;

    return (
        <div className="p-4 sm:ml-96 sm:mr-96 bg-gray-600">
            <div className="p-4 bg-gray-700 mt-14">

                {headline && (
                    <h1 className="text-xl font-bold text-white mb-2" style={{ letterSpacing: '0.1em' }}>{headline}</h1>
                )}

                {headlinePhoto && (
                    <div className="mb-4">
                        <img
                            src={headlinePhoto}
                            alt="Headline"
                            className="w-full h-64 object-cover"
                        />
                    </div>
                )}

                <div className="text-white" style={{ letterSpacing: '0.1em' }}>
                    {content ? (
                        <p className="text-lg">{content}</p>
                    ) : (
                        <p>No news available at the moment.</p>
                    )}
                </div>
                
            </div>
        </div>
    );
}

export default Article;