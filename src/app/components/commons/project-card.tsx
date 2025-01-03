"use client";

import { ProjectData } from "@/app/server/get-profile-data"
import Link from "next/link";

interface ProjectCardProps {
  project: ProjectData;
  isOwner: boolean;
  img: string;
}

export function ProjectCard({
  project,
  isOwner,
  img,
}: ProjectCardProps) {
  const formattedUrl = project.projectUrl.startsWith("http") ? project.projectUrl : `https://${project.projectUrl}`;

  function handleProjectClick() {
    // TODO: implementar analytics
  }

  return (
    <Link href={`${formattedUrl}`} target="_blank" onClick={handleProjectClick}>
      <div className="w-[340px] h-[132px] flex gap-5 bg-background-secondary p-3 rounded-[20px] border border-transparent hover:border-border-secondary">
        <div className="size-24 rounded-md overflow-hidden flex-shrink-0">
          <img src={img} alt="Projeto" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col gap-2">
          {isOwner && (
            <span className="uppercase text-xs font-bold text-accent-green">
              {project.totalVisits || 0} Cliques
            </span>
          )}
          <div className="flex flex-col">
            <span className="text-white font-bold text-xl">
              {project.projectName}
            </span>
            <span className="text-content-body text-sm">
              {project.projectDescription}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
