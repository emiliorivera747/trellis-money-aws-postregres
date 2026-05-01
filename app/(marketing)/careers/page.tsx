import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/nav-bars/NavBar";
import Footer from "@/components/footers/Footer";
import { createClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Careers - Trellis Money",
  description:
    "Join the Trellis Money team. We're hiring mission-driven engineers to help people see value where others don't.",
};

const roles = [
  {
    id: "founding-backend-engineer",
    title: "Founding Backend Software Engineer",
    type: "Full-time",
    location: "San Francisco Bay Area",
    compensation: "Sweat Equity → Salary",
    compensationNote:
      "This role starts as a sweat equity position. As the company grows and reaches revenue milestones, compensation transitions to a competitive salary.",
    description:
      "We're looking for a founding backend engineer to help build the core infrastructure powering Trellis Money. You'll work closely with the founding team to design and ship the systems that help people understand and grow their financial lives.",
    responsibilities: [
      "Design and build RESTful APIs with FastAPI, ensuring performance and reliability at scale.",
      "Architect and manage PostgreSQL schemas, migrations, and query optimization.",
      "Deploy and maintain cloud infrastructure on AWS (EC2, RDS, S3, Lambda, etc.).",
      "Containerize services with Docker and manage deployments in production environments.",
      "Integrate and iterate on machine learning models for financial insights and predictions.",
      "Collaborate with the frontend team to define API contracts and data models.",
      "Own key backend systems end-to-end — from design through production monitoring.",
    ],
    stack: ["FastAPI", "PostgreSQL", "AWS", "Docker", "Machine Learning"],
  },
];

const CareersPage = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <Navbar isAuthenticated={!!user} />
      <div className="max-w-4xl mx-auto px-6 py-16 font-sans text-tertiary-900">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-tertiary-1000 mb-3">Careers</h1>
        <p className="text-tertiary-700 font-light text-base max-w-2xl">
          We&apos;re a small team building financial tools that give people
          clarity over their money. If you want to work on hard problems at the
          intersection of finance and technology, we&apos;d love to hear from
          you.
        </p>
      </div>

      <div className="space-y-8">
        {roles.map((role) => (
          <div
            key={role.id}
            className="border border-tertiary-200 rounded-2xl p-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold text-tertiary-1000 mb-1">
                  {role.title}
                </h2>
                <div className="flex gap-3 text-sm text-tertiary-600 font-light">
                  <span>{role.type}</span>
                  <span>&middot;</span>
                  <span>{role.location}</span>
                </div>
              </div>
              <Link
                href={`mailto:emiliorivera@trellismoney.com?subject=Application: ${encodeURIComponent(role.title)}`}
                className="shrink-0 inline-flex items-center justify-center rounded-xl border-2 border-tertiary-1000 text-tertiary-1000 hover:bg-tertiary-1000 hover:text-white transition-colors font-semibold text-sm px-5 py-2.5"
              >
                Apply Now
              </Link>
            </div>

            <div className="mb-6 rounded-xl bg-tertiary-100 border border-tertiary-200 px-4 py-3">
              <p className="text-xs font-semibold text-tertiary-900 uppercase tracking-wide mb-1">
                Compensation
              </p>
              <p className="text-sm font-medium text-tertiary-1000 mb-1">
                {role.compensation}
              </p>
              <p className="text-sm font-light text-tertiary-700">
                {role.compensationNote}
              </p>
            </div>

            <p className="text-tertiary-800 font-light mb-6 leading-relaxed">
              {role.description}
            </p>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-tertiary-1000 uppercase tracking-wide mb-3">
                What You&apos;ll Do
              </h3>
              <ul className="space-y-2">
                {role.responsibilities.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-tertiary-800 font-light text-sm leading-relaxed"
                  >
                    <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-tertiary-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-tertiary-1000 uppercase tracking-wide mb-3">
                Core Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {role.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-medium px-3 py-1 rounded-full bg-tertiary-100 text-tertiary-900 border border-tertiary-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-tertiary-100">
        <p className="text-sm text-tertiary-600 font-light">
          Don&apos;t see a role that fits? Reach out anyway at{" "}
          <a
            href="mailto:emiliorivera@trellismoney.com"
            className="text-blue-500 underline"
          >
            emiliorivera@trellismoney.com
          </a>
          .
        </p>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default CareersPage;
