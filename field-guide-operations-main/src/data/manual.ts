import data from './manual.json';

export type Section = { title: string; text?: string; items?: string[] };
export type Article = {
  id: string; category: string; title: string; description: string;
  sections: Section[]; kind: string; notice: string | null;
};
export const categories = data.categories;
export const articles: Article[] = data.articles;
export function normalize(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}
export function searchArticles(query: string, category = 'all') {
  const terms = normalize(query.trim()).split(/\s+/).filter(Boolean);
  return articles.filter(article => (category === 'all' || article.category === category) && terms.every(term => normalize([article.title, article.description, ...article.sections.flatMap(s => [s.title, s.text ?? '', ...(s.items ?? [])])].join(' ')).includes(term)));
}
export function pageHead(title: string, description: string) {
  return { meta: [
    { title: `${title} — Manuel GCP` },
    { name: 'description', content: description },
    { property: 'og:title', content: `${title} — Manuel GCP` },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] };
}