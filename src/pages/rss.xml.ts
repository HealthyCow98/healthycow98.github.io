import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
const xml = (value: string) => value.replace(/[<>&"']/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[c]!));
export const GET: APIRoute = async ({ site }) => {
  const posts = (await getCollection('posts')).sort((a,b) => b.data.publishedAt.valueOf()-a.data.publishedAt.valueOf());
  const items = posts.map(p => `<item><title>${xml(p.data.title)}</title><description>${xml(p.data.description)}</description><link>${new URL(`/posts/${p.data.slug}/`, site)}</link><guid>${new URL(`/posts/${p.data.slug}/`, site)}</guid><pubDate>${p.data.publishedAt.toUTCString()}</pubDate></item>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>코드에서 배우는 것들</title><link>${site}</link><description>한국어 기술 학습 기록</description><language>ko</language>${items}</channel></rss>`, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
