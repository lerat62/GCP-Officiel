import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { ArrowLeft, ShieldCheck, UserRound, Users } from 'lucide-react';
import { pageHead } from '@/data/manual';
import { PublicNav } from '@/components/manual/public-nav';

const founders = {
  fizz: { name: 'Fizz', serverRole: 'Lieutenant', discordRole: 'Cofondateur' },
  nicolas: { name: 'Nicolas', serverRole: 'Capitaine', discordRole: 'Fondateur' },
} as const;

export const Route = createFileRoute('/fondateur/$slug')({
  loader: ({ params }) => {
    const founder = founders[params.slug as keyof typeof founders];
    if (!founder) throw notFound();
    return founder;
  },
  head: ({ loaderData }) => pageHead(loaderData ? `Profil de ${loaderData.name}` : 'Profil du fondateur', 'Découvrez le profil des fondateurs de la communauté GCP sur Arma Reforger.'),
  component: FounderProfilePage,
});

function FounderProfilePage() {
  const founder = Route.useLoaderData();
  return <div className="gcp-history-page gcp-founder-profile-page">
    <PublicNav active="Histoire" />
    <main className="page-width document-page founder-profile-page">
      <div className="breadcrumb"><Link to="/">Accueil</Link><span>›</span><Link to="/a-propos">Histoire</Link><span>›</span><span>{founder.name}</span></div>
      <Link to="/a-propos" className="founder-back-link"><ArrowLeft size={16} /> Retour à l’histoire du GCP</Link>
      <section className="founder-profile-layout">
        <div className="founder-profile-photo"><img src={founder.name === 'Fizz' ? '/photos/fizz-profile.png' : '/photos/nicolas-profile.png'} alt={`Portrait de ${founder.name}`} /></div>
        <div className="founder-profile-details">
          <span className="eyebrow">PORTRAIT DU GROUPE</span>
          <h1>{founder.name}</h1>
          <p className="founder-profile-lead">Fondateur de la communauté GCP sur Arma Reforger.</p>
          <div className="founder-role-card"><ShieldCheck size={19} /><div><span>RÔLE AU SEIN DU GCP</span><strong>{founder.serverRole}</strong></div></div>
          <div className="founder-role-card"><Users size={19} /><div><span>RÔLE AU SEIN DU DISCORD DU GCP</span><strong>{founder.discordRole}</strong></div></div>
          <section className="founder-bio-section">
            <h2>Biographie</h2>
            {founder.name === 'Nicolas' ? (
              <p>Pour moi, le GCP est avant tout un grand groupe d’amis qui sait rigoler et partager de bons moments, tout en sachant être sérieux quand il le faut, notamment lors des opérations, des mises en situation (MES) et des formations. Notre objectif est de proposer une véritable expérience MilSim, avec de l’immersion, de la cohésion et du sérieux, plutôt que du simple roleplay militaire.</p>
            ) : (
              <div className="founder-bio-copy">
                <p>Je suis Fizz, cofondateur du Discord du GCP. Je m’occupe principalement de la gestion du Discord, de la communication et des TikTok du groupe.</p>
                <p>Comme Nico, je participe également à la création des scénarios, à la préparation des opérations et au rôle de Game Master (GM).</p>
                <p>Mon objectif est de faire évoluer le GCP et de le faire perdurer dans le temps, tout en préservant une bonne cohésion, une véritable expérience MILSIM et, surtout, une excellente entente entre les membres.</p>
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  </div>;
}
