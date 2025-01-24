"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useClerk } from "@clerk/nextjs";
import { FingerPrintIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function PasskeyButton() {
  const { user } = useClerk();
  const [hasPasskey, setHasPasskey] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePasskeyClick = () => {
    if (hasPasskey) {
      setIsModalOpen(true);
    } else {
      createPasskey();
    }
  };

  useEffect(() => {
    // Check if user has passkeys on component mount
    const checkPasskeys = async () => {
      if (!user) return;
      setHasPasskey(user.passkeys.length > 0);
    };
    checkPasskeys();
  }, [user]);

  const createPasskey = async () => {
    if (!user) return;
    try {
      setIsModalOpen(false);
      const response = await user.createPasskey();
      if (response) {
        setHasPasskey(true);
        toast.success("Passkey created successfully");
      }
    } catch (error: Error | unknown) {
      if (
        error instanceof Error &&
        error.message?.includes("already registered")
      ) {
        toast.error("This passkey has already been registered");
      } else if (
        error instanceof Error &&
        (error.message?.includes("timed out") ||
          error.message?.includes("was not allowed") ||
          error.message?.includes("cancelled"))
      ) {
        // User cancelled or operation timed out - no need to show an error
        return;
      } else {
        toast.error("Failed to create passkey. Please try again.");
      }
      console.error(error);
    }
  };

  return (
    <>
      <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 max-w-xl">
        <div className="space-y-6">
          {/* User Info Section */}
          <div className="flex items-center gap-5">
            <div className="relative">
              {user?.imageUrl ? (
                <Image
                  src={user.imageUrl}
                  alt={user.fullName || "User avatar"}
                  width={72}
                  height={72}
                  className="rounded-full ring-2 ring-gray-100 dark:ring-gray-800"
                />
              ) : (
                <div className="w-[72px] h-[72px] bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <span className="text-2xl text-gray-600 dark:text-gray-300">
                    {user?.fullName?.[0] || "U"}
                  </span>
                </div>
              )}
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {user?.fullName}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {user?.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          </div>

          {/* Passkey Button Section */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={handlePasskeyClick}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 
                bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white hover:shadow-md"
            >
              <FingerPrintIcon className="w-5 h-5" />
              {hasPasskey ? "Add Another Passkey" : "Set Up Passkey"}
            </button>
            <p className="mt-3 text-xs text-center text-gray-500 dark:text-gray-400">
              {hasPasskey
                ? "Your device is secured with a passkey"
                : "Use your device's biometric authentication or security key"}
            </p>
          </div>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              Add Another Passkey
            </DialogTitle>
            <DialogDescription className="text-gray-500 dark:text-gray-400">
              You already have a passkey set up. Adding another passkey
              provides:
              <div className="mt-2 space-y-1">
                <ul className="list-disc list-inside">
                  <li>Backup authentication option</li>
                  <li>Access from multiple devices</li>
                  <li>Enhanced account security</li>
                </ul>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end gap-2 mt-6">
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              className="w-full sm:w-auto text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
            >
              Cancel
            </Button>
            <Button
              onClick={createPasskey}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
            >
              <FingerPrintIcon className="w-4 h-4 mr-2" />
              Add Passkey
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
