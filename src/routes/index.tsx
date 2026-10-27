import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight, BookOpen, ChevronDown, ShieldCheck, Crosshair, ClipboardCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { categories, pageHead } from '@/data/manual';
import { manualConfig } from '@/data/config';
import { Brand } from '@/components/manual/brand';
import { PublicNav } from '@/components/manual/public-nav';
import { Photo } from '@/components/manual/photo';
import { CategoryCard } from '@/components/manual/category-card';

export const Route = createFileRoute('/')({
  head: () => {
    const head = pageHead('Accueil', 'Le Groupement Commando Parachutiste — histoire, organisation, formations et ressources.');
    return { meta: [...head.meta, ...(manualConfig.photos.home.url.startsWith('https://') ? [{ property: 'og:image', content: manualConfig.photos.home.url }, { name: 'twitter:image', content: manualConfig.photos.home.url }] : [])] };
  },
  component: Index,
});
function Index() {
  const formations = categories.find(c => /formation/i.test(c.title));
  const organisation = categories.find(c => /organisation/i.test(c.title));
  const ressources = categories.find(c => /ressource|protocole|équipement/i.test(c.title));
  return <>
    <section className="home-hero gcp-landing-hero">
      <Photo placement="home" />
      <div className="gcp-hero-shade" aria-hidden="true" />
      <PublicNav active="Accueil" />
      <div className="gcp-hero-content page-width">
        <div className="gcp-hero-emblem"><Brand large /></div>
        <h1>GCP</h1>
        <p className="gcp-hero-subtitle">GROUPEMENT COMMANDO PARACHUTISTE</p>
        <p className="gcp-hero-motto">Unis par la rigueur, liés par la mission.</p>
        <div className="hero-actions">
          <Button asChild size="lg"><Link to="/a-propos">Découvrir le GCP <ArrowRight /></Link></Button>
          <Button asChild variant="outline" size="lg"><Link to="/rubrique/$slug" params={{slug: formations?.id ?? categories[0]?.id ?? 'organisation'}}>Accéder au manuel <BookOpen /></Link></Button>
        </div>
      </div>
      <a className="gcp-scroll-cue" href="#contenu">Défiler <ChevronDown size={14}/></a>
    </section>
    <div id="contenu" className="page-width home-body">
      <div className="community-notice"><ShieldCheck size={20} /><p><strong>Un manuel communautaire, dédié au jeu.</strong> Les contenus concernent exclusivement le roleplay sur Arma Reforger et ne constituent pas des instructions militaires ou médicales réelles.</p></div>
      <section className="categories-section"><div className="section-heading"><div><span className="eyebrow">LE RÉFÉRENTIEL</span><h2>Parcourir le manuel</h2></div><span className="section-count">{String(categories.length).padStart(2,'0')} CATÉGORIES <span>/</span> FICHES DE RÉFÉRENCE</span></div>
        <div className="category-grid">{categories.map((c, i) => <CategoryCard key={c.id} category={c} index={i} />)}</div>
      </section>
      <section className="quick-section"><div className="section-heading"><div><span className="eyebrow">LES ESSENTIELS</span><h2>À portée de main</h2></div><Crosshair size={22} className="text-muted-foreground" /></div><div className="quick-grid">{[{id:'reglement',title:'Règlement du serveur',text:'Les règles de la communauté',icon:ShieldCheck},{id:'dotation',title:'Checklist de l’équipier',text:'Votre dotation de référence',icon:ClipboardCheck},{id:'smep',title:'Briefing SMEP',text:'Les quatre points du briefing',icon:BookOpen}].map(item => <Link to="/fiche/$slug" params={{slug:item.id}} className="quick-link" key={item.id}><item.icon size={21} /><div><strong>{item.title}</strong><span>{item.text}</span></div><ArrowRight size={18} /></Link>)}</div></section>
    </div>
  </>;
}
