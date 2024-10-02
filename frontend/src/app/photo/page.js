import Image from 'next/image';
import React from 'react'

const photoLinks = [
    "https://img.freepik.com/premium-photo/beautiful-wallpaper-hd-best-quality-hyper-realistic-colorful-image-background_621955-8118.jpg",
    "https://img.freepik.com/premium-photo/beautiful-wallpaper-hd-best-quality-hyper-realistic-colorful-image-background_621955-8118.jpg",
    "https://img.freepik.com/premium-photo/beautiful-wallpaper-hd-best-quality-hyper-realistic-colorful-image-background_621955-8118.jpg",
    "https://img.freepik.com/premium-photo/beautiful-wallpaper-hd-best-quality-hyper-realistic-colorful-image-background_621955-8118.jpg",
    "https://img.freepik.com/premium-photo/beautiful-wallpaper-hd-best-quality-hyper-realistic-colorful-image-background_621955-8118.jpg",
    "https://img.freepik.com/premium-photo/beautiful-wallpaper-hd-best-quality-hyper-realistic-colorful-image-background_621955-8118.jpg",
    "https://img.freepik.com/premium-photo/beautiful-wallpaper-hd-best-quality-hyper-realistic-colorful-image-background_621955-8118.jpg",

];

const Photo = () => {
    return (
        <div className="p-4 sm:ml-96 sm:mr-96 bg-gray-600">
            <div className="p-4  bg-gray-700 mt-14">

                {
                    photoLinks.map((photo) => {
                        return (
                            <div className="flex flex-col h-96 mb-4 bg-gray-50 dark:bg-gray-800 ">
                                <Image
                                    src={photo}
                                    alt="Description of image"
                                    width={800}
                                    height={500}
                                    className="h-96  object-cover"
                                />
                            </div>
                        )
                    })
                }


            </div>
        </div>
    )
}

export default Photo
