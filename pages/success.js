import Link from "next/link";

export default function Success() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">🎉 Payment Successful!</h1>
      <p className="mb-6">
        Thank you for subscribing to AGES AI. You now have access to all premium features.
      </p>
      <Link href="/">
        <a className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700">
          Go Back Home
        </a>
      </Link>
    </div>
  );
}
