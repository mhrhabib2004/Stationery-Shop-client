import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";


export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10 px-4">
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
      {/* Section 1: About */}
      <div>
        <h3 className="text-lg font-semibold mb-4">About Us</h3>
        <p className="text-sm text-gray-300">
          We are dedicated to providing the best services and products. Follow us for updates and offers!
        </p>
      </div>

      {/* Section 2: Quick Links */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
        <ul className="space-y-2">
          <li><a href="/about" className="text-sm text-gray-300 hover:text-white">About Us</a></li>
          <li><a href="/privacy" className="text-sm text-gray-300 hover:text-white">Privacy Policy</a></li>
          <li><a href="/terms" className="text-sm text-gray-300 hover:text-white">Terms & Conditions</a></li>
          <li><a href="/faq" className="text-sm text-gray-300 hover:text-white">FAQ</a></li>
          <li><a href="/contact" className="text-sm text-gray-300 hover:text-white">Contact Us</a></li>
        </ul>
      </div>

      {/* Section 3: Contact Info */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
        <ul className="text-sm text-gray-300 space-y-2">
          <li>Address: 123 Main Street, City</li>
          <li>Phone: +123 456 7890</li>
          <li>Email: info@example.com</li>
          <li>Business Hours: Mon-Fri, 9 AM - 5 PM</li>
        </ul>
      </div>
    </div>

    {/* Social Media Icons */}
    <div className="mt-10 text-center">
      <div className="flex justify-center space-x-6 text-2xl">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
          <FaFacebook />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
          <FaTwitter />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">
          <FaInstagram />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
          <FaLinkedin />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-500">
          <FaYoutube />
        </a>
      </div>
      <p className="text-sm text-gray-400 mt-5">
        &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
      </p>
    </div>
  </footer>
  )
}
