"use client";

import { useCart } from "@/hooks/useCart";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  ClipboardCopy,
  X as CloseIcon,
  Heart,
  LogOut,
  Menu,
  Moon,
  Search,
  Settings,
  ShoppingCart,
  Sun,
  User,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const Header = () => {
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { items } = useCart();
  // const { userId } = useAuth();

  // Initialize searchTerm from URL
  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "");

  const handleSearch = useCallback(
    (term: string) => {
      setSearchTerm(term);
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set("query", term);
      } else {
        params.delete("query");
      }

      const scrollY = window.scrollY; // Save current scroll position
      router.replace(`/?${params.toString()}`, { scroll: false }); // Update URL without scrolling
      window.scrollTo(0, scrollY); // Restore scroll position
    },
    [searchParams, router]
  );

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const copyUserId = () => {
    if (user?.id) {
      navigator.clipboard.writeText(user.id);
      // Optionally add a toast notification here
    }
  };

  return (
    <>
      <header className="border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Add Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 hover:bg-indigo-50 dark:hover:bg-gray-800 rounded-full"
            >
              <Menu size={24} className="text-gray-600 dark:text-gray-400" />
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="font-bold text-xl relative group hover:text-indigo-600 dark:text-white transition-colors duration-300"
            >
              STORE
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {["Shop", "Collections", "New Arrivals"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(" ", "-")}`}
                  className="relative group"
                >
                  <span className="text-gray-600 dark:text-gray-300 group-hover:text-indigo-600 transition-colors duration-300">
                    {item}
                  </span>
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 origin-left transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {mounted && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 hover:bg-indigo-50 dark:hover:bg-gray-800 rounded-full transition-colors duration-300 hidden md:block"
                >
                  <motion.div
                    animate={{ rotate: theme === "dark" ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {theme === "dark" ? (
                      <Sun
                        size={20}
                        className="text-gray-600 dark:text-gray-400 hover:text-indigo-600"
                      />
                    ) : (
                      <Moon
                        size={20}
                        className="text-gray-600 hover:text-indigo-600"
                      />
                    )}
                  </motion.div>
                </motion.button>
              )}

              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:bg-indigo-50 dark:hover:bg-gray-800 rounded-full transition-colors duration-300"
              >
                <Search
                  size={20}
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600"
                />
              </button>

              {isSignedIn ? (
                <div className="relative">
                  <div className="flex items-center gap-2">
                    <UserButton
                      afterSignOutUrl="/"
                      appearance={{
                        elements: {
                          avatarBox: "w-9 h-9 rounded-full",
                        },
                      }}
                    />
                    <button
                      onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                      className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition-colors"
                    >
                      <span className="text-sm hidden md:block">Account</span>
                      <ChevronDown size={16} />
                    </button>
                  </div>

                  {/* Account Dropdown Menu */}
                  <AnimatePresence>
                    {isAccountMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-50 border dark:border-gray-700"
                      >
                        <div className="px-4 py-2 border-b dark:border-gray-700">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {user?.fullName || user?.username}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {user?.primaryEmailAddress?.emailAddress}
                          </p>
                        </div>

                        <div className="py-1">
                          <Link
                            href={`/account/${user?.id}`}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => setIsAccountMenuOpen(false)}
                          >
                            <Settings size={16} />
                            Account Settings
                          </Link>
                          <Link
                            href={`wishlist`}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => setIsAccountMenuOpen(false)}
                          >
                            <Heart size={16} />
                            Wishlist
                          </Link>

                          <button
                            onClick={copyUserId}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <ClipboardCopy size={16} />
                            Copy User ID
                          </button>

                          <button
                            onClick={() => signOut()}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <LogOut size={16} />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  href="/sign-in"
                  className="p-2 hover:bg-indigo-50 dark:hover:bg-gray-800 rounded-full transition-colors duration-300"
                >
                  <User
                    size={20}
                    className="text-gray-600 dark:text-gray-400 hover:text-indigo-600"
                  />
                </Link>
              )}

              <Link
                href="/cart"
                className="p-2 hover:bg-indigo-50 dark:hover:bg-gray-800 rounded-full relative transition-colors duration-300"
              >
                <ShoppingCart
                  size={20}
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600"
                />
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {items.length}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Menu - Added AnimatePresence */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
            >
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg"
              >
                <div className="p-4">
                  {/* Brand Logo */}
                  <div className="flex items-center justify-between mb-8">
                    <Link
                      href="/"
                      className="font-bold text-2xl text-gray-800 dark:text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      STORE
                    </Link>
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                    >
                      <CloseIcon
                        size={24}
                        className="text-gray-500 dark:text-gray-400"
                      />
                    </button>
                  </div>

                  {/* Mobile Navigation Links */}
                  <div className="space-y-4">
                    {["Shop", "Collections", "New Arrivals"].map((item) => (
                      <Link
                        key={item}
                        href={`/${item.toLowerCase().replace(" ", "-")}`}
                        className="block py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition-colors duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item}
                      </Link>
                    ))}
                  </div>

                  {/* Enhanced Theme Toggle Switch */}
                  {mounted && (
                    <div className="mt-8 flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        {theme === "dark" ? "Dark Mode" : "Light Mode"}
                      </span>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          setTheme(theme === "dark" ? "light" : "dark")
                        }
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                          theme === "dark" ? "bg-indigo-600" : "bg-gray-200"
                        }`}
                      >
                        <motion.div
                          animate={{
                            x: theme === "dark" ? 25 : 2,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 700,
                            damping: 30,
                          }}
                          className="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg"
                        />
                      </motion.button>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {/* Search Modal */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20"
            >
              <motion.div
                initial={{ y: -50, scale: 0.9 }}
                animate={{
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    damping: 20,
                    stiffness: 300,
                  },
                }}
                exit={{
                  y: -50,
                  scale: 0.9,
                  transition: {
                    type: "spring",
                    damping: 25,
                    stiffness: 300,
                  },
                }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-800 w-full max-w-2xl mx-4 rounded-lg shadow-lg"
              >
                <div className="p-4 relative">
                  {/* Search Modal Close Button */}
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-4 top-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                    aria-label="Close search"
                  >
                    <CloseIcon
                      size={24}
                      strokeWidth={2}
                      className="text-gray-500 dark:text-gray-400"
                    />
                  </button>

                  <div className="relative">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setIsSearchOpen(false);
                      }}
                    >
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full p-4 pl-12 border rounded-lg dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      />
                      <Search
                        size={20}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                    </form>
                  </div>

                  <div className="mt-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      Popular Searches
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {["Shoes", "T-Shirts", "Accessories", "New Arrivals"].map(
                        (term) => (
                          <button
                            key={term}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          >
                            {term}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </AnimatePresence>

      {/* Add click outside handler for the dropdown */}
      {isAccountMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsAccountMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
