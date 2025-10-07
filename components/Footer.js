// components/Footer.js
export default function Footer() {
  return (
    <footer className="mt-16 bg-ages-dark text-white py-6 text-center">
      <p className="text-sm">
        © {new Date().getFullYear()} <span className="font-semibold">AGES AI</span>. All rights reserved.
      </p>
      <p className="mt-2 text-ages-light">
        Built with ❤️ by Emmanuel Setsoafia
      </p>
    </footer>
  );
}
