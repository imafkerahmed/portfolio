import { AboutWidget } from "@/components/widgets/AboutWidget";
import { ProjectsWidget } from "@/components/widgets/ProjectsWidget";
import { SkillsWidget } from "@/components/widgets/SkillsWidget";
import { ContactWidget } from "@/components/widgets/ContactWidget";
import { EducationWidget } from "@/components/widgets/EducationWidget";

export default function HomePage() {
  return (
    <div className="grid items-start gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-auto">
      <div className="lg:col-span-2">
        <AboutWidget />
      </div>

      <div>
        <SkillsWidget />
      </div>

      {/* Taller Education card — adjust the number to your liking */}
      <div className="lg:col-span-2 self-start">
        <EducationWidget height={180} /> {/* try 200 if you want even taller */}
      </div>

      <div className="lg:col-span-2">
        <ProjectsWidget />
      </div>

      <div>
        <ContactWidget />
      </div>
    </div>
  );
}
