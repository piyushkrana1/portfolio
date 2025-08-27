import React from "react";
import { FaGraduationCap, FaProjectDiagram } from "react-icons/fa";
import resumePDF from "../assets/piyush_rana_resume.pdf";

export default function Resume() {
  return (
    <section className="w-full min-h-dvh px-5 md:px-10 py-10 md:py-16 text-white">
      <div className="mx-auto w-full max-w-6xl">
        {/* Education */}
        <Timeline title="Education" Icon={FaGraduationCap}>
          <TimelineItem title="M.Tech in CSIS" org="International Institute of Information Technology, Hyderabad" period="Aug 2022 — Present" meta="CGPA: 7.76" />
          <TimelineItem title="B.Tech in Information Technology" org="Kamla Nehru Institute of Technology, Sultanpur" period="July 2017 — May 2021" meta="CGPA: 8.31" />
          <TimelineItem title="Intermediate (Science)" org="Jawahar Navodaya Vidyalaya, Bijnor" period="July 2015 — May 2016" meta="Percent: 91.60%" />
        </Timeline>

        {/* Projects */}
        <Timeline title="Projects" Icon={FaProjectDiagram} className="mt-16">
          <TimelineItem title="Full-Stack E-commerce Website" org="React, Redux Toolkit, TailwindCSS, Node.js, Express, Passport.js, JWT, MongoDB, Stripe" period="May 2023 — Aug 2023">
            <SubPoints items={["Built a responsive e-commerce platform with secure auth and payment flow.", "Frontend in React + Tailwind; state with Redux Toolkit. Backend in Express + Node.js with Passport.js & JWT.", "Integrated Stripe for payments; added filters, sorting, profile management, and an admin inventory panel (CRUD)."]} />
          </TimelineItem>

          <TimelineItem title="P2P Group-Based File Sharing" org="C++, Socket Programming, Multithreading, SHA-1" period="Nov 2022">
            <SubPoints items={["Designed P2P system for group-scoped sharing, downloads, and file management.", "Used sockets for transport and SHA-1 to verify file integrity.", "Leveraged multithreading for parallel multi-peer downloads with auth & group management."]} />
          </TimelineItem>
        </Timeline>
      </div>
      <div className="text-center mt-20">
        <a
          href={resumePDF}
          download
          className="
      inline-block
      px-6 py-2.5
      rounded-lg
      font-semibold
      text-[hsl(var(--accent))]
      border-2 border-[hsl(var(--accent))]
      bg-transparent
      animate-bounce
      transition
      hover:bg-[hsl(var(--accent))] hover:text-white
    "
        >
          Download Resume
        </a>
      </div>
    </section>
  );
}

/* ---------- Components ---------- */

function Timeline({ title, Icon, className = "", children }) {
  return (
    <section className={className}>
      <div className="flex items-center gap-3 mb-6">
        <Icon className="text-2xl text-[hsl(var(--accent))] shrink-0" aria-hidden />
        <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
      </div>

      <div className="relative pl-8">
        {/* vertical dashed line spans the entire container */}
        <div className="absolute left-4 top-0 bottom-0 h-full border-l-2 border-dashed border-[hsl(var(--accent))]" />
        <div className="space-y-8 relative z-10">{children}</div>
      </div>
    </section>
  );
}

function TimelineItem({ title, org, period, meta, children }) {
  return (
    <article className="relative">
      {/* Dot exactly on the line */}
      <span
        className="
    absolute
    left-4
    top-6
    w-4 h-4 rounded-full
    bg-[hsl(var(--accent))] ring-4 ring-[hsl(var(--accent))]
    -translate-x-10
  "
      />
      {/* Content box offset to the right of the line */}
      <div className="ml-8 bg-gray-900/70 border border-gray-800 rounded-xl shadow-lg px-5 py-4">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
          <div>
            <h3 className="text-lg md:text-xl font-semibold">{title}</h3>
            {org && <p className="text-gray-300 mt-1">{org}</p>}
          </div>
          {period && <span className="text-sm font-medium shrink-0 text-[hsl(var(--accent))]">{period}</span>}
        </div>
        {(meta || children) && (
          <div className="mt-3">
            {meta && <p className="text-sm text-[hsl(var(--accent))]">{meta}</p>}
            {children}
          </div>
        )}
      </div>
    </article>
  );
}

function SubPoints({ items = [] }) {
  return (
    <ul className="mt-2 space-y-2">
      {items.map((t, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-2 w-2 h-2 rounded-full bg-[hsl(var(--accent))] shrink-0" />
          <p className="text-gray-300 text-sm leading-relaxed">{t}</p>
        </li>
      ))}
    </ul>
  );
}
