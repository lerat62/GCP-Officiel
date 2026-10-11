import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { ArrowUpRight, BookOpen, ChevronRight, Hourglass, Search } from 'lucide-react';
import { useState } from 'react';
import { categories, articles, normalize, pageHead } from '@/data/manual';
import { categoryIcons } from '@/components/manual/icons';
export const Route = createFileRoute('/rubrique/$slug')({
  loader: ({ params }) => { const category = categories.find(c => c.id === params.slug); if (!category) throw notFound(); return category; },
  head: ({ loaderData }) => pageHead(loaderData?.title ?? 'Rubrique indisponible', loaderData?.description ?? 'Cette rubrique du manuel GCP est indisponible.'),
  component: CategoryPage,
});
function CategoryPage() {
  const category = Route.useLoaderData();
  const [filter, setFilter] = useState('');
  const Icon = categoryIcons[category.id] ?? BookOpen;
  const all = articles.filter(a => a.category === category.id);
  const shown = all.filter(a => normalize(`${a.title} ${a.description}`).includes(normalize(filter)));
  return <div className="page-width document-page"><div className="breadcrumb"><Link to="/">Accueil</Link><ChevronRight size={13} /><span>{category.title}</span></div>
    <header className="document-heading"><div className="document-category-icon"><Icon size={28} strokeWidth={1.4} /></div><span className="eyebrow">LE MANUEL / {String(categories.findIndex(c => c.id === category.id) + 1).padStart(2, '0')}</span><h1>{category.title}</h1><p>{category.description}</p></header>
    {all.length ? <><div className="category-filter"><span>{all.length} fiches de référence</span><label><Search size={17} /><input aria-label="Filtrer les fiches" placeholder="Filtrer les fiches…" value={filter} onChange={e => setFilter(e.target.value)} /></label></div><div className="article-list">{shown.map((a,i) => <Link key={a.id} to="/fiche/$slug" params={{slug:a.id}}><span className="article-number">{String(i+1).padStart(2,'0')}</span><BookOpen size={22} /><div><h2>{a.title}</h2><p>{a.description}</p></div><ArrowUpRight size={20} /></Link>)}</div>{shown.length === 0 && <p className="empty-filter">Aucune fiche ne correspond à votre recherche.</p>}</> : <section className="pending-section"><Hourglass size={32} strokeWidth={1.2} /><span className="status-badge">À compléter</span><h2>Le contenu sera ajouté par le GCP.</h2><p>Aucun contenu validé n’a encore été fourni pour cette rubrique.</p>{category.id === 'medical' && <Link to="/fiche/$slug" params={{slug:'blesse'}}>Consulter la procédure de jeu : blessé sous le feu <ArrowUpRight size={15} /></Link>}{category.id === 'formations' && <div className="related-links"><Link to="/fiche/$slug" params={{slug:'reco'}}>Manuel de formation RECO <ArrowUpRight size={15} /></Link><Link to="/fiche/$slug" params={{slug:'tenues'}}>Restrictions des équipements spécialisés <ArrowUpRight size={15} /></Link></div>}</section>}
  </div>;
}