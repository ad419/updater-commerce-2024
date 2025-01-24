"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { HiMail } from "react-icons/hi";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Company
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Your trusted source for premium products and exceptional service.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-500 hover:text-blue-500 dark:hover:text-blue-400"
              >
                <FaFacebook size={24} />
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-blue-400 dark:hover:text-blue-300"
              >
                <FaTwitter size={24} />
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-pink-500 dark:hover:text-pink-400"
              >
                <FaInstagram size={24} />
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-500"
              >
                <FaLinkedin size={24} />
              </Link>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {["About Us", "Shop", "Contact", "FAQ"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Customer Service */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Customer Service
            </h3>
            <ul className="space-y-2">
              {[
                "Shipping Policy",
                "Returns",
                "Privacy Policy",
                "Terms of Service",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Newsletter
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Subscribe to our newsletter for updates and exclusive offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-l-md border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
              <button className="rounded-r-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                <HiMail size={24} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-700"
        >
          <p className="text-center text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
