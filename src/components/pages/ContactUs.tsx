
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

const ContactUs = () => {
    return (
        <div className="bg-gray-100 min-h-screen py-12">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Contact Us</h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto">
                        We'd love to hear from you! Reach out to us for any questions, feedback, or inquiries.
                    </p>
                </div>
            </div>

            {/* Contact Form and Info Section */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
                        <form>
                            <div className="mb-6">
                                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Your Name"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Your Email"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    placeholder="Your Message"
                                    rows={5}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
                        <div className="space-y-6">
                            {/* Address */}
                            <div className="flex items-start">
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <FaMapMarkerAlt className="h-6 w-6 text-blue-600" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold text-gray-800">Our Office</h3>
                                    <p className="text-gray-600">123 Main Street, City, Country</p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-start">
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <FaPhone className="h-6 w-6 text-blue-600" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold text-gray-800">Phone</h3>
                                    <p className="text-gray-600">+123 456 7890</p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start">
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <FaEnvelope className="h-6 w-6 text-blue-600" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                                    <p className="text-gray-600">info@example.com</p>
                                </div>
                            </div>

                            {/* Social Media Links */}
                            <div className="flex items-start">
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <FaTwitter className="h-6 w-6 text-blue-600" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold text-gray-800">Follow Us</h3>
                                    <div className="flex space-x-4 mt-2">
                                        <a href="#" className="text-gray-600 hover:text-blue-600">
                                            <FaTwitter className="h-6 w-6" />
                                        </a>
                                        <a href="#" className="text-gray-600 hover:text-blue-600">
                                            <FaFacebook className="h-6 w-6" />
                                        </a>
                                        <a href="#" className="text-gray-600 hover:text-blue-600">
                                            <FaInstagram className="h-6 w-6" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;