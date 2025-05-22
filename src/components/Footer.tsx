import Link from "next/link"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left Section - Branding */}
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="text-2xl font-bold mb-2 hover:text-blue-400 transition">
              YourPortfolio
            </Link>
            <p className="text-gray-400 text-sm">
              © {currentYear} All rights reserved
            </p>
          </div>

          {/* Middle Section - Quick Links */}
          <nav className="flex flex-wrap justify-center gap-4 md:gap-8">
            <Link href="/about" className="hover:text-blue-400 transition">
              About
            </Link>
            <Link href="/projects" className="hover:text-blue-400 transition">
              Projects
            </Link>
            <Link href="/contact" className="hover:text-blue-400 transition">
              Contact
            </Link>
            <Link href="/blog" className="hover:text-blue-400 transition">
              Blog
            </Link>
          </nav>

          {/* Right Section - Social Icons */}
          <div className="flex gap-4">
            <a 
              href="https://github.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
              aria-label="GitHub"
            >
              <span className="text-xl">🐙</span> {/* Replace with actual icon */}
            </a>
            <a 
              href="https://linkedin.com/in/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
              aria-label="LinkedIn"
            >
              <span className="text-xl">💼</span> {/* Replace with actual icon */}
            </a>
            <a 
              href="mailto:you@example.com" 
              className="text-gray-400 hover:text-white transition"
              aria-label="Email"
            >
              <span className="text-xl">✉️</span>
            </a>
          </div>
        </div>

        {/* Optional Divider */}
        <hr className="border-gray-700 my-6" />

        {/* Bottom Text */}
        <p className="text-center text-gray-500 text-sm">
          Built with Next.js, TypeScript, and Tailwind CSS
        </p>
      </div>
    </footer>
  );
};

export default Footer