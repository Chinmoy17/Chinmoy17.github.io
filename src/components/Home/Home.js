import React from "react";
import { Link } from "react-router-dom";
import resumeData from "../../data/resume.json";
import avatarImg from "../../Assets/avatar.png";
import {
  MdOutlinePsychology,
  MdOutlineMedicalServices,
  MdOutlineSecurity,
  MdOutlineSchool,
} from "react-icons/md";

function Home() {
  const experience = resumeData.experience.slice(0, 3);

  const formatDate = (dateStr) => {
    if (!dateStr) return "Present";
    const d = new Date(dateStr);
    const year = d.getFullYear();
    const month = d.toLocaleString("default", { month: "short" });
    return `${month} ${year}`;
  };

  return (
    <main className="max-w-container mx-auto px-8 pt-24 pb-xl">
      {/* ===== HERO SECTION ===== */}
      <section className="mb-xl flex flex-col md:flex-row items-center gap-16">
        {/* Photo */}
        <div className="w-full md:w-1/3 shrink-0 max-w-[300px] relative">
          <div className="border border-surface-variant p-2 bg-surface-container-low">
            <img
              src={avatarImg}
              alt="Chinmoy Mitra"
              className="w-full h-auto object-cover aspect-[3/4]"
            />
          </div>
        </div>

        {/* Content */}
        <div className="w-full md:w-2/3">
          <p className="font-inter text-label-caps text-on-surface-variant uppercase mb-4 tracking-[0.1em]">
            AI/ML Application Developer & Researcher
          </p>
          <h1 className="font-newsreader text-h1 text-ink mb-6">
            Chinmoy Mitra
          </h1>
          <div className="h-[1px] w-16 bg-ink mb-6"></div>
          <p className="font-inter text-body-lg text-on-surface-variant max-w-2xl">
            Specializing in the architectural design of Large Language Models
            (LLMs) and advanced Medical Deep Learning systems. Bridging the gap
            between cutting-edge academic research and robust, scalable
            production environments.
          </p>
          <div className="mt-8 flex gap-4">
            <Link
              to="/project"
              className="bg-ink text-on-ink px-8 py-3 font-inter text-label-caps uppercase tracking-[0.1em] hover:bg-surface hover:text-ink border border-ink transition-colors duration-200 no-underline"
            >
              View Projects
            </Link>
            <Link
              to="/resume"
              className="bg-transparent text-ink px-8 py-3 font-inter text-label-caps uppercase tracking-[0.1em] border border-ink hover:bg-ink hover:text-on-ink transition-colors duration-200 no-underline"
            >
              Read CV
            </Link>
          </div>
        </div>
      </section>

      {/* ===== ABOUT & FOCUS DIVIDER ===== */}
      <div className="relative w-full h-[1px] bg-surface-variant mb-xl">
        <span className="absolute -top-3 left-0 bg-surface pr-4 font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">
          About & Focus
        </span>
      </div>

      {/* ===== BENTO GRID: RESEARCH INTERESTS ===== */}
      <section className="mb-xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Generative AI & LLMs — spans 2 cols */}
        <div className="col-span-1 md:col-span-2 border border-surface-variant bg-surface-container-low p-md">
          <div className="flex items-center gap-3 mb-4">
            <MdOutlinePsychology className="text-ink text-2xl" />
            <h3 className="font-newsreader text-h3 text-ink">
              Generative AI & LLMs
            </h3>
          </div>
          <p className="font-inter text-body-md text-on-surface-variant">
            Exploring novel architectures for Large Language Models to improve
            reasoning capabilities, reduce hallucination rates, and optimize
            inference performance for real-time applications.
          </p>
        </div>

        {/* Medical Deep Learning */}
        <div className="col-span-1 border border-surface-variant bg-surface-container-low p-md">
          <div className="flex items-center gap-3 mb-4">
            <MdOutlineMedicalServices className="text-ink text-2xl" />
            <h3 className="font-newsreader text-h3 text-ink">
              Medical Deep Learning
            </h3>
          </div>
          <p className="font-inter text-body-md text-on-surface-variant">
            Applying advanced neural networks to complex diagnostic imaging and
            patient data analysis.
          </p>
        </div>

        {/* Cybersecurity */}
        <div className="col-span-1 border border-surface-variant bg-surface-container-low p-md">
          <div className="flex items-center gap-3 mb-4">
            <MdOutlineSecurity className="text-ink text-2xl" />
            <h3 className="font-newsreader text-h3 text-ink">
              Cybersecurity
            </h3>
          </div>
          <p className="font-inter text-body-md text-on-surface-variant">
            Integrating machine learning models into robust security pipelines
            for anomaly detection.
          </p>
        </div>

        {/* Academic Foundations — spans 2 cols */}
        <div className="col-span-1 md:col-span-2 border border-surface-variant bg-surface-container-low p-md flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <MdOutlineSchool className="text-ink text-2xl" />
              <h3 className="font-newsreader text-h3 text-ink">
                Academic Foundations
              </h3>
            </div>
            <p className="font-inter text-body-md text-on-surface-variant">
              B.Sc. in Computer Science & Engineering
              <br />
              Rajshahi University of Engineering & Technology (RUET)
            </p>
          </div>
          <div className="hidden sm:block text-right">
            <span className="font-inter text-label-caps border border-surface-variant px-3 py-1 bg-surface inline-block uppercase tracking-[0.1em]">
              Graduated
            </span>
          </div>
        </div>
      </section>

      {/* ===== PROFESSIONAL TRAJECTORY DIVIDER ===== */}
      <div className="relative w-full h-[1px] bg-surface-variant mb-xl">
        <span className="absolute -top-3 left-0 bg-surface pr-4 font-inter text-label-caps text-on-surface-variant uppercase tracking-[0.1em]">
          Professional Trajectory
        </span>
      </div>

      {/* ===== EXPERIENCE TIMELINE ===== */}
      <section className="mb-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {experience.map((exp, index) => (
            <React.Fragment key={index}>
              {/* Date column */}
              <div className="md:col-span-3 text-left md:text-right">
                <p className="font-inter text-label-caps text-on-surface-variant pt-2 uppercase tracking-[0.1em]">
                  {exp.end ? `${formatDate(exp.start).split(" ")[1]} - ${formatDate(exp.end).split(" ")[1]}` : "Present"}
                </p>
              </div>

              {/* Content column */}
              <div
                className={`md:col-span-9 border-l border-surface-variant pl-8 relative ${
                  index < experience.length - 1 ? "pb-12" : ""
                }`}
              >
                {/* Timeline marker */}
                <div
                  className={`absolute w-3 h-3 -left-[6px] top-2 ${
                    !exp.end
                      ? "bg-ink"
                      : "border border-ink bg-surface"
                  }`}
                ></div>

                <h3 className="font-newsreader text-h3 text-ink mb-1">
                  {exp.role}
                </h3>
                <p className="font-inter text-body-lg text-on-surface-variant mb-4">
                  {exp.company}
                </p>
                <p className="font-inter text-body-md text-on-surface-variant max-w-2xl">
                  {exp.summary || exp.highlights?.[0] || ""}
                </p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
