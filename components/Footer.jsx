import Link from "next/link";

const Footer = () => {
  // SVG ICONS
  const MailIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H4.5A2.25 2.25 0 0 1 2.25 17.25V6.75m19.5 0L12 12.75 2.25 6.75m19.5 0H2.25"
      />
    </svg>
  );

  const PhoneIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 4.5l2.955-1.182a2.25 2.25 0 0 1 2.97 1.392l1.17 3.508a2.25 2.25 0 0 1-.57 2.295L6.72 13.5a16.5 16.5 0 0 0 7.78 7.78l2.988-2.055a2.25 2.25 0 0 1 2.295-.57l3.508 1.17a2.25 2.25 0 0 1 1.392 2.97L19.5 21.75A18.75 18.75 0 0 1 2.25 4.5z"
      />
    </svg>
  );

  const MapPinIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21.75s8.25-6.75 8.25-12A8.25 8.25 0 0 0 12 1.5a8.25 8.25 0 0 0-8.25 8.25c0 5.25 8.25 12 8.25 12z"
      />
      <circle cx="12" cy="9.75" r="2.25" />
    </svg>
  );

  const FacebookIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5a3.5 3.5 0 0 1 3.8-3.9h2.7v3h-1.8a1.1 1.1 0 0 0-1.2 1.2V12H17l-.5 3h-2.7v7A10 10 0 0 0 22 12z" />
    </svg>
  );

  const InstagramIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10zm-5 3.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5zm0 7.5A3 3 0 1 1 15 12a3 3 0 0 1-3 3zm4.8-7.9a1 1 0 1 0 1 1 1 1 0 0 0-1-1z" />
    </svg>
  );

  const TwitterIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M22.46 6c-.77.35-1.6.59-2.46.7a4.15 4.15 0 0 0 1.82-2.28 8.32 8.32 0 0 1-2.64 1A4.12 4.12 0 0 0 11 8.12a11.7 11.7 0 0 1-8.5-4.3A4.13 4.13 0 0 0 3.9 9a4 4 0 0 1-1.86-.52v.05A4.14 4.14 0 0 0 4.1 12a4.08 4.08 0 0 1-1.85.07 4.12 4.12 0 0 0 3.84 2.86A8.27 8.27 0 0 1 2 17.54a11.63 11.63 0 0 0 6.29 1.84c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.36-.01-.54A8.3 8.3 0 0 0 22.46 6z" />
    </svg>
  );

  const LinkedinIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M19 3A2 2 0 0 1 21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zm-9.34 7.34H7.34v8h2.32v-8zM8.5 7.5a1.33 1.33 0 1 0 0 2.66 1.33 1.33 0 0 0 0-2.66zm7.5 2.84a2.88 2.88 0 0 0-2.6 1.34h-.03V10.34h-2.31v8h2.31v-4.2a1.37 1.37 0 0 1 2.74 0v4.2H18v-4.47a2.9 2.9 0 0 0-2-2.79z" />
    </svg>
  );

  // LINK SECTIONS
  const linkSections = [
    {
      title: "PRODUCTS",
      links: [
        { text: "Earphones", path: "/" },
        { text: "Headphones", path: "/" },
        { text: "Smartphones", path: "/" },
        { text: "Laptops", path: "/" },
      ],
    },
    {
      title: "WEBSITE?",
      links: [
        { text: "Home", path: "/" },
        { text: "Privacy Policy", path: "/" },
        { text: "Become Plus Member", path: "/pricing" },
        { text: "Create Your Store", path: "/create-store" },
      ],
    },
    {
      title: "CONTACT",
      links: [
        { text: "+1-212-456-7890", path: "/", icon: PhoneIcon },
        { text: "contact@dreamsaver.com", path: "/", icon: MailIcon },
        { text: "794 Francisco, 94102", path: "/", icon: MapPinIcon },
      ],
    },
  ];

  const socialIcons = [
    { icon: FacebookIcon, link: "https://www.facebook.com" },
    { icon: InstagramIcon, link: "https://www.instagram.com" },
    { icon: TwitterIcon, link: "https://twitter.com" },
    { icon: LinkedinIcon, link: "https://www.linkedin.com" },
  ];

  return (
    <footer className="mx-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-slate-500/30 text-slate-500">
          <div>
            <Link href="/" className="text-4xl font-semibold text-slate-700">
              <span className="text-green-600">Dream</span>Saver
              <span className="text-green-600 text-5xl leading-0">.</span>
            </Link>
            <p className="max-w-[410px] mt-6 text-sm">
              Welcome to DreamSaver, where your goals, becomes reality.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {socialIcons.map((item, i) => (
                <Link
                  href={item.link}
                  key={i}
                  className="flex items-center justify-center w-10 h-10 bg-slate-100 hover:scale-105 hover:border border-slate-300 transition rounded-full"
                >
                  <item.icon />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5 text-sm">
            {linkSections.map((section, index) => (
              <div key={index}>
                <h3 className="font-medium text-slate-700 md:mb-5 mb-3">
                  {section.title}
                </h3>
                <ul className="space-y-2.5">
                  {section.links.map((link, i) => (
                    <li key={i} className="flex items-center gap-2">
                      {link.icon && <link.icon />}
                      <Link
                        href={link.path}
                        className="hover:underline transition"
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <p className="py-4 text-sm text-slate-500">
          Copyright 2025 © DreamSaver. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
