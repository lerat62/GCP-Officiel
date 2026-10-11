import { Link, useRouterState } from '@tanstack/react-router';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowUp, BookOpen, ChevronDown, ChevronRight, Home, Info, Menu, Search, ShieldCheck, X, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { categories, articles, searchArticles } from '@/data/manual';
import { manualConfig } from '@/data/config';
import { Brand } from './brand';
import { categoryIcons } from './icons';

export function ManualShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: s => s.location.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<string[]>(['organisation']);
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => { setMobileOpen(false); setSearchOpen(false); setQuery(''); }, [pathname]);
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); input.current?.focus(); setSearchOpen(true); }
      if (e.key === 'Escape') { setSearchOpen(false); setMobileOpen(false); }
    };
    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, []);
  const results = searchArticles(query, filter);
  return <div className="manual-app">
    <a href="#main-content" className="skip-link">Aller au contenu</a>
    {mobileOpen && <div className="sidebar-backdrop" onClick={() => setMobileOpen(false)} />}
    <aside className={`manual-sidebar ${mobileOpen ? 'is-open' : ''}`} aria-label="Navigation du manuel">
      <Link to="/" className="brand-lockup"><Brand /><div><strong>GCP</strong><span>MANUEL COMMUNAUTAIRE</span></div></Link>
      <div className="sidebar-edition"><span className="status-dot" /> ARMA REFORGER <span>V{manualConfig.version}</span></div>
      <nav>
        <Link to="/" className={`nav-home ${pathname === '/' ? 'active' : ''}`}><Home size={17} />Accueil</Link>
        <p className="nav-label">LE MANUEL</p>
        {categories.map((category, i) => {
          const Icon = categoryIcons[category.id] ?? BookOpen;
          const childArticles = articles.filter(a => a.category === category.id);
          const isExpanded = expanded.includes(category.id);
          return <div className="nav-group" key={category.id}>
            <div className="nav-category-row">
              <Link to="/rubrique/$slug" params={{ slug: category.id }} className={`nav-category ${pathname.includes(category.id) ? 'active-category' : ''}`}><Icon size={17} /><span>{category.title}</span></Link>
              {childArticles.length > 0 && <Button variant="ghost" size="icon" className="nav-toggle" aria-label={`${isExpanded ? 'Replier' : 'Déplier'} ${category.title}`} aria-expanded={isExpanded} onClick={() => setExpanded(prev => isExpanded ? prev.filter(v => v !== category.id) : [...prev, category.id])}>{isExpanded ? <ChevronDown /> : <ChevronRight />}</Button>}
            </div>
            {isExpanded && childArticles.length > 0 && <div className="nav-children">{childArticles.map(a => <Link key={a.id} to="/fiche/$slug" params={{ slug: a.id }} className={pathname === `/fiche/${a.id}` ? 'active-child' : ''}>{a.title.replace('Manuel de formation : mission de reconnaissance (RECO)', 'Manuel de formation RECO')}</Link>)}</div>}
            {i === 0 && <div className="nav-divider" />}
          </div>;
        })}
        <div className="nav-divider" /><Link to="/a-propos" className={`nav-home ${pathname === '/a-propos' ? 'active' : ''}`}><Info size={17} />À propos & liens</Link>
      </nav>
      <div className="sidebar-bottom"><ShieldCheck size={19} /><p>Respect. Cohésion.<br />Discipline. Immersion.</p><span>COMMUNAUTÉ ROLEPLAY</span></div>
    </aside>
    <div className="app-content">
      <header className="topbar">
        <div className="topbar-title"><Button className="mobile-menu" variant="ghost" size="icon" aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'} onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X /> : <Menu />}</Button><BookOpen size={18} /><span>LE MANUEL DU GCP</span></div>
        <div className="global-search">
          <Search size={17} /><input ref={input} aria-label="Rechercher dans le manuel" placeholder="Rechercher dans le manuel…" value={query} onFocus={() => setSearchOpen(true)} onChange={e => {setQuery(e.target.value); setSearchOpen(true);}} />
          {query && <Button variant="ghost" size="icon" aria-label="Effacer la recherche" onClick={() => {setQuery(''); input.current?.focus();}}><X /></Button>}
          {searchOpen && <div className="search-results"><div className="search-heading"><span>{query ? `${results.length} fiche${results.length > 1 ? 's' : ''}` : 'Accès rapide'}</span><Button size="icon" variant="ghost" aria-label="Fermer la recherche" onClick={() => setSearchOpen(false)}><X /></Button></div>
            <select aria-label="Filtrer les résultats par catégorie" value={filter} onChange={e => setFilter(e.target.value)}><option value="all">Toutes les catégories</option>{categories.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}</select>
            <div className="results-scroll">{results.map(a => <Link key={a.id} to="/fiche/$slug" params={{ slug: a.id }}><BookOpen size={17} /><div><strong>{a.title}</strong><p>{a.description}</p></div><ArrowUpRight size={16} /></Link>)}{results.length === 0 && <p className="no-results">Aucune fiche trouvée pour « {query} ».</p>}</div>
          </div>}
        </div>
        <span className="topbar-status"><span className="status-dot" /> ÉDITION COMMUNAUTAIRE</span>
      </header>
      <main id="main-content" tabIndex={-1}>{children}</main>
      <footer className="site-footer"><div><span className="footer-brand">GCP</span> Manuel communautaire GCP — Arma Reforger</div><span>Version {manualConfig.version} <span className="footer-separator">/</span> {manualConfig.updatedAt}</span><Button variant="ghost" size="icon" aria-label="Revenir en haut de page" title="Revenir en haut" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })}><ArrowUp /></Button></footer>
    </div>
  </div>;
}