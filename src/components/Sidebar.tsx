'use client'
import Link from "next/link"

const Sidebar = () => {
    const currentYear = new Date().getFullYear()
    const userName = process.env.MY_NAME
    return (
        <aside className="w-64 bg-gray-800 text-white min-h-screen p-4 fixed left-0 top-0">
            {/* Brand Logo */}
            <div className="mb-8 p-2 border-b border-gray-700">
                <h1 className="text-xl font-bold">MyDashboard</h1>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-2">
                <Link 
                    href="/" 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition"
                    >
                    <span>ℹ️</span>
                    <span>About</span>
                </Link>
                <Link 
                    href="/projects" 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition"
                    >
                    <span>💼</span>
                    <span>Projects</span>
                </Link>
                <Link 
                    href="/settings" 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition"
                    >
                    <span>⚙️</span>
                    <span>Settings</span>
                </Link>
            </nav>

            {/* Bottom Section */}
            <div className="absolute bottom-4 left-4 right-4">
                <div suppressHydrationWarning className="p-3 text-sm text-gray-400 border-t border-gray-700">
                    {`© ${currentYear} ${userName}`}
                </div>
            </div>
        </aside>
    )
}

export default Sidebar