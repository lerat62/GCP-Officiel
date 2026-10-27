import { createFileRoute, Link } from '@tanstack/react-router';
import { ChevronRight, ArrowUpRight, ArrowRight, ShieldCheck, Users } from 'lucide-react';
import { pageHead } from '@/data/manual';
import { manualConfig } from '@/data/config';
import { Photo } from '@/components/manual/photo';
import { PublicNav } from '@/components/manual/public-nav';
export const Route = createFileRoute('/a-propos')({
  head: () => {const head = pageHead('Histoire du GCP', 'Le Groupement Commando Parachutiste, communauté de roleplay sur Arma Reforger.');return {meta:[...head.meta,...(manualConfig.photos.about.url.startsWith('https://') ? [{property:'og:image',content:manualConfig.photos.about.url},{name:'twitter:image',content:manualConfig.photos.about.url}] : [])]};},
  component: AboutPage,
});
function AboutPage() {
  return <div className="gcp-history-page"><PublicNav active="Histoire" /><div className="page-width document-page about-page"><div className="breadcrumb"><Link to="/">Accueil</Link><ChevronRight size={13} /><span>Histoire</span></div><header className="document-heading"><span className="eyebrow">L’HISTOIRE DU GROUPE</span><h1>Groupement Commando<br />Parachutiste</h1><p>Unis par la rigueur, liés par la mission.</p></header>
    <div className="about-intro"><ShieldCheck size={27} /><div><h2>Le GCP sur Arma Reforger</h2><p>Le GCP est une communauté de roleplay sur Arma Reforger. Cette page présente son histoire, ses fondateurs et les ressources mises à disposition de la communauté.</p><p>Il ne s’agit pas d’un site officiel de l’armée française. Les fiches sont des références de simulation, et non des recommandations militaires ou médicales réelles.</p></div></div>
    <section className="gcp-history-story" aria-labelledby="gcp-history-story-title">
      <div className="section-heading"><div><span className="eyebrow">D’ANIZAY À AUJOURD’HUI</span><h2 id="gcp-history-story-title">L’histoire du GCP</h2></div><ShieldCheck size={22} className="text-muted-foreground" /></div>
      <div className="gcp-history-story-copy">
        <p>Tout a commencé par une simple idée entre Nicolas et Fizz : créer notre propre serveur, construire quelque chose qui nous ressemble et rassembler des joueurs autour d’une même passion.</p>
        <p>D’Anizay à Merak, puis Kunar, le GCP a grandi, vécu de belles choses et traversé des moments difficiles. Puis, un jour, il a fallu s’arrêter. Mais certains projets sont trop importants pour être oubliés.</p>
        <p>Alors, nous avons décidé de revenir. Pas pour refaire exactement la même chose, mais pour repartir sur de nouvelles bases, avec davantage d’expérience, une nouvelle vision et la même envie qu’au premier jour.</p>
        <p>Le GCP, ce n’est pas seulement un serveur. C’est un projet que nous avons construit ensemble, une histoire faite de souvenirs, d’erreurs et d’améliorations.</p>
        <p>Aujourd’hui, avec cette nouvelle ère, une chose est sûre : tant que nous aurons cette envie de faire avancer le projet, l’histoire continuera de s’écrire.</p>
        <p className="gcp-history-story-ending">D’une simple idée à un véritable projet, le GCP vit à travers ses membres, ainsi que grâce à l’engagement de Fizz et Nicolas.</p>
      </div>
    </section>
    <section className="gcp-founders-section" aria-labelledby="gcp-founders-title">
      <div className="section-heading"><div><span className="eyebrow">À L’ORIGINE DU PROJET</span><h2 id="gcp-founders-title">Les fondateurs</h2></div><Users size={22} className="text-muted-foreground" /></div>
      <p className="gcp-founders-intro">Le projet est porté par ses fondateurs, qui contribuent à faire vivre la communauté GCP.</p>
      <div className="gcp-founders-grid">
        <Link to="/fondateur/$slug" params={{slug:'fizz'}} className="gcp-founder-card" aria-label="Voir le profil de Fizz"><div className="gcp-founder-photo"><img src="/photos/fizz-profile.png" alt="Fizz, cofondateur du Discord GCP" /></div><div><span className="eyebrow">COFONDATEUR</span><h3>Fizz</h3><span className="gcp-founder-card-cta">Consulter le profil <ArrowRight size={15} /></span></div></Link>
        <Link to="/fondateur/$slug" params={{slug:'nicolas'}} className="gcp-founder-card" aria-label="Voir le profil de Nicolas"><div className="gcp-founder-photo"><img src="/photos/nicolas-profile.png" alt="Nicolas, fondateur du GCP" /></div><div><span className="eyebrow">FONDATEUR</span><h3>Nicolas</h3><span className="gcp-founder-card-cta">Consulter le profil <ArrowRight size={15} /></span></div></Link>
      </div>
    </section>
    <Photo placement="about" />
    <section className="about-links"><span className="eyebrow">RESTER EN CONTACT</span><h2>Les liens du GCP</h2><div>{[['Discord',manualConfig.links.discord],['TikTok',manualConfig.links.tiktok],['Voter sur Top-Serveurs',manualConfig.links.other]].map(([label,url]) => url ? <a key={label} href={url} target="_blank" rel="noreferrer">{label}<ArrowUpRight size={18} /></a> : <div className="pending-link" key={label}><strong>{label}</strong><span>À renseigner</span></div>)}</div></section>
  </div></div>;
}