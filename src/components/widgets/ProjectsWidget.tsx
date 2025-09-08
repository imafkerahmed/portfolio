import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Widget } from "@/components/widget";
import { getUserRepos, Repo } from "@/lib/github";
import { site } from "@/lib/config";

function RepoItem({ repo }: { repo: Repo }) {
  // Safer, consistent date label
  const updatedLabel = new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    timeZone: "UTC",
  }).format(new Date(repo.updated_at));

  return (
    <li className="group flex items-start justify-between gap-4 rounded-md border p-3 hover:bg-muted/40 transition-colors">
      <div>
        <Link
          href={repo.html_url}
          className="font-medium hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {repo.name}
        </Link>
        {repo.description ? (
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {repo.description}
          </p>
        ) : null}
        <div className="mt-2 text-xs text-muted-foreground flex gap-3">
          {repo.language ? <span>{repo.language}</span> : null}
          {typeof repo.stargazers_count === "number" ? (
            <span>★ {repo.stargazers_count}</span>
          ) : null}
          <span>Updated {updatedLabel}</span>
        </div>
      </div>
      <ArrowUpRight className="h-4 w-4 opacity-60 group-hover:opacity-100 transition-opacity" />
    </li>
  );
}

export async function ProjectsWidget() {
  const repos = await getUserRepos(site.githubUsername, 6);

  return (
    <Widget
      title="Recent Projects"
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
      <ul className="space-y-2">
        {repos.map((r) => (
          <RepoItem key={r.id} repo={r} />
        ))}
      </ul>
    </Widget>
  );
}
