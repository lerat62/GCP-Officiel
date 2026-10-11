import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight, BookOpen, ChevronRight, ShieldCheck, Crosshair, ClipboardCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { categories, pageHead } from '@/data/manual';
import { manualConfig } from '@/data/config';
import { Brand } from '@/components/manual/brand';
import { Photo } from '@/components/manual/photo';
import { CategoryCard } from '@/components/manual/category-card';

export const Route = createFileRoute('/')({
  head: () => {
    const head = pageHead('Accueil', 'Le manuel communautaire du Groupement de Protection d’Opérations sur Arma Reforger : règles, dotations et procédures de roleplay.');
    return { meta: [...head.meta, ...(manualConfig.photos.home.url.startsWith('https://') ? [{ property: 'og:image', content: manualConfig.photos.home.url }, { name: 'twitter:image', content: manualConfig.photos.home.url }] : [])] };
  },
  component: Index,
});
function Index() {
  return <>
    <div className="breadcrumb page-width"><span>Manuel GCP</span><ChevronRight size={13} /><span>Accueil</span></div>
    <section className="home-hero">
      <div className="topographic-map" aria-hidden="true"><svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice"><defs><pattern id="topo" width="650" height="550" patternUnits="userSpaceOnUse"><g fill="none" stroke="currentColor" strokeWidth="1"><path d="M-50 80C70-100 240 120 380 10S650 70 720 120M-50 105C90-75 230 145 390 35S650 100 720 145M-50 130C90-50 240 180 390 60S640 120 720 170M-50 155C90-25 240 210 390 85S640 150 720 195M-50 180C90 0 240 230 390 110S640 180 720 220M-50 205C90 25 240 260 390 135S640 200 720 245M-50 230C90 50 240 290 390 160S640 230 720 270M-50 255C90 75 240 320 390 185S640 260 720 295M-50 280C90 100 240 350 390 210S640 280 720 320M-50 305C90 125 240 380 390 235S640 310 720 345M-50 330C90 150 240 410 390 260S640 340 720 370M-50 355C90 175 240 440 390 285S640 360 720 395M-50 380C90 200 240 470 390 310S640 390 720 420M-50 405C90 225 240 500 390 335S640 420 720 445M-50 430C90 250 240 530 390 360S640 440 720 470M-50 455C90 275 240 560 390 385S640 470 720 495" /></g></pattern></defs><rect width="1000" height="600" fill="url(#topo)" /></svg></div>
      <Photo placement="home" />
      <div className="hero-content page-width"><div className="hero-kicker"><span className="status-dot" /> GROUPEMENT DE PROTECTION D’OPÉRATIONS</div>
        <h1>MANUEL <span>GCP</span><span className="hero-title-mark">/</span></h1>
        <p>Une unité. Des standards. Une même mission.</p><div className="hero-description">Le référentiel de notre communauté Arma Reforger.<br />Règles, équipements et procédures : l’essentiel pour évoluer ensemble.</div>
        <div className="hero-actions"><Button asChild size="lg"><Link to="/fiche/$slug" params={{ slug: 'reglement' }}><BookOpen />Consulter le manuel<ArrowRight /></Link></Button><Button asChild variant="outline" size="lg"><Link to="/a-propos">Découvrir le GCP<ArrowUpRightIcon /></Link></Button></div>
        <div className="hero-motto"><span>RESPECT</span><i /> <span>COHÉSION</span><i /><span>DISCIPLINE</span><i /><span>IMMERSION</span></div>
      </div><div className="hero-emblem"><Brand large /><span>ARMA REFORGER</span><small>COMMUNAUTÉ ROLEPLAY</small></div>
      <span className="hero-corner">GCP / MANUEL DE RÉFÉRENCE</span>
    </section>
    <div className="page-width home-body">
      <div className="community-notice"><ShieldCheck size={20} /><p><strong>Un manuel communautaire, dédié au jeu.</strong> Les contenus concernent exclusivement le roleplay sur Arma Reforger et ne constituent pas des instructions militaires ou médicales réelles.</p></div>
      <section className="categories-section"><div className="section-heading"><div><span className="eyebrow">LE RÉFÉRENTIEL</span><h2>Parcourir le manuel</h2></div><span className="section-count">06 CATÉGORIES <span>/</span> 13 FICHES</span></div>
        <div className="category-grid">{categories.map((c, i) => <CategoryCard key={c.id} category={c} index={i} />)}</div>
      </section>
      <section className="quick-section"><div className="section-heading"><div><span className="eyebrow">LES ESSENTIELS</span><h2>À portée de main</h2></div><Crosshair size={22} className="text-muted-foreground" /></div><div className="quick-grid">{[{id:'reglement',title:'Règlement du serveur',text:'Les règles de la communauté',icon:ShieldCheck},{id:'dotation',title:'Checklist de l’équipier',text:'Votre dotation de référence',icon:ClipboardCheck},{id:'smep',title:'Briefing SMEP',text:'Les quatre points du briefing',icon:BookOpen}].map(item => <Link to="/fiche/$slug" params={{slug:item.id}} className="quick-link" key={item.id}><item.icon size={21} /><div><strong>{item.title}</strong><span>{item.text}</span></div><ArrowRight size={18} /></Link>)}</div></section>
    </div>
  </>;
}
function ArrowUpRightIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" /></svg>; }
