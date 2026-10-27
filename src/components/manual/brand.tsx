import { Shield, Crosshair } from 'lucide-react';
import { manualConfig } from '@/data/config';
export function Brand({ large = false }: { large?: boolean }) {
  const src = manualConfig.emblemUrl;
  if (src) return <img src={src} alt={large ? "Emblème officiel GCP" : "Logo officiel GCP"} className={large ? 'gcp-brand-emblem' : 'gcp-brand-logo'} />;
  return <div className={large ? 'gcp-emblem large' : 'gcp-emblem'} aria-label="Emblème provisoire GCP">
    <Shield strokeWidth={1} /><Crosshair strokeWidth={1.2} className="emblem-cross" /><span>GCP</span>
  </div>;
}
