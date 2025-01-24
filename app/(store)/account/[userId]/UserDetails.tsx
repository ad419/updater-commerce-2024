"use client";

import { useUser } from "@clerk/nextjs";

export default function UserDetails() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="w-full mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm rounded-lg p-6 space-y-4">
      <div className="flex items-center space-x-3 border-b border-gray-200 dark:border-gray-700 pb-4">
        <div className="flex-shrink-0">
          <span className="material-icons text-gray-500 dark:text-gray-400">
            account_circle
          </span>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            User ID
          </label>
          <p className="text-gray-900 dark:text-white font-mono">{user.id}</p>
        </div>
      </div>

      <div className="flex items-center space-x-3 border-b border-gray-200 dark:border-gray-700 pb-4">
        <div className="flex-shrink-0">
          <span className="material-icons text-gray-500 dark:text-gray-400">
            email
          </span>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <p className="text-gray-900 dark:text-white">
            {user.primaryEmailAddress?.emailAddress || "No email set"}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          <span className="material-icons text-gray-500 dark:text-gray-400">
            person
          </span>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Full Name
          </label>
          <p className="text-gray-900 dark:text-white">
            {user.fullName || "Not set"}
          </p>
        </div>
      </div>
    </div>
  );
}
