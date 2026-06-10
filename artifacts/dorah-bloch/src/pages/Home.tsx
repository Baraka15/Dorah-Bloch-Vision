import { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// Images
import drone from "@assets/file_00000000959071f8b960624ea7176b0d~2_1779185003675.png";
import badge from "@assets/Parents_of_Dorah_Bloch_International_College_20260403_135951_1779184910292.jpg";
import student from "@assets/images_(9)_1779184937771.jpeg";
import football1 from "@assets/IMG-20260320-WA0033_1779184975824.jpg";
import football2 from "@assets/IMG-20260320-WA0028_1779184975871.jpg";
import football3 from "@assets/IMG-20260320-WA0024_1779184975894.jpg";
import footballBoot from "@assets/IMG-20260222-WA0003_1779184975915.jpg";
import studentGroup from "@assets/Screenshot_20251003-201117_Photos_1779185102607.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// ── Scroll Progress Bar ──────────────────────────────────────────────────────
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-accent z-[9999]"
    />
  );
}

// ── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedCount({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(ease * target));
            if (progress < 1) requestAnimationFrame(tick);
            else setCount(target);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden flex items-center justify-center">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-foreground/70 z-10" />
        <img
          src={drone}
          alt="Dorah Bloch Campus Aerial"
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      <div className="relative z-10 container mx-auto px-6 text-center pt-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          <motion.div variants={fadeInUp} className="mb-6">
            <span className="inline-block py-1 px-4 border border-accent text-accent rounded-full text-sm font-semibold tracking-widest uppercase mb-4 bg-background/10 backdrop-blur-sm">
              Excellence Since Inception
            </span>
          </motion.div>

          <motion.h1 variants={fadeInUp} className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-bold leading-[1.1] mb-6 drop-shadow-lg">
            Empowering Future <br />
            <span className="text-accent italic font-medium">Leaders of Africa</span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10 font-light">
            A prestigious secondary school in Bweyale, Kiryandongo District, dedicated to academic discipline, sports excellence, and character formation.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#admissions" className="bg-accent text-accent-foreground px-8 py-4 rounded-sm font-bold text-lg hover:bg-white hover:text-foreground transition-colors">
              Begin Application
            </a>
            <a href="#about" className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-sm font-bold text-lg hover:bg-white/20 transition-colors">
              Discover Our Legacy
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Stats with animated counters ─────────────────────────────────────────────
function Stats() {
  const stats = [
    { label: "Students Enrolled", value: 500, suffix: "+" },
    { label: "UCE Pass Rate", value: 98, suffix: "%" },
    { label: "Subjects Offered", value: 20, suffix: "+" },
    { label: "Years of Excellence", value: 15, suffix: "+" },
  ];

  return (
    <section className="bg-primary text-primary-foreground py-16 relative z-20 shadow-xl">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/20">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="text-center px-4"
            >
              <div className="text-4xl md:text-5xl font-serif font-bold text-white mb-2">
                <AnimatedCount target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm md:text-base font-medium tracking-wider uppercase opacity-90">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── About ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-2xl">
              <img src={student} alt="Dorah Bloch Student" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-white rounded-full p-4 shadow-xl hidden md:block">
              <img src={badge} alt="School Badge" className="w-full h-full object-contain" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <h2 className="text-accent font-bold tracking-widest uppercase mb-3">Our Legacy</h2>
            <h3 className="font-serif text-4xl md:text-5xl text-foreground font-bold mb-6">Molding Character, Inspiring Greatness</h3>
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                Situated along the bustling Kampala-Gulu Highway in Bweyale Town Council, Dorah Bloch International College stands as a beacon of academic prestige and discipline in Kiryandongo District.
              </p>
              <p>
                We believe that education goes beyond the classroom. Our holistic approach ensures that every student develops strong moral character, leadership qualities, and the intellectual rigor needed to thrive in a competitive global landscape.
              </p>
              <div className="pl-6 border-l-4 border-accent italic text-foreground font-serif text-xl py-2">
                "Our mission is to nurture well-rounded individuals who will drive innovation and positive change in our communities."
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Academics ────────────────────────────────────────────────────────────────
function Academics() {
  const areas = [
    { icon: "🔬", title: "Sciences", desc: "State-of-the-art laboratories and rigorous curriculum preparing future medical and engineering professionals." },
    { icon: "📚", title: "Arts & Humanities", desc: "Fostering critical thinking, literature, and profound understanding of human society and history." },
    { icon: "💼", title: "Business Studies", desc: "Equipping students with entrepreneurial skills, economics, and practical commerce knowledge." },
    { icon: "🛠️", title: "Technical Skills", desc: "Hands-on vocational training complementing traditional academics for a well-rounded skillset." },
  ];

  return (
    <section id="academics" className="py-24 bg-foreground relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-accent font-bold tracking-widest uppercase mb-3">
            Academic Excellence
          </motion.h2>
          <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="font-serif text-4xl md:text-5xl text-white font-bold mb-6">
            A Curriculum Designed for Distinction
          </motion.h3>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-white/70 text-lg">
            Consistently ranking among the top schools in the UCE examinations, our rigorous academic programs are tailored to unlock every student's potential.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.map((area, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-white/5 border border-white/10 backdrop-blur-sm p-8 rounded-lg hover:bg-white/10 transition-colors group cursor-default"
            >
              <div className="text-4xl mb-6">{area.icon}</div>
              <h4 className="text-xl font-bold text-white mb-3">{area.title}</h4>
              <p className="text-white/60 leading-relaxed">{area.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Campus Life ───────────────────────────────────────────────────────────────
function CampusLife() {
  return (
    <section id="campus-life" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center mb-16">
          <div className="lg:w-1/3">
            <h2 className="text-accent font-bold tracking-widest uppercase mb-3">Campus Life</h2>
            <h3 className="font-serif text-4xl md:text-5xl text-foreground font-bold mb-6">Beyond the Classroom</h3>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              At Dorah Bloch, we believe champions are forged both in academia and on the field. Our vibrant boarding community and elite sports programs instill teamwork, resilience, and unyielding spirit.
            </p>
            <a href="#gallery" className="text-primary font-bold hover:text-primary/80 flex items-center gap-2">
              View Full Gallery <span className="text-xl">→</span>
            </a>
          </div>

          <div className="lg:w-2/3 grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="col-span-2 md:col-span-1 aspect-square rounded-lg overflow-hidden relative group"
            >
              <img src={football1} alt="Football Match Action" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="col-span-1 aspect-square rounded-lg overflow-hidden relative group"
            >
              <img src={football2} alt="Football Match" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="col-span-1 aspect-square rounded-lg overflow-hidden relative group"
            >
              <img src={football3} alt="Football Field" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Admissions ────────────────────────────────────────────────────────────────
type AdmissionForm = {
  studentName: string;
  dateOfBirth: string;
  gender: string;
  previousSchool: string;
  entryLevel: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  residence: string;
  applyingForBursary: string;
  message: string;
};

const emptyForm: AdmissionForm = {
  studentName: "",
  dateOfBirth: "",
  gender: "",
  previousSchool: "",
  entryLevel: "Senior 1 (S.1)",
  parentName: "",
  parentPhone: "",
  parentEmail: "",
  residence: "",
  applyingForBursary: "no",
  message: "",
};

function Admissions() {
  const [form, setForm] = useState<AdmissionForm>(emptyForm);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      let refId = `DBIC-ADM-${Date.now().toString().slice(-4)}`;

      try {
        const res = await fetch("/api/admissions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (res.ok && data.id) {
          refId = `DBIC-ADM-${String(data.id).padStart(4, "0")}`;
        }
      } catch {
        // API unavailable — continue with mailto only
      }

      const bursaryText = form.applyingForBursary === "yes"
        ? "YES — Requesting financial support"
        : "No — Paying full fees";

      const subject = encodeURIComponent(
        `Admission Application — ${form.studentName} (${form.entryLevel}) [${refId}]`
      );

      const body = encodeURIComponent(
        `Dear Dorah Bloch International College Admissions Team,\n\n` +
        `I would like to register my child for admission. Please find the details below:\n\n` +
        `--- STUDENT DETAILS ---\n` +
        `Full Name:       ${form.studentName}\n` +
        `Date of Birth:   ${form.dateOfBirth}\n` +
        `Gender:          ${form.gender}\n` +
        `Previous School: ${form.previousSchool}\n` +
        `Entry Level:     ${form.entryLevel}\n` +
        `Residence:       ${form.residence}\n` +
        `Bursary:         ${bursaryText}\n\n` +
        `--- PARENT / GUARDIAN ---\n` +
        `Name:  ${form.parentName}\n` +
        `Phone: ${form.parentPhone}\n` +
        `Email: ${form.parentEmail || "Not provided"}\n\n` +
        (form.message ? `--- ADDITIONAL MESSAGE ---\n${form.message}\n\n` : "") +
        `Reference: ${refId}\n\n` +
        `Thank you.\n\n` +
        `${form.parentName}`
      );

      const mailtoUrl = `mailto:andiadebayor5@gmail.com?subject=${subject}&body=${body}`;
      setStatus("success");
      setForm(emptyForm);
      setTimeout(() => { window.location.href = mailtoUrl; }, 800);
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  const inputCls = "w-full border border-border rounded-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background text-foreground placeholder:text-muted-foreground text-sm";
  const labelCls = "block text-xs font-semibold text-foreground/70 uppercase tracking-wider mb-1.5";

  return (
    <section id="admissions" className="py-24 bg-muted">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-accent font-bold tracking-widest uppercase mb-3">Join Us</h2>
          <h3 className="font-serif text-4xl md:text-5xl text-foreground font-bold mb-4">Apply for Admission</h3>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Take the first step toward a future of excellence. Complete the form below and our admissions team will contact you within 48 hours.
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
          <div className="lg:w-2/5 bg-primary p-10 text-white flex flex-col justify-between relative">
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }}
            />
            <div className="relative z-10">
              <h4 className="text-accent font-bold tracking-widest uppercase mb-2 text-sm">Admissions</h4>
              <h3 className="font-serif text-3xl font-bold mb-6 leading-tight">Welcome to Dorah Bloch International College</h3>
              <p className="text-white/80 mb-8 leading-relaxed text-sm">
                We offer O-Level and A-Level programmes in a boarding environment that develops academic excellence, discipline, and lifelong character.
              </p>
              <div className="space-y-5 mb-8">
                {[
                  { num: "1", label: "O-Level Entry", desc: "Senior 1 – Senior 4 (S.1 – S.4)" },
                  { num: "2", label: "A-Level Entry", desc: "Senior 5 – Senior 6 (S.5 – S.6)" },
                ].map((item) => (
                  <div key={item.num} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-accent text-foreground flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">{item.num}</div>
                    <div>
                      <p className="font-bold text-white">{item.label}</p>
                      <p className="text-white/60 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/20 pt-6 space-y-3 text-sm">
                <p className="text-white/60">Need help with your application?</p>
                <p className="font-bold text-accent">+256 772 427 251</p>
                <p className="text-white/60 text-xs">Bweyale Town Council, Kiryandongo District, Uganda</p>
              </div>
            </div>
          </div>

          <div className="lg:w-3/5 p-10">
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-12"
              >
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="font-serif text-3xl font-bold text-foreground mb-3">Almost Done!</h4>
                <p className="text-muted-foreground text-lg mb-2 max-w-sm font-semibold">Your email app is opening now.</p>
                <p className="text-muted-foreground text-sm mb-2 max-w-sm">
                  Your application details have been filled in automatically. Simply <strong>press Send</strong> in your email app to deliver it to the admissions office.
                </p>
                <p className="text-muted-foreground text-xs mb-8 max-w-sm text-primary font-medium">
                  If your email app did not open, tap the button below.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  data-testid="button-apply-again"
                  className="bg-primary text-primary-foreground px-8 py-3 rounded-sm font-bold hover:bg-primary/90 transition-colors"
                >
                  Submit Another Application
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" data-testid="form-admissions">
                <h4 className="text-xl font-bold text-foreground mb-1">Student & Parent Details</h4>
                <p className="text-muted-foreground text-sm mb-6">All fields marked with * are required.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Student Full Name *</label>
                    <input data-testid="input-student-name" name="studentName" required value={form.studentName} onChange={handleChange} type="text" className={inputCls} placeholder="e.g. Akot Grace" />
                  </div>
                  <div>
                    <label className={labelCls}>Date of Birth *</label>
                    <input data-testid="input-date-of-birth" name="dateOfBirth" required value={form.dateOfBirth} onChange={handleChange} type="date" className={inputCls} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Gender *</label>
                    <select data-testid="select-gender" name="gender" required value={form.gender} onChange={handleChange} className={inputCls}>
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Entry Level *</label>
                    <select data-testid="select-entry-level" name="entryLevel" required value={form.entryLevel} onChange={handleChange} className={inputCls}>
                      <option value="Senior 1 (S.1)">Senior 1 (S.1) — O-Level</option>
                      <option value="Senior 2 (S.2)">Senior 2 (S.2) — O-Level</option>
                      <option value="Senior 3 (S.3)">Senior 3 (S.3) — O-Level</option>
                      <option value="Senior 5 (S.5)">Senior 5 (S.5) — A-Level</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Previous School *</label>
                  <input data-testid="input-previous-school" name="previousSchool" required value={form.previousSchool} onChange={handleChange} type="text" className={inputCls} placeholder="Name of last school attended" />
                </div>

                <div>
                  <label className={labelCls}>District / Town of Residence *</label>
                  <input data-testid="input-residence" name="residence" required value={form.residence} onChange={handleChange} type="text" className={inputCls} placeholder="e.g. Gulu City, Masindi District" />
                </div>

                <div className="pt-2 border-t border-border">
                  <h5 className="text-sm font-bold text-foreground/60 uppercase tracking-wider mb-4">Parent / Guardian Information</h5>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Parent / Guardian Name *</label>
                    <input data-testid="input-parent-name" name="parentName" required value={form.parentName} onChange={handleChange} type="text" className={inputCls} placeholder="Full name" />
                  </div>
                  <div>
                    <label className={labelCls}>Phone Number *</label>
                    <input data-testid="input-parent-phone" name="parentPhone" required value={form.parentPhone} onChange={handleChange} type="tel" className={inputCls} placeholder="+256 7XX XXX XXX" />
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Email Address (optional)</label>
                  <input data-testid="input-parent-email" name="parentEmail" value={form.parentEmail} onChange={handleChange} type="email" className={inputCls} placeholder="parent@example.com" />
                </div>

                <div>
                  <label className={labelCls}>Are you applying for a Bursary / Scholarship? *</label>
                  <select data-testid="select-bursary" name="applyingForBursary" required value={form.applyingForBursary} onChange={handleChange} className={inputCls}>
                    <option value="no">No — paying full fees</option>
                    <option value="yes">Yes — I would like to apply for financial support</option>
                  </select>
                </div>

                <div>
                  <label className={labelCls}>Additional Message (optional)</label>
                  <textarea data-testid="input-message" name="message" value={form.message} onChange={handleChange} rows={3} className={inputCls + " resize-none"} placeholder="Any special circumstances, questions, or information for the admissions team..." />
                </div>

                {status === "error" && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm text-sm">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  data-testid="button-submit-admission"
                  className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-sm hover:bg-primary/90 transition-colors shadow-md disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === "submitting" ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Submitting Application...
                    </>
                  ) : (
                    "Submit Application →"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Scholarships ──────────────────────────────────────────────────────────────
function Scholarships() {
  return (
    <section id="scholarships" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-accent font-bold tracking-widest uppercase mb-3">
            Bursary & Scholarships
          </motion.h2>
          <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="font-serif text-4xl md:text-5xl text-foreground font-bold mb-6">
            Rewarding Merit & Potential
          </motion.h3>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-muted-foreground text-lg">
            We are committed to ensuring that financial constraints do not stand in the way of brilliance.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-muted p-8 rounded-lg border border-border">
            <h4 className="text-2xl font-bold text-foreground mb-4">Academic Excellence Awards</h4>
            <p className="text-muted-foreground mb-6">Full and partial scholarships awarded to the top performing students in PLE and UCE examinations.</p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2"><span className="text-accent font-bold">✓</span> Top 10 PLE performers in the district</li>
              <li className="flex items-center gap-2"><span className="text-accent font-bold">✓</span> Division 1 aggregates 8–12</li>
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-primary text-primary-foreground p-8 rounded-lg shadow-lg relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
            <h4 className="text-2xl font-bold mb-4">Sports & Talent Bursaries</h4>
            <p className="text-white/80 mb-6">Exceptional athletes and uniquely talented individuals can benefit from our specialized bursary program.</p>
            <a href="#contact" className="inline-block bg-accent text-accent-foreground px-6 py-2 rounded-sm font-bold text-sm hover:bg-white transition-colors">
              Inquire About Scholarships
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Gallery with Lightbox ─────────────────────────────────────────────────────
function Gallery() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const images = [
    { src: drone, alt: "Drone Aerial View", className: "col-span-2 row-span-2" },
    { src: studentGroup, alt: "Students in Uniform Group", className: "col-span-1 row-span-1" },
    { src: football1, alt: "Football Action", className: "col-span-1 row-span-2" },
    { src: footballBoot, alt: "Football Boot", className: "col-span-1 row-span-1" },
    { src: student, alt: "Student Portrait", className: "col-span-1 row-span-2" },
    { src: football2, alt: "Football Players", className: "col-span-1 row-span-1" },
    { src: football3, alt: "Football Match", className: "col-span-2 row-span-1" },
  ];

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightbox(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="gallery" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-accent font-bold tracking-widest uppercase mb-3">Our Campus</h2>
          <h3 className="font-serif text-4xl md:text-5xl text-foreground font-bold">Life at Dorah Bloch</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`relative overflow-hidden rounded-lg group cursor-zoom-in ${img.className}`}
              onClick={() => setLightbox(img)}
            >
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium px-4 py-2 border border-white/50 backdrop-blur-sm rounded-full text-sm">
                  🔍 View
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9998] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative max-w-5xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={lightbox.src} alt={lightbox.alt} className="w-full h-full object-contain rounded-lg max-h-[85vh]" />
            <p className="text-white/70 text-center mt-3 text-sm">{lightbox.alt}</p>
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-4 -right-4 w-10 h-10 bg-white text-foreground rounded-full flex items-center justify-center font-bold text-lg hover:bg-accent transition-colors shadow-lg"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

// ── Contact with working mailto ───────────────────────────────────────────────
function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleContact(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`General Enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:andiadebayor5@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
    setName(""); setEmail(""); setMessage("");
  }

  return (
    <section id="contact" className="py-24 bg-muted">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-accent font-bold tracking-widest uppercase mb-3">Get in Touch</h2>
            <h3 className="font-serif text-4xl md:text-5xl text-foreground font-bold mb-6">We'd Love to Hear From You</h3>
            <p className="text-muted-foreground text-lg mb-8">
              Whether you have questions about admissions, fees, or simply want to schedule a campus tour, our team is ready to assist you.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                  <span className="text-xl">📍</span>
                </div>
                <div>
                  <h5 className="font-bold text-foreground">Our Location</h5>
                  <p className="text-muted-foreground">Bweyale Town Council, Kiryandongo District<br />Along Kampala-Gulu Highway, Uganda</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                  <span className="text-xl">📞</span>
                </div>
                <div>
                  <h5 className="font-bold text-foreground">Phone / WhatsApp</h5>
                  <a href="https://wa.me/256772427251" target="_blank" rel="noreferrer" className="text-primary font-medium hover:underline">
                    +256 772 427 251
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                  <span className="text-xl">✉️</span>
                </div>
                <div>
                  <h5 className="font-bold text-foreground">Email</h5>
                  <a href="mailto:andiadebayor5@gmail.com" className="text-primary font-medium hover:underline">
                    andiadebayor5@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full h-64 bg-gray-300 rounded-lg overflow-hidden border border-border">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src="https://www.openstreetmap.org/export/embed.html?bbox=32.023%2C1.868%2C32.053%2C1.888&amp;layer=mapnik"
              />
            </div>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl">
            {sent ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="font-serif text-2xl font-bold mb-2">Email Opening…</h4>
                <p className="text-muted-foreground mb-6">Your message has been pre-filled. Just press Send.</p>
                <button onClick={() => setSent(false)} className="text-primary font-bold hover:underline">Send another message</button>
              </motion.div>
            ) : (
              <form className="space-y-6" onSubmit={handleContact}>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Your Name *</label>
                  <input required value={name} onChange={e => setName(e.target.value)} type="text" className="w-full border border-border rounded-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-muted/50" placeholder="Jane Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Email Address *</label>
                  <input required value={email} onChange={e => setEmail(e.target.value)} type="email" className="w-full border border-border rounded-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-muted/50" placeholder="jane@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Message *</label>
                  <textarea required value={message} onChange={e => setMessage(e.target.value)} rows={5} className="w-full border border-border rounded-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-muted/50" placeholder="How can we help you?" />
                </div>
                <button type="submit" className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-sm hover:bg-primary/90 transition-colors shadow-md">
                  Send Message →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-foreground text-white pt-20 pb-10 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-white rounded-full p-1">
                <img src={badge} alt="Badge" className="w-full h-full object-contain rounded-full" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-xl leading-tight">DORAH BLOCH</h4>
                <p className="text-xs tracking-widest text-accent">INTERNATIONAL COLLEGE</p>
              </div>
            </div>
            <p className="text-white/60 max-w-sm">
              Molding future leaders through academic rigor, discipline, and sports excellence in Kiryandongo District, Uganda.
            </p>
          </div>

          <div>
            <h5 className="font-bold mb-6 text-accent uppercase tracking-wider text-sm">Quick Links</h5>
            <ul className="space-y-3 text-white/70">
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#academics" className="hover:text-white transition-colors">Academics</a></li>
              <li><a href="#campus-life" className="hover:text-white transition-colors">Campus Life</a></li>
              <li><a href="#admissions" className="hover:text-white transition-colors">Admissions</a></li>
              <li><a href="#scholarships" className="hover:text-white transition-colors">Scholarships</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-6 text-accent uppercase tracking-wider text-sm">Contact Us</h5>
            <ul className="space-y-3 text-white/70 text-sm">
              <li className="flex items-center gap-2">📞 <a href="tel:+256772427251" className="hover:text-white transition-colors">+256 772 427 251</a></li>
              <li className="flex items-center gap-2">💬 <a href="https://wa.me/256772427251" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">WhatsApp Us</a></li>
              <li className="flex items-center gap-2">✉️ <a href="mailto:andiadebayor5@gmail.com" className="hover:text-white transition-colors">andiadebayor5@gmail.com</a></li>
              <li className="flex items-start gap-2">📍 <span>Bweyale, Kiryandongo District, Uganda</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-white/40 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Dorah Bloch International College. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed for Excellence · Bweyale, Uganda</p>
        </div>
      </div>
    </footer>
  );
}

// ── WhatsApp Float Button ─────────────────────────────────────────────────────
function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/256772427251?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20Dorah%20Bloch%20International%20College."
      target="_blank"
      rel="noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-[9990] w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl"
      title="Chat with us on WhatsApp"
    >
      <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </motion.a>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <ScrollProgressBar />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Academics />
        <CampusLife />

        <section className="h-[60vh] relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-primary/90 z-10 mix-blend-multiply" />
          <img src={studentGroup} alt="Students" className="absolute inset-0 w-full h-full object-cover" />
          <div className="relative z-20 text-center px-6">
            <h2 className="font-serif text-4xl md:text-6xl text-white font-bold mb-6">A Community of Scholars</h2>
            <p className="text-white/90 text-xl max-w-2xl mx-auto font-light">
              Join a brotherhood and sisterhood bound by ambition, character, and mutual support.
            </p>
          </div>
        </section>

        <Admissions />
        <Scholarships />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
