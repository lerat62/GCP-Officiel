import { Link } from '@tanstack/react-router';
import { ArrowUpRight, FileText } from 'lucide-react';
import { articles, categories } from '@/data/manual';
import { categoryIcons } from './icons';
export function CategoryCard({ category, index }: { category: typeof categories[number]; index: number }) {
  const Icon = categoryIcons[category.id] ?? FileText;
  const count = articles.filter(a => a.category === category.id).length;
  return <Link to="/rubrique/$slug" params={{ slug: category.id }} className={`category-card category-${category.id}`}>
    <div className="card-top"><div className="category-icon"><Icon size={23} strokeWidth={1.4} /></div><span>{String(index + 1).padStart(2, '0')}</span><ArrowUpRight size={19} className="card-arrow" /></div>
    <h3>{category.title}</h3><p>{category.description}</p>
    <div className="card-bottom"><FileText size={13} /><span>{count ? `${count} fiches de référence` : 'Contenu à compléter'}</span>{!count && <span className="pending-dot" />}</div>
  </Link>;
}