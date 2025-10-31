import React from "react";

import { AboutWidget } from "@/components/widgets/AboutWidget";
import { ProjectsWidget } from "@/components/widgets/ProjectsWidget";
import { SkillsWidget } from "@/components/widgets/SkillsWidget";
import { ContactWidget } from "@/components/widgets/ContactWidget";
import { EducationWidget } from "@/components/widgets/EducationWidget";
import { ClientHome } from "@/components/home/ClientHome";

export default async function HomePage() {
  // Server Component: can render async server children like ProjectsWidget.
  return (
    <ClientHome>
      <div
        className={[
          "grid auto-rows-min items-start gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        ].join(" ")}
      >
        {/* Row 1 */}
        <div className="md:col-span-2 lg:col-span-2">
          <AboutWidget />
        </div>
        <div className="lg:col-span-1">
          <ContactWidget />
        </div>

        {/* Row 2 (Skills narrow, Education wide) */}
        <div className="md:col-span-1 lg:col-span-1">
          <SkillsWidget />
        </div>
        <div className="md:col-span-2 lg:col-span-2 lg:col-start-2">
          <EducationWidget />
        </div>

        {/* Row 3 (Projects left wide) */}
        <div className="md:col-span-2 lg:col-span-2">
          <ProjectsWidget />
        </div>
      </div>
    </ClientHome>
  );
}