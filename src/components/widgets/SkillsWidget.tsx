import { Badge } from "@/components/ui/badge";
import { Widget } from "@/components/widget";
import { site } from "@/lib/config";

export function SkillsWidget() {
  return (
    <Widget title="Skills">
      <div className="flex flex-wrap gap-2">
        {site.skills.map((skill) => (
          <Badge key={skill} variant="secondary" className="px-2 py-0.5">
            {skill}
          </Badge>
        ))}
      </div>
    </Widget>
  );
}
