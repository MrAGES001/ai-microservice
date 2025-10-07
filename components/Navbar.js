// components/Navbar.js
export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
      {/* Left Section: Logo + Brand */}
      <div className="flex items-center space-x-3">
        {/* Replace /logo.svg with your actual logo name in /public */}
        <img
          src="/logo.svg"
          alt="AGES AI Logo"
          className="h-10 w-10 object-cover rounded-full border border-gray-200"
          onError={(e) => (e.target.style.display = 'none')}
        />
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight hover:text-blue-600 transition-all duration-300">
          AGES <span className="text-blue-600">AI</span>
        </h1>
      </div>

      {/* Right Section: Links */}
      <div className="space-x-6 text-gray-600 font-medium">
        <a href="#" className="hover:text-blue-600 transition">Home</a>
        <a href="#" className="hover:text-blue-600 transition">Docs</a>
        <a href="#" className="hover:text-blue-600 transition">Contact</a>
      </div>
    </nav>
  );
}

