import { describe, expect, it } from 'vitest';
import { articles, categories, searchArticles } from '@/data/manual';
import { manualConfig } from '@/data/config';
describe('Manuel GCP', () => {
  it('contains all supplied references with unique identifiers', () => {
    expect(articles).toHaveLength(13);
    expect(categories).toHaveLength(6);
    expect(new Set(articles.map(a => a.id)).size).toBe(13);
    for (const article of articles) expect(categories.some(c => c.id === article.category)).toBe(true);
  });
  it('preserves the 15 grades and BM2 wording', () => {
    const grades = articles.find(a => a.id === 'grades');
    const list = grades?.sections.flatMap(s => s.items ?? []) ?? [];
    expect(list).toHaveLength(15);
    expect(list).toContain('Sergent-chef BM2');
  });
  it('contains no prohibited content', () => {
    expect(JSON.stringify({articles,categories})).not.toMatch(/compte[ -]rendu|débriefing|SSE report|rapport final|rapport de fin de mission/i);
  });
  it('searches content, ignores accents and supports categories', () => {
    expect(searchArticles('PVS-31').map(a => a.id)).toContain('dotation');
    expect(searchArticles('sergent').map(a => a.id)).toEqual(['grades']);
    expect(searchArticles('decoration').map(a => a.id)).toContain('decorations');
    expect(searchArticles('PVS-31','protocoles')).toHaveLength(0);
    expect(searchArticles('xyzzzz')).toHaveLength(0);
  });
  it('keeps undocumented categories and the two photos honest', () => {
    for (const id of ['formations','radio','medical']) expect(articles.filter(a => a.category === id)).toHaveLength(0);
    expect(Object.keys(manualConfig.photos)).toEqual(['home','about']);
    expect(manualConfig.photos.home.author).toBe('');
    expect(manualConfig.photos.about.author).toBe('');
  });
});