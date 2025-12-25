import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TextType from "@/components/ui/typetext/TextType.jsx";
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
        <Avatar className="h-28 w-28 rounded-2xl shrink-0">
          <AvatarImage
            src={site.avatarUrl}
            alt={site.name}
            className="object-cover"
          />
          <AvatarFallback className="rounded-2xl">{initials}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold leading-tight">{site.name}</h2>
          <p className="text-sm text-muted-foreground">{site.role}</p>
          <TextType
            as="p"
            className="text-sm leading-relaxed mt-2"
            text={
              "I build web apps with Next.js and enjoy learning by shipping small projects."
            }
            typingSpeed={40}
            pauseDuration={2000}
            deletingSpeed={30}
            loop={true}
            showCursor={true}
            cursorCharacter="|"
          />
        </div>
      </div>
    </Widget>
  );
}
