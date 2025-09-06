import { Badge } from "@/components/ui/badge";
import { Widget } from "@/components/widget";
import { site } from "@/lib/config";

export function EducationWidget() {
  return (
    <Widget title="Education">
      <div className="flex flex-wrap gap-2">
        {site.education.map((edu) => (
          <Badge key={edu} variant="secondary" className="px-2 py-0.5">
            {edu}
          </Badge>
        ))}
      </div>
    </Widget>
  );
}