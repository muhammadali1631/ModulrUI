import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const FixedIcon = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a
        href="https://github.com/muhammadali1631"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-black/40 rounded-full border p-1.5 text-white/40 hover:text-white transition-all duration-300 hover:scale-110"
      >
        <FaGithub size={22} />
      </a>

      <a
        href="https://linkedin.com/in/ali-web-dev"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-black/40 rounded-full border p-1.5 text-white/40 hover:text-[#0A66C2] transition-all duration-300 hover:scale-110 "
      >
        <FaLinkedin size={22} />
      </a>
    </div>
  );
};

export default FixedIcon;
