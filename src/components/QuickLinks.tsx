'use client'

// components/QuickLinks.tsx
interface LinkItem {
  name: string;
  url: string;
  icon: string; // Emoji or SVG
}

const QuickLinks = () => {
  const links: LinkItem[] = [
    { name: "GitHub", url: "https://github.com", icon: "💻" },
    { name: "LinkedIn", url: "https://linkedin.com", icon: "🔗" },
    { name: "Portfolio", url: "#", icon: "🌟" },
  ]

  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
      <h3 className="font-semibold text-gray-700 mb-3">Quick Links</h3>
      <div className="space-y-2">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition"
          >
            <span className="text-xl">{link.icon}</span>
            <span>{link.name}</span>
          </a>
        ))}
      </div>
    </div>
  )
}

export default QuickLinks