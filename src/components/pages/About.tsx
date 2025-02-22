

const AboutUs = () => {
    return (
        <div className="bg-gray-100 min-h-screen py-12">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">About Us</h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto">
                        We are a team of passionate individuals dedicated to delivering the best products and services to our customers.
                    </p>
                </div>
            </div>

            {/* Our Story Section */}
            <div className="container mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Story</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Founded in 2020, our company started with a simple mission: to make high-quality products accessible to everyone. Over the years, we've grown into a trusted brand, serving thousands of happy customers worldwide.
                    </p>
                </div>

                {/* Mission and Vision Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
                        <p className="text-gray-600">
                            Our mission is to provide innovative and sustainable solutions that improve the lives of our customers and contribute to a better world.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
                        <p className="text-gray-600">
                            We envision a future where everyone has access to high-quality products that enhance their daily lives and promote sustainability.
                        </p>
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Our team is made up of talented and dedicated individuals who are passionate about what they do.
                        </p>
                    </div>

                    {/* Team Members Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Team Member 1 */}
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <img
                                src="https://via.placeholder.com/150"
                                alt="Team Member"
                                className="w-32 h-32 rounded-full mx-auto mb-4"
                            />
                            <h3 className="text-xl font-bold text-gray-800">John Doe</h3>
                            <p className="text-gray-600">CEO & Founder</p>
                        </div>

                        {/* Team Member 2 */}
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <img
                                src="https://via.placeholder.com/150"
                                alt="Team Member"
                                className="w-32 h-32 rounded-full mx-auto mb-4"
                            />
                            <h3 className="text-xl font-bold text-gray-800">Jane Smith</h3>
                            <p className="text-gray-600">Chief Marketing Officer</p>
                        </div>

                        {/* Team Member 3 */}
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <img
                                src="https://via.placeholder.com/150"
                                alt="Team Member"
                                className="w-32 h-32 rounded-full mx-auto mb-4"
                            />
                            <h3 className="text-xl font-bold text-gray-800">Michael Johnson</h3>
                            <p className="text-gray-600">Lead Developer</p>
                        </div>

                        {/* Team Member 4 */}
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <img
                                src="https://via.placeholder.com/150"
                                alt="Team Member"
                                className="w-32 h-32 rounded-full mx-auto mb-4"
                            />
                            <h3 className="text-xl font-bold text-gray-800">Sarah Lee</h3>
                            <p className="text-gray-600">Product Designer</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Us on Our Journey</h2>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
                        We're always looking for talented individuals to join our team. Check out our careers page for current openings.
                    </p>
                    <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
                        View Careers
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;