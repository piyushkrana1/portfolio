import React from "react";
import Navbar from "./Navbar";

export default function Container({ activeSection, setActiveSection, children }) {
  const titleMap = {
    about: "About Me",
    resume: "Resume",
    portfolio: "Portfolio",
    contact: "Contact",
  };

  return (
    <div
      className="bg-black min-h-dvh w-full px-3 md:px-6 py-3 md:py-6"
      style={{
        backgroundColor: "black",
      }}
    >
      <div
        className="
          relative
          mx-auto w-full max-w-6xl
          rounded-4xl border border-gray-800
          bg-gray-900 shadow-lg/40
          flex flex-col
          min-h-[min(92dvh,1100px)]
          overflow-hidden
        "
      >
        {/* Mobile top navbar */}
        <div className="md:hidden sticky top-0 z-20 bg-gray-900/95 backdrop-blur border-b border-gray-800">
          <div className="flex items-center justify-between px-3 py-2">
            <Navbar activeSection={activeSection} setActiveSection={setActiveSection} variant="mobile" />
          </div>
        </div>

        {/* Desktop top bar */}
        <div className="hidden md:flex absolute top-0 left-0 right-0 items-center justify-between z-10">
          <h1 className="ml-8 px-4 py-3 text-white/90 text-2xl lg:text-4xl font-bold tracking-tight">{titleMap[activeSection] || ""}</h1>
          <div className="mr-6 mt-2">
            <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
          </div>
        </div>

        {/* Content */}
        <main className="flex-1 overflow-auto px-4 md:px-8 pt-4 md:pt-20 pb-6">{children}</main>
      </div>
    </div>
  );
}
