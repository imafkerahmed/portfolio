export type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
};

// Simple in-memory cache for dev/local to avoid hitting rate limits constantly.
// Keyed by `${username}:${max}`; expires after ttlMs.
type CacheEntry = { data: Repo[]; expires: number };
const memoryCache = new Map<string, CacheEntry>();

function getCache(key: string) {
  const e = memoryCache.get(key);
  if (!e) return null;
  if (Date.now() > e.expires) return null;
  return e.data;
}

function setCache(key: string, data: Repo[], ttlMs: number) {
  memoryCache.set(key, { data, expires: Date.now() + ttlMs });
}

function fallbackRepos(username: string, max: number): Repo[] {
  const now = new Date().toISOString();
  const base: Repo[] = [
    {
      id: 1,
      name: "portfolio",
      html_url: `https://github.com/${username}`,
      description: "Projects temporarily unavailable due to GitHub rate-limiting.",
      stargazers_count: 0,
      language: "TypeScript",
      updated_at: now,
    },
    {
      id: 2,
      name: "nextjs-starter",
      html_url: `https://github.com/${username}`,
      description: "Using cached placeholder data. Add GITHUB_TOKEN to lift limits.",
      stargazers_count: 0,
      language: "JavaScript",
      updated_at: now,
    },
    {
      id: 3,
      name: "open-source",
      html_url: `https://github.com/${username}`,
      description: "Visit GitHub profile to view repositories.",
      stargazers_count: 0,
      language: "",
      updated_at: now,
    },
  ];
  return base.slice(0, Math.max(1, Math.min(max, base.length)));
}

export async function getUserRepos(username: string, max = 6): Promise<Repo[]> {
  const key = `${username}:${max}`;

  // Use memory cache first (especially helpful in dev where revalidate is ignored frequently)
  const cached = getCache(key);
  if (cached) return cached;

  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=${max}`,
      {
        headers,
        // In production, ISR helps; in dev, we still guard with memory cache above
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      const text = await res.text();
      // Downgrade to warn and serve fallback/cached to avoid noisy console in dev
      console.warn("GitHub API error", res.status, text);

      // If we had a stale cache, prefer returning it; otherwise return a friendly fallback
      const stale = memoryCache.get(key)?.data;
      if (stale && stale.length) return stale;
      const fb = fallbackRepos(username, max);
      // Cache fallback briefly to avoid spamming
      setCache(key, fb, 5 * 60 * 1000);
      return fb;
    }

    const json = (await res.json()) as Repo[];
    // Cache result: 1 hour in prod, 15 minutes in dev
    const ttl = process.env.NODE_ENV === "production" ? 60 * 60 * 1000 : 15 * 60 * 1000;
    setCache(key, json, ttl);
    return json;
  } catch (err) {
    console.warn("GitHub fetch failed", err);
    const stale = memoryCache.get(key)?.data;
    if (stale && stale.length) return stale;
    const fb = fallbackRepos(username, max);
    setCache(key, fb, 5 * 60 * 1000);
    return fb;
  }
}
