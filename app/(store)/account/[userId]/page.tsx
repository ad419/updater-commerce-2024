import PasskeyButton from "./PasskeyButton";
import UserDetails from "./UserDetails";

export default async function AccountPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <UserDetails />
        <div className="pt-4 border-t">
          <PasskeyButton />
        </div>
      </div>
    </div>
  );
}
