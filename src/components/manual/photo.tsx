import { Image } from 'lucide-react';
import { manualConfig } from '@/data/config';
export function Photo({ placement }: { placement: 'home' | 'about' }) {
  const photo = manualConfig.photos[placement];
  return <figure className={placement === 'home' ? 'home-photo' : 'about-photo'}>
    {photo.url ? <img src={photo.url} alt={photo.alt} /> : placement === 'about' ? <div className="photo-placeholder"><Image size={32} strokeWidth={1} /><span>Photo de présentation à fournir</span></div> : null}
    <figcaption>{!photo.url && placement === 'home' && 'Photo d’accueil à fournir · '}Photo : {photo.author ? photo.profileUrl ? <a href={photo.profileUrl} target="_blank" rel="noreferrer">{photo.author}</a> : photo.author : 'Auteur à renseigner'}</figcaption>
  </figure>;
}