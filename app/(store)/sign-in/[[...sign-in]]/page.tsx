import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="absolute inset-0 bg-[url(/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

      <div className="relative w-full max-w-md px-6 pt-12 pb-16">
        <div className="mx-auto mb-6 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
          <p className="text-sm font-semibold text-gray-700">Welcome back!</p>
        </div>

        <SignIn
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-sm normal-case transition-all duration-300",
              card: "bg-white/75 backdrop-blur-xl shadow-xl rounded-3xl border border-gray-100",
              headerTitle:
                "text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500",
              headerSubtitle: "text-gray-600",
              socialButtonsBlockButton:
                "border border-gray-200 hover:bg-gray-50/50 hover:border-gray-300 transition-all duration-300",
              socialButtonsBlockButtonText: "font-medium text-gray-600",
              formFieldInput:
                "rounded-xl border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300",
              footerActionLink: "text-indigo-500 hover:text-indigo-600",
              dividerLine: "bg-gray-200",
              dividerText: "text-gray-500",
            },
          }}
        />
      </div>
    </div>
  );
}
