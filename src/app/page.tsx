import { AboutWidget } from "@/components/widgets/AboutWidget";
import { ProjectsWidget } from "@/components/widgets/ProjectsWidget";
import { SkillsWidget } from "@/components/widgets/SkillsWidget";
import { ContactWidget } from "@/components/widgets/ContactWidget";
import { EducationWidget } from "@/components/widgets/EducationWidget";

export default function HomePage() {
  return (
    <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
      <div className="lg:col-span-2">
        <AboutWidget />
      </div>
      <div>
        <SkillsWidget />
      </div>
      <div className="lg:col-span-2">
        <ProjectsWidget />
      </div>
      <div>
        <EducationWidget />
      </div>
      <div>
        <ContactWidget />
      </div>
    </div>
  );
}
