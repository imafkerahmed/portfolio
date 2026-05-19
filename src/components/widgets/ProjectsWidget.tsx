import Link from "next/link";
import { Widget } from "@/components/widget";
import { getUserRepos } from "@/lib/github";
import { site } from "@/lib/config";
import { ProjectsCarousel } from "@/components/widgets/ProjectsCarousel";

export async function ProjectsWidget() {
  const repos = await getUserRepos(site.githubUsername, 6);

  return (
    <Widget
      title="Recent Projects"
      className="h-[480px] md:h-[460px] lg:h-[440px] xl:h-[420px]"
      bodyClassName="h-full"
      action={
        <Link
          href={`https://github.com/${site.githubUsername}?tab=repositories`}
          className="text-xs text-muted-foreground hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          View all
        </Link>
      }
    >
      <ProjectsCarousel repos={repos} />
    </Widget>
  );
}
