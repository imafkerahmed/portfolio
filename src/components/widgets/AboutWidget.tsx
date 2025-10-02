import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Widget } from "@/components/widget";
import { site } from "@/lib/config";

export function AboutWidget() {
  const initials = site.name
    .split(" ")
    .map((s) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Widget title="About">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={site.avatarUrl} alt={site.name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold leading-tight">{site.name}</h2>
          <p className="text-sm text-muted-foreground">{site.role}</p>
          {site.location ? (
            <p className="text-xs text-muted-foreground mt-1">
              {site.location}
            </p>
          ) : null}
        </div>
      </div>

      <Separator className="my-4" />

      <p className="text-sm leading-relaxed">{site.about}</p>
    </Widget>
  );
}
