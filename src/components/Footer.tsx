import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/social-hub', label: 'Hub' },
    { href: '/contact', label: 'Contact' },
  ];

  const socialLinks = [
    { href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
    { href: 'https://github.com/yourusername', label: 'GitHub' },
    { href: 'https://twitter.com/yourusername', label: 'Twitter' },
  ];

  return (
    <footer className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center space-x-6" aria-label="Footer">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-500 hover:text-gray-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8 flex justify-center space-x-6">
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-400 hover:text-gray-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>
        <p className="mt-8 text-center text-gray-400">
          © {currentYear} Angesh Vikram. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer; 