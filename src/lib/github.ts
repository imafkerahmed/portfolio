export type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
};

export async function getUserRepos(username: string, max = 6): Promise<Repo[]> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const res = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=${max}`,
    {
      headers,
      // Cache for an hour to avoid rate limits and speed up page loads
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    console.error("GitHub API error", res.status, await res.text());
    return [];
  }

  const json = (await res.json()) as Repo[];
  // Filter forks/templates if you want; here return as-is.
  return json;
}
