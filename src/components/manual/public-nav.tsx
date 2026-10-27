import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { X, Code2, MessageCircle, Copy, Check } from 'lucide-react';
import { Brand } from '@/components/manual/brand';
import { categories } from '@/data/manual';

export function PublicNav({ active = '' }: { active?: 'Accueil' | 'Histoire' }) {
  const formations = categories.find(c => /formation/i.test(c.title));
  const organisation = categories.find(c => /organisation/i.test(c.title));
  const ressources = categories.find(c => /ressource|protocole|équipement/i.test(c.title));
  const [developerOpen, setDeveloperOpen] = useState(false);
  const [discordCopied, setDiscordCopied] = useState(false);
  async function copyDiscord() {
    try {
      await navigator.clipboard.writeText('le_rat1');
      setDiscordCopied(true);
      window.setTimeout(() => setDiscordCopied(false), 1800);
    } catch {
      window.prompt('Copie ton identifiant Discord :', 'le_rat1');
    }
  }
  useEffect(() => {
    if (!developerOpen) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') setDeveloperOpen(false); };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKeyDown); document.body.style.overflow = ''; };
  }, [developerOpen]);
  return <><header className="gcp-site-nav">
    <Link to="/" className="gcp-nav-brand" aria-label="GCP — Accueil"><Brand /><strong>GCP</strong></Link>
    <nav aria-label="Navigation principale">
      <Link to="/" className={active === 'Accueil' ? 'is-current' : ''}>Accueil</Link>
      <Link to="/a-propos" className={active === 'Histoire' ? 'is-current' : ''}>Histoire</Link>
      {formations && <Link to="/rubrique/$slug" params={{slug: formations.id}}>Formations</Link>}
      {organisation && <Link to="/rubrique/$slug" params={{slug: organisation.id}}>Organisation</Link>}
      {ressources && <Link to="/rubrique/$slug" params={{slug: ressources.id}}>Ressources</Link>}
    </nav>
    <button type="button" className="developer-nav-button" onClick={() => setDeveloperOpen(true)}><Code2 size={15} /> Développeur du site</button>
  </header>
  {developerOpen && <div className="developer-modal-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) setDeveloperOpen(false); }}>
    <section className="developer-modal" role="dialog" aria-modal="true" aria-labelledby="developer-modal-title">
      <button type="button" className="developer-modal-close" aria-label="Fermer" onClick={() => setDeveloperOpen(false)}><X size={20} /></button>
      <span className="eyebrow">DANS LES COULISSES DU SITE</span>
      <div className="developer-profile-top">
        <img className="developer-profile-photo" src="/photos/developpeur-le-rat.png" alt="Visuel choisi par Le Rat : deux personnages devant le drapeau français" />
        <div className="developer-profile-heading">
          <span className="developer-profile-kicker">CRÉATION NUMÉRIQUE</span>
          <h2 id="developer-modal-title">Le Rat</h2>
          <p className="developer-modal-role"><Code2 size={16} /> Développeur web</p>
        </div>
      </div>
      <p className="developer-modal-bio">Passionné par l'informatique, le développement web et la création de projets numériques, je conçois des sites modernes et immersifs en accordant une attention particulière au design, à l'expérience utilisateur et aux fonctionnalités.<br /><br />Dans le cadre du projet GCP, je travaille sur la conception et le développement du site afin de proposer une plateforme claire, intuitive et adaptée aux besoins de la communauté.<br /><br />Mon objectif : transformer des idées en projets concrets et créer des expériences web soignées, accessibles et fonctionnelles.</p>
      <div className="developer-discord-row"><div className="developer-discord-icon"><MessageCircle size={19} /></div><div className="developer-discord-label"><span>ME RETROUVER SUR DISCORD</span><strong>le_rat1</strong></div><button type="button" className="developer-copy-button" onClick={copyDiscord} aria-label="Copier le pseudo Discord">{discordCopied ? <Check size={17} /> : <Copy size={17} />}<span>{discordCopied ? 'Copié !' : 'Copier'}</span></button></div>
      <p className="developer-modal-note">Identifiant affiché d’après le profil fourni. Le bouton copie le pseudo ; aucun lien de profil personnel n’a été fourni.</p>
    </section>
  </div>}</>; 
}
