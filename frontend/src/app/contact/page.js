import React from 'react';

const Contact = () => {
    return (
        <div className="p-4 sm:ml-96 sm:mr-96 bg-gray-600">
            <div className="p-4 bg-gray-700 mt-14 rounded-md shadow-md">
                <h2 className="text-2xl font-semibold text-white text-center">Contact Us</h2>
                <p className="text-white mt-2">
                    If you have any questions or feedback, feel free to reach out to us!
                </p>
                <div className="mt-4">
                    <p className="text-white">
                        <strong>Email:</strong> support@newsapp.com
                    </p>
                    <p className="text-white">
                        <strong>Phone:</strong> +1 (555) 123-4567
                    </p>
                    <p className="text-white">
                        <strong>Address:</strong> 123 News St, Suite 100, News City, NC 12345
                    </p>
                </div>

                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-white">Our Contact Hours</h3>
                    <p className="text-white mt-2">Monday - Friday: 9 AM - 5 PM</p>
                    <p className="text-white">Saturday: 10 AM - 4 PM</p>
                    <p className="text-white">Sunday: Closed</p>
                </div>

       
                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-white">Location</h3>
                    <iframe
                        title="Google Map"
                        className="w-full mt-4 rounded-md"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345077697!2d144.95373531531873!3d-37.816279979751164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f1e55ff%3A0x5045675218cee5e3!2sVictoria%20Market!5e0!3m2!1sen!2sau!4v1636652207025!5m2!1sen!2sau"
                        width="600"
                        height="450"
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default Contact;
