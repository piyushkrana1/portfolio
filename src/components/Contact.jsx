// Contact.jsx
import React, { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";

export default function Contact() {
  const [status, setStatus] = useState({ state: "idle", message: "" });
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    botField: "", // honeypot
  });

  const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID; // e.g. "xyzabcd"
  const TO_EMAIL = "piyushkrana1@gmail.com"; // used for mailto fallback

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!/\S+@\S+\.\S+/.test(form.email)) return "Please enter a valid email.";
    if (!form.message.trim()) return "Please write a message.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.botField) return; // ignore bots
    const err = validate();
    if (err) {
      setStatus({ state: "error", message: err });
      return;
    }
    setStatus({ state: "loading", message: "Sending..." });

    // Option A: Formspree (free)
    if (FORMSPREE_ID) {
      try {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            subject: form.subject,
            message: form.message,
          }),
        });
        if (res.ok) {
          setStatus({ state: "success", message: "Message sent. I’ll get back to you soon!" });
          setForm({ name: "", email: "", subject: "", message: "", botField: "" });
        } else {
          const data = await res.json().catch(() => ({}));
          throw new Error(data?.error || "Failed to send. Please try again.");
        }
      } catch (error) {
        setStatus({ state: "error", message: error.message || "Something went wrong." });
      }
      return;
    }

    // Option B: Mailto fallback (free; opens user’s email app)
    const mailto = new URL(`mailto:${TO_EMAIL}`);
    const params = new URLSearchParams({
      subject: form.subject || `Message from ${form.name}`,
      body: `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
    });
    mailto.search = params.toString();
    window.location.href = mailto.toString();
    setStatus({ state: "idle", message: "" });
  };

  return (
    <section className="w-full min-h-dvh px-5 md:px-10 py-10 md:py-16 text-white">
      <div className="mx-auto w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Contact</h1>
          <p className="text-gray-300 mt-3 md:mt-4 text-base md:text-lg">I’d love to hear about your project. Drop a message or say hi!</p>
        </div>

        {/* Map + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-10">
          {/* Map */}
          <div className="lg:col-span-2">
            <div className="relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/60">
              <iframe title="My Location" className="w-full h-[320px] md:h-[420px] rounded-2xl" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d383.6790414072821!2d77.44316313795223!3d28.64482872377217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf143db692257%3A0x39edc635bdd67127!2sB%20397%2C%20New%20Panchwati%20colony.!5e0!3m2!1sen!2sin!4v1756291715899!5m2!1sen!2sin" loading="lazy" referrerPolicy="no-referrer-when-downgrade" style={{ border: 0 }} allowFullScreen />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/30 to-transparent h-12 pointer-events-none" />
            </div>
          </div>

          {/* Quick Info */}
          <div className="space-y-4">
            <InfoLine Icon={FaMapMarkerAlt} title="Location" value="Ghaziabad, India" />
            <InfoLine Icon={FaPhoneAlt} title="Phone" value="+91-7425901409" />
            <InfoLine Icon={FaEnvelope} title="Email" value="piyushkrana1@gmail.com" />
            <p className="text-xs text-gray-500">
              Tip: Configure <code className="text-gray-300">VITE_FORMSPREE_ID</code> for built-in email sending.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="rounded-2xl border border-gray-800 bg-gray-900/70 p-6 md:p-8 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Send a Message</h2>

          {/* Status */}
          {status.state !== "idle" && (
            <div className={`mb-4 rounded-lg px-4 py-3 text-sm ${status.state === "success" ? "bg-emerald-900/40 border border-emerald-700 text-emerald-200" : status.state === "error" ? "bg-rose-900/40 border border-rose-700 text-rose-200" : "bg-gray-800/70 border border-gray-700 text-gray-200"}`}>
              {status.state === "success" ? (
                <span className="inline-flex items-center gap-2">
                  <FaCheckCircle /> {status.message}
                </span>
              ) : (
                status.message
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Honeypot (hidden) */}
            <input type="text" name="botField" value={form.botField} onChange={onChange} className="hidden" tabIndex={-1} autoComplete="off" />

            <Field label="Your Name" name="name">
              <input type="text" name="name" value={form.name} onChange={onChange} placeholder="Jane Doe" className="w-full rounded-lg bg-gray-800/70 border border-gray-700 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" required />
            </Field>

            <Field label="Email Address" name="email">
              <input type="email" name="email" value={form.email} onChange={onChange} placeholder="jane@example.com" className="w-full rounded-lg bg-gray-800/70 border border-gray-700 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" required />
            </Field>

            <Field label="Subject" name="subject" full>
              <input type="text" name="subject" value={form.subject} onChange={onChange} placeholder="Let’s build something great" className="w-full rounded-lg bg-gray-800/70 border border-gray-700 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
            </Field>

            <Field label="Message" name="message" full>
              <textarea name="message" value={form.message} onChange={onChange} placeholder="Tell me a bit about your project or question…" rows={6} className="w-full rounded-lg bg-gray-800/70 border border-gray-700 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-y" required />
            </Field>

            <div className="md:col-span-2 flex items-center justify-between gap-4">
              <div className="text-xs text-gray-500">{FORMSPREE_ID ? <>Powered by Formspree (free tier)</> : <>Mailto fallback (opens your email app)</>}</div>
              <button type="submit" disabled={status.state === "loading"} className="inline-flex items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-60 px-5 py-3 font-medium transition">
                {status.state === "loading" ? "Sending…" : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ---------- Small UI helpers ---------- */

function InfoLine({ Icon, title, value }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-gray-800 bg-gray-900/60 p-4">
      <Icon className="text-xl text-blue-400 mt-0.5 shrink-0" aria-hidden />
      <div>
        <div className="text-sm text-gray-400">{title}</div>
        <div className="text-base font-medium">{value}</div>
      </div>
    </div>
  );
}

function Field({ label, name, full = false, children }) {
  return (
    <label className={`${full ? "md:col-span-2" : ""} block`}>
      <span className="block text-sm mb-2 text-gray-300">{label}</span>
      {children}
    </label>
  );
}
