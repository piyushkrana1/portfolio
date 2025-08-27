import React from "react";
import { FaMobileAlt, FaGlobe, FaPaintBrush, FaServer, FaReact, FaNodeJs, FaFigma, FaGitAlt, FaDocker, FaAws, FaPython } from "react-icons/fa";
import { SiFlutter, SiDart, SiFirebase, SiMongodb, SiPostgresql, SiMysql, SiRedis, SiKubernetes, SiNginx, SiTensorflow, SiPytorch, SiOpencv, SiOpenai, SiTypescript, SiNextdotjs, SiTailwindcss, SiPrisma } from "react-icons/si";
import profileImg from "../assets/profile.jpeg";

export default function Hero() {
  return (
    <section
      className="
        w-full min-h-dvh
        flex flex-col items-center
        px-5 md:px-10 py-10 md:py-16
      "
      aria-label="Portfolio hero"
    >
      {/* Top: Photo + Intro */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center gap-10 md:gap-14">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src={profileImg}
            alt="Piyush"
            className="
              w-48 h-48 md:w-64 md:h-64 rounded-full object-cover
              border-4 border-gray-700 shadow-2xl
            "
          />
        </div>

        {/* Intro */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Hi, I’m <span className="text-[hsl(var(--accent))]">Piyush Rana</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200">Flutter-focused full-stack developer building cross-platform apps, elegant UIs, and reliable backends. I integrate APIs, optimize performance, and ship polished, responsive experiences.</p>
          <p className="mt-3 text-lg md:text-xl text-gray-200">Let’s collaborate and turn ideas into products that delight users 🚀</p>
        </div>
      </div>

      {/* What I Do */}
      <div className="w-full max-w-7xl mt-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center">What I Do</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <Card Icon={FaMobileAlt} iconClass="text-[hsl(var(--accent))]" title="Mobile Apps" desc="Professional development of applications for Android and iOS." />
          <Card Icon={FaGlobe} iconClass="text-[hsl(var(--accent))]" title="Web Development" desc="High-quality development of sites at the professional level." />
          <Card Icon={FaPaintBrush} iconClass="text-[hsl(var(--accent))]" title="UI/UX Design" desc="Modern, high-quality design with a strong UX focus." />
          <Card Icon={FaServer} iconClass="text-[hsl(var(--accent))]" title="Backend Development" desc="High-performance backends built for scale and seamless UX." />
        </div>
      </div>

      {/* Skills & Tech Stack (Subsections) */}
      <div className="w-full max-w-7xl mt-16 md:mt-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Skills & Tech Stack</h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mobile & Cross-Platform */}
          <SkillGroup title="Mobile & Cross-Platform">
            <Tech icon={<SiFlutter className="text-2xl" />} label="Flutter" />
            <Tech icon={<SiDart className="text-2xl" />} label="Dart" />
            <Tech icon={<SiFirebase className="text-2xl" />} label="Firebase" />
          </SkillGroup>

          {/* Web Frontend */}
          <SkillGroup title="Web Frontend">
            <Tech icon={<FaReact className="text-2xl" />} label="React" />
            <Tech icon={<SiNextdotjs className="text-2xl" />} label="Next.js" />
            <Tech icon={<SiTypescript className="text-2xl" />} label="TypeScript" />
            <Tech icon={<SiTailwindcss className="text-2xl" />} label="TailwindCSS" />
          </SkillGroup>

          {/* Backend & Databases */}
          <SkillGroup title="Backend & Databases">
            <Tech icon={<FaNodeJs className="text-2xl" />} label="Node.js" />
            <Tech icon={<SiPrisma className="text-2xl" />} label="Prisma/ORM" />
            <Tech icon={<SiMongodb className="text-2xl" />} label="MongoDB" />
            <Tech icon={<SiPostgresql className="text-2xl" />} label="PostgreSQL" />
            <Tech icon={<SiMysql className="text-2xl" />} label="MySQL" />
            <Tech icon={<SiRedis className="text-2xl" />} label="Redis" />
          </SkillGroup>

          {/* Cloud & DevOps */}
          <SkillGroup title="Cloud & DevOps">
            <Tech icon={<FaDocker className="text-2xl" />} label="Docker" />
            <Tech icon={<SiKubernetes className="text-2xl" />} label="Kubernetes" />
            <Tech icon={<FaAws className="text-2xl" />} label="AWS" />
            <Tech icon={<SiNginx className="text-2xl" />} label="Nginx" />
            <Tech icon={<FaGitAlt className="text-2xl" />} label="Git & CI/CD" />
          </SkillGroup>

          {/* AI / ML */}
          <SkillGroup title="AI / ML">
            <Tech icon={<FaPython className="text-2xl" />} label="Python" />
            <Tech icon={<SiTensorflow className="text-2xl" />} label="TensorFlow" />
            <Tech icon={<SiPytorch className="text-2xl" />} label="PyTorch" />
            <Tech icon={<SiOpencv className="text-2xl" />} label="OpenCV" />
            <Tech icon={<SiOpenai className="text-2xl" />} label="LLM / OpenAI" />
          </SkillGroup>

          {/* Design & Tools */}
          <SkillGroup title="Design & Tools">
            <Tech icon={<FaFigma className="text-2xl" />} label="Figma" />
            <Tech icon={<FaPaintBrush className="text-2xl" />} label="Design Systems" />
            <Tech icon={<FaGlobe className="text-2xl" />} label="SEO & Web Vitals" />
            <Tech icon={<FaServer className="text-2xl" />} label="API Design" />
          </SkillGroup>
        </div>
      </div>
    </section>
  );
}

/* ---------- Small UI helpers (accent-aware) ---------- */

function Card({ Icon, iconClass, title, desc }) {
  return (
    <div
      className="
        group p-6 rounded-2xl bg-gray-900/80 backdrop-blur
        shadow-lg border border-gray-800
        hover:border-[hsl(var(--accent))] hover:shadow-xl
        transition-transform duration-200 hover:-translate-y-1
        text-center
      "
    >
      <Icon className={`text-5xl mx-auto mb-4 ${iconClass}`} />
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-400 text-sm mt-2">{desc}</p>

      {/* subtle accent underline on hover */}
      <div className="mx-auto mt-4 h-px w-12 bg-gray-700 group-hover:bg-[hsl(var(--accent))] transition-colors" />
    </div>
  );
}

function SkillGroup({ title, children }) {
  return (
    <div
      className="
        p-6 rounded-2xl bg-gray-900/60
        border border-gray-800
        hover:border-[hsl(var(--accent))]/60 transition-colors
      "
    >
      <h3 className="text-lg font-semibold tracking-wide text-gray-100">{title}</h3>
      <div className="mt-4 flex flex-wrap gap-3">{children}</div>
    </div>
  );
}

function Tech({ icon, label }) {
  return (
    <div
      className="
        inline-flex items-center gap-2
        px-4 py-2 rounded-full
        bg-gray-800/80 border border-gray-700
        shadow-sm
        hover:border-[hsl(var(--accent))] hover:shadow-[0_0_0_3px_rgba(0,0,0,0.2)]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))]
        transition-colors
      "
      title={label}
      tabIndex={0}
    >
      {/* Make icon follow accent on hover/focus */}
      <span className="text-gray-300 group-hover:text-[hsl(var(--accent))]">{icon}</span>
      <span className="text-sm">{label}</span>
    </div>
  );
}
