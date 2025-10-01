import { AboutWidget } from "@/components/widgets/AboutWidget";
import { ProjectsWidget } from "@/components/widgets/ProjectsWidget";
import { SkillsWidget } from "@/components/widgets/SkillsWidget";
import { ContactWidget } from "@/components/widgets/ContactWidget";
import { EducationWidget } from "@/components/widgets/EducationWidget";

/**
 * Layout:
 * Row 1 (lg):
 *  - About spans columns 1–2
 *  - Contact in column 3
 *
 * Row 2 (lg):
 *  - Skills in column 1 (narrow)
 *  - Education spans columns 2–3 (wide)
 *
 * Row 3 (lg):
 *  - Projects (choose span: here it spans columns 1–2)
 *  - (Optional future widget could go in column 3 under Education)
 *
 * Responsive behavior:
 *  - md (2 cols): About spans both; Contact sits in col 1 or 2 depending on flow (kept simple).
 *    Skills (col 1) then Education spans both on the next row (cannot sit beside because only 2 cols).
 *  - sm (1 col): natural vertical stack in DOM order.
 */
export default function HomePage() {
  return (
    <div className="grid auto-rows-min items-start gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
        {/* Add height prop back if you previously used it: <EducationWidget height={180} /> */}
        <EducationWidget />
      </div>

      {/* Row 3 (Projects left wide) */}
      <div className="md:col-span-2 lg:col-span-2">
        <ProjectsWidget />
      </div>
      {/* If you later want something under Education on the right at row 3:
          <div className="lg:col-span-1 lg:col-start-3 lg:row-start-3">...</div>
       */}
    </div>
  );
}