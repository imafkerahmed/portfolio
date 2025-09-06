import Link from "next/link";
import { Github, Mail, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Widget } from "@/components/widget";
import { site } from "@/lib/config";

export function ContactWidget() {
  return (
    <Widget title="Contact">
      <div className="flex flex-wrap gap-2">
        {site.links.github && (
          <Button asChild size="sm" variant="outline">
            <Link href={site.links.github} target="_blank" rel="noreferrer">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Link>
          </Button>
        )}
        {site.links.linkedin && (
          <Button asChild size="sm" variant="outline">
            <Link href={site.links.linkedin} target="_blank" rel="noreferrer">
              <Linkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </Link>
          </Button>
        )}
        {site.links.email && (
          <Button asChild size="sm">
            <Link href={`mailto:${site.links.email}`}>
              <Mail className="mr-2 h-4 w-4" />
              Email me
            </Link>
          </Button>
        )}
      </div>
    </Widget>
  );
}
