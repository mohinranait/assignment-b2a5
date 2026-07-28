import React from 'react'

const Footer = () => {
  return (
     <footer className="border-t border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {[
              {
                title: "Product",
                links: ["Browse Gear", "How It Works", "Pricing", "Become a Provider"],
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers", "Contact"],
              },
              {
                title: "Support",
                links: ["Help Center", "Safety", "Terms", "Privacy"],
              },
              {
                title: "Follow",
                links: ["Twitter", "Instagram", "Facebook", "LinkedIn"],
              },
            ].map((column) => (
              <div key={column.title}>
                <h3 className="font-semibold">{column.title}</h3>
                <ul className="mt-4 space-y-2">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 GearRent. All rights reserved.</p>
          </div>
        </div>
      </footer>
  )
}

export default Footer