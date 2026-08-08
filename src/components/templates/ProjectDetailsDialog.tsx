"use client";

import Link from "next/link";
import { CheckCircle2, ExternalLink } from "lucide-react";
import { GithubIconTheme } from "../icons/githubIcon";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProjectDetails } from "@/@types/project";


interface ProjectDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  details: ProjectDetails;
}
function TechBadgeGroup({
  label,
  items,
  colorClass,
}: {
  label: string;
  items: string[];
  colorClass: string;
}) {
  if (!items?.length) return null;

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((tech) => (
          <Badge
            key={tech}
            variant="outline"
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${colorClass}`}
          >
            {tech}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export function ProjectDetailsDialog({
  open,
  onOpenChange,
  details,
}: ProjectDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(next) => !next && onOpenChange(false)}>
      <DialogContent className="flex h-[80vh] w-[calc(100%-2rem)] max-w-5xl! p-0 flex-col gap-0">
        {/* Header */}
        <DialogHeader className="space-y-2 border-b py-4 px-6">
          <DialogTitle className="text-xl font-semibold tracking-tight">
            {details.title}
          </DialogTitle>
        </DialogHeader>

        {/* Scrollable body */}
        <ScrollArea className="flex-1 min-h-0 px-6">
          <section className="space-y-2 mt-6">
            <h3 className="text-sm font-semibold text-foreground">
              Description
            </h3>
            <DialogDescription className="text-sm leading-relaxed text-muted-foreground pb-4">
              {details.description}
            </DialogDescription>
          </section>

          <div className="space-y-6">
            {/* Features */}
            {details.features?.length > 0 && (
              <section className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {details.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <Separator />

            {/* Tech stack */}
            <section className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">
                Tech Stack
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <TechBadgeGroup
                  label="Frontend"
                  items={details.techStack.frontend}
                  colorClass="bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-300 dark:border-indigo-500/20"
                />
                <TechBadgeGroup
                  label="Backend"
                  items={details.techStack.backend}
                  colorClass="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20"
                />
                <TechBadgeGroup
                  label="Database"
                  items={details.techStack.database}
                  colorClass="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20"
                />
              </div>
            </section>

            {/* Conclusion */}
            {details.conclusion && (
              <>
                <Separator />
                <section className="space-y-2 mb-6">
                  <h3 className="text-sm font-semibold text-foreground">
                    Summary
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {details.conclusion}
                  </p>
                </section>
              </>
            )}
          </div>
        </ScrollArea>

        {/* Footer / links */}
        <div className="flex flex-wrap items-center justify-start gap-2 border-t bg-muted/30 px-6 py-4">
          <Button variant="outline" size="sm" >
            <Link className="flex items-center" href={details.githubClient} target="_blank" rel="noopener noreferrer">
              <GithubIconTheme className="mr-1.5 h-4 w-4" />
              Frontend
            </Link>
          </Button>
          <Button variant="outline" size="sm" >
            <Link className="flex items-center" href={details.githubServer} target="_blank" rel="noopener noreferrer">
              <GithubIconTheme className="mr-1.5 h-4 w-4" />
              Backend
            </Link>
          </Button>
          <Button size="sm" >
            <Link className="flex items-center" href={details.liveDemo} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-1.5 h-4 w-4" />
              Live Demo
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
