import React from 'react';

interface FooterProps {
  logo: React.ReactNode | string;
  brandName: string;
  socialLinks: Array<{
    icon: React.ReactNode | string;
    href: string;
    label: string;
  }>;
  mainLinks: Array<{
    href: string;
    label: string;
  }>;
  legalLinks: Array<{
    href: string;
    label: string;
  }>;
  copyright: {
    text: string;
    license?: string;
  };
  amazonDisclosure?: string;
}

export function Footer({
  logo,
  brandName,
  socialLinks,
  mainLinks,
  legalLinks,
  copyright,
  amazonDisclosure,
}: FooterProps) {
  return (
    <footer className="pb-6 pt-16 lg:pb-8 lg:pt-24">
      <div className="px-4 lg:px-8">
        <div className="flex items-center justify-between">
          <a
            href="/"
            className="flex items-center"
            aria-label={brandName}
          >
            {typeof logo === 'string' ? (
              <img 
                src={logo} 
                alt={brandName}
                className="h-9 w-auto object-contain"
                loading="eager"
              />
            ) : (
              logo
            )}
          </a>
          <ul className="flex list-none items-center gap-4">
            {socialLinks.map((link, i) => (
              <li key={i}>
                <a 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={link.label}
                  className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                >
                  {typeof link.icon === 'string' && link.icon === 'tiktok' ? (
                    <img 
                      src="/icon/tiktokicon.png" 
                      alt="TikTok" 
                      className="h-5 w-5 object-contain" 
                    />
                  ) : (
                    link.icon
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t mt-6 pt-6 md:mt-4 md:pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sm text-gray-600">
            <span>{copyright.text}</span>
            <div className="flex flex-wrap items-center gap-3">
              {legalLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className="underline-offset-4 hover:underline"
                >
                  {link.label}
                </a>
              ))}
              {copyright.license && (
                <span>{copyright.license}</span>
              )}
            </div>
          </div>
        </div>
        {amazonDisclosure && (
          <div 
            className="mt-6 pt-6 border-t text-sm text-gray-700 leading-relaxed text-center"
            dangerouslySetInnerHTML={{ __html: amazonDisclosure }}
          />
        )}
      </div>
    </footer>
  );
}

