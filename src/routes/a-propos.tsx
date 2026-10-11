import { createFileRoute, Link } from '@tanstack/react-router';
import { ChevronRight, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { pageHead } from '@/data/manual';
import { manualConfig } from '@/data/config';
import { Photo } from '@/components/manual/photo';
export const Route = createFileRoute('/a-propos')({
  head: () => {const head = pageHead('À propos du GCP', 'Le Groupement de Protection d’Opérations, communauté de roleplay militaire sur Arma Reforger.');return {meta:[...head.meta,...(manualConfig.photos.about.url.startsWith('https://') ? [{property:'og:image',content:manualConfig.photos.about.url},{name:'twitter:image',content:manualConfig.photos.about.url}] : [])]};},
  component: AboutPage,
});
function AboutPage() {
  return <div className="page-width document-page about-page"><div className="breadcrumb"><Link to="/">Accueil</Link><ChevronRight size={13} /><span>À propos & liens</span></div><header className="document-heading"><span className="eyebrow">LA COMMUNAUTÉ</span><h1>Groupement de Protection<br />d’Opérations</h1><p>Respect • Cohésion • Discipline • Immersion.</p></header>
    <div className="about-intro"><ShieldCheck size={27} /><div><h2>Le GCP sur Arma Reforger</h2><p>Le GCP est une communauté de jeu de rôle militaire sur Arma Reforger. Ce manuel rassemble les règles, les dotations et les procédures fournies par le GCP pour ses scénarios de jeu.</p><p>Il ne s’agit pas d’un site officiel de l’armée française. Les fiches sont des références de simulation, et non des recommandations militaires ou médicales réelles.</p></div></div>
    <Photo placement="about" />
    <section className="about-links"><span className="eyebrow">RESTER EN CONTACT</span><h2>Les liens du GCP</h2><div>{[['Discord',manualConfig.links.discord],['TikTok',manualConfig.links.tiktok],['Autres liens',manualConfig.links.other]].map(([label,url]) => url ? <a key={label} href={url} target="_blank" rel="noreferrer">{label}<ArrowUpRight size={18} /></a> : <div className="pending-link" key={label}><strong>{label}</strong><span>À renseigner</span></div>)}</div></section>
  </div>;
}