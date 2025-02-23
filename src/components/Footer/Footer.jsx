import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const sections = [
    {
      title: "Services",
      links: [
        "Customer Experience Transformation",
        "Data and AI",
        "Product and Platform Engineering",
        "Global Design Studio",
        "Digital Transformation Consulting",
        "Infrastructure, Cloud, and Security",
      ],
    },
    {
      title: "Industries",
      links: [
        "Banking, Financial, and Insurance",
        "Life Sciences",
        "Telecom and Media",
        "Healthcare",
        "Hi-Tech",
        "Retail, Consumer Goods & Distribution",
      ],
    },
    {
      title: "Insights",
      links: [
        "Our Approach",
        "About Us",
        "Partnership",
        "Contact Us",
        "Careers",
        "Our Location",
      ],
    },
  ];

  return (
    <footer className="bg-gradient-to-r from-[#00ccff] via-[#0077b6] to-[#003366] text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          <div>
            {/* Footer Logo */}
            <div className="flex justify-center md:justify-start mb-4">
              <img src="/brillioLogo.png" alt="Logo" className="w-20 h-14" />
            </div>
            {/* Social Icons */}
            <div className="flex justify-center md:justify-start gap-6">
              {[FaFacebook, FaTwitter, FaLinkedin, FaInstagram].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-white text-2xl transition-colors duration-300 hover:text-[#A7C7C9] hover:font-bold"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
          {sections.map((section, index) => (
            <div key={index}>
              <h5 className="text-xl font-semibold mb-4">{section.title}</h5>
              <ul className="space-y-2">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href="#"
                      className="transition-colors duration-300 hover:text-[#A7C7C9] hover:font-bold"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center text-sm text-gray-200">
          © {new Date().getFullYear()} My Company. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
