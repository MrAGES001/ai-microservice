import { useState } from "react";

export default function Checkout() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      // Call your API route that handles Stripe
      const res = await fetch("/api/checkout", {
        method: "POST",
      });

      const data = await res.json();

      if (data.url) {
        // Redirect the user to Stripe Checkout
        window.location.href = data.url;
      } else {
        alert("Failed to create checkout session.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("An error occurred during checkout.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Subscribe to AGES AI</h1>
      <p className="mb-6 text-center">
        Get access to premium AI features with a one-time payment of $5.
      </p>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Redirecting..." : "Checkout Now"}
      </button>
    </div>
  );
}
