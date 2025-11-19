// "use client"
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects } from "@/constants";
// import { useGSAP } from "@gsap/react";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export const metadata = {
  title: "Project | Portfolio",
  description: "Detailed case study",
};

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // Await params before destructuring

  const project = projects.find((p) => p.slug === slug);
  if (!project) return notFound();

  return (
    <main className="min-h-screen px-6 py-16 bg-white text-black">
      <section className="project-header max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold">{project.name}</h1>
        <p className="mt-2 text-2xl md:text-[26px] lg:text-[32px] text-gray-700">{project.description}</p>
      </section>

      <section className="project-body max-w-3xl mx-auto space-y-12">
        <div>
          <h2 className="text-xl font-semibold">Screenshots</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            {project.screenshots && project.screenshots.map((src, idx) => (
              <Image
                key={idx}
                src={src}
                alt={`Screenshot ${idx + 1}`}
                width={600}
                height={400}
                className="rounded-lg shadow-md object-cover w-full"
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Goal</h2>
          <p>{project.goal}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Outcome</h2>
          <p>{project.outcome}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Tech Stack</h2>
          <ul className="flex flex-wrap gap-2">
            {project.frameworks.map((framework) => (
              <li
                key={framework.id}
                className="bg-gray-100 px-3 py-1 rounded-full text-sm"
              >
                {framework.name}
              </li>
            ))}
          </ul>
        </div>

        
      </section>
    </main>
  );
}