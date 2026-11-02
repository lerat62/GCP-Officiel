import { useState, type FormEvent } from 'react';
import { useRouter } from '@tanstack/react-router';
import { LockKeyhole, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { unlockResources } from '@/utils/resources.functions';

export function ResourcesPasswordGate() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setPending(true);
    try {
      const accepted = await unlockResources({ data: { password } });
      if (!accepted) {
        setError('Mot de passe incorrect.');
        return;
      }
      setPassword('');
      await router.invalidate();
    } catch {
      setError("Impossible de vérifier le mot de passe. Réessaie dans un instant.");
    } finally {
      setPending(false);
    }
  }

  return <section className="resources-password-gate" aria-labelledby="resources-password-title">
    <div className="resources-password-icon"><LockKeyhole size={27} strokeWidth={1.5} /></div>
    <span className="eyebrow">ACCÈS RESTREINT · GCP</span>
    <h1 id="resources-password-title">Espace ressources</h1>
    <p>Cette rubrique est réservée aux membres autorisés. Saisis le mot de passe communiqué par le GCP pour continuer.</p>
    <form onSubmit={submit}>
      <label htmlFor="resources-password">Mot de passe</label>
      <Input id="resources-password" type="password" autoComplete="current-password" value={password} onChange={event => setPassword(event.target.value)} placeholder="Saisir le mot de passe" required />
      {error && <p className="resources-password-error" role="alert">{error}</p>}
      <Button type="submit" disabled={pending || !password} className="resources-password-submit">{pending ? 'Vérification…' : 'Accéder aux ressources'} <ShieldCheck size={17} /></Button>
    </form>
    <span className="resources-password-note">Accès protégé · Session temporaire</span>
  </section>;
}
