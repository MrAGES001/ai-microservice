import Link from "next/link";

export default function Cancel() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">❌ Payment Cancelled</h1>
      <p className="mb-6">
        It seems your payment was not completed. You can try again or return home.
      </p>
      <Link href="/checkout">
        <a className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 mb-4">
          Try Again
        </a>
      </Link>
      <Link href="/">
        <a className="px-6 py-3 bg-gray-600 text-white rounded hover:bg-gray-700">
          Go Back Home
        </a>
      </Link>
    </div>
  );
}
