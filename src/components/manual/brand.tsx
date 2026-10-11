import { Shield, Crosshair } from 'lucide-react';
import { manualConfig } from '@/data/config';
export function Brand({ large = false }: { large?: boolean }) {
  if (manualConfig.logoUrl) return <img src={manualConfig.logoUrl} alt="Logo GCP" className={large ? 'h-40 w-40 object-contain' : 'h-12 w-12 object-contain'} />;
  return <div className={large ? 'gcp-emblem large' : 'gcp-emblem'} aria-label="Emblème provisoire GCP">
    <Shield strokeWidth={1} /><Crosshair strokeWidth={1.2} className="emblem-cross" /><span>GCP</span>
  </div>;
}