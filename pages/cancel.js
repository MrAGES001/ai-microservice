export default function Cancel() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-center">
      <h1 className="text-3xl font-bold text-red-700 mb-4">❌ Payment Canceled</h1>
      <p className="text-gray-700 mb-6">Your payment wasn’t completed.</p>
      <a href="/" className="px-4 py-2 bg-red-600 text-white rounded-lg">Try again</a>
    </div>
  );
}
