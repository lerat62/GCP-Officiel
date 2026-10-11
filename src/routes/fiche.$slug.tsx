import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronRight, ShieldAlert, List, Medal, RotateCcw } from 'lucide-react';
import { articles, categories, pageHead, type Section } from '@/data/manual';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
export const Route = createFileRoute('/fiche/$slug')({
  loader: ({params}) => { const article = articles.find(a => a.id === params.slug); if (!article) throw notFound(); return article; },
  head: ({loaderData}) => pageHead(loaderData?.title ?? 'Fiche indisponible', loaderData?.description ?? 'Cette fiche du manuel GCP est indisponible.'),
  component: ArticlePage,
});
function ArticlePage() {
  const article = Route.useLoaderData();
  const category = categories.find(c => c.id === article.category);
  const index = articles.findIndex(a => a.id === article.id);
  const prev = articles[index - 1]; const next = articles[index + 1];
  return <div className="page-width document-page" key={article.id}>
    <div className="breadcrumb"><Link to="/">Accueil</Link><ChevronRight size={13} />{category && <><Link to="/rubrique/$slug" params={{slug:category.id}}>{category.title}</Link><ChevronRight size={13} /></>}<span>{article.title}</span></div>
    <header className="document-heading"><span className="eyebrow">{category?.title} / FICHE {String(index+1).padStart(2,'0')}</span><h1>{article.title}</h1><p>{article.description}</p><span className="document-tag">RÉFÉRENCE COMMUNAUTAIRE · ARMA REFORGER</span></header>
    <div className="document-layout"><article className={`article-body kind-${article.kind}`}>
      {article.notice && <div className="rule-notice"><ShieldAlert size={21} /><p>{article.notice}</p></div>}
      {article.kind === 'checklist' ? <EquipmentChecklist sections={article.sections} key={article.id} /> : article.kind === 'radiofrequencies' ? <div className="radio-frequency-table-wrap"><table className="radio-frequency-table"><thead><tr><th>Fréquence</th><th>Organisation</th><th>Destination / utilisation</th></tr></thead><tbody>{article.sections.map((section,i) => <tr key={section.title}><td><strong>{section.title}</strong></td><td><strong>{section.items?.[0]}</strong></td><td>{section.items?.[1]}</td></tr>)}</tbody></table></div> : <div className={article.kind === 'smep' ? 'smep-grid' : ''}>{article.sections.map((section,i) => <section id={`section-${i}`} key={i} className={`article-section ${article.kind === 'steps' ? 'step-section' : ''}`}>
        {article.kind === 'steps' && <span className="step-number">{String(i+1).padStart(2,'0')}</span>}
        {article.kind === 'smep' && <span className="smep-letter">{section.title.charAt(0)}</span>}
        <div>{section.title && <h2>{article.kind === 'medals' && <Medal size={22} />}{section.title}</h2>}{section.text && <p>{section.text}</p>}
        {section.items && (article.kind === 'grades' ? <div className="grade-grid">{section.items.map((grade,j) => <div className="grade-card" key={grade}><span className="grade-rank">{String(j+1).padStart(2,'0')}</span><div><strong>{grade.split('(')[1]?.replace(')','') ?? 'BM2'}</strong><span>{grade.replace(/ \(.*\)/,'')}</span></div></div>)}</div> : <ul>{section.items.map((item,j) => <li key={j}>{item}</li>)}</ul>)}</div>
      </section>)}</div>}
      <div className="article-related"><span className="eyebrow">FICHES ASSOCIÉES</span><div>{articles.filter(a => a.id !== article.id && (a.category === article.category || (article.kind === 'checklist' && a.id === 'tenues'))).slice(0,3).map(a => <Link key={a.id} to="/fiche/$slug" params={{slug:a.id}}>{a.title}<ArrowRight size={16} /></Link>)}</div></div>
      <nav className="article-pagination" aria-label="Fiches précédente et suivante">{prev ? <Link to="/fiche/$slug" params={{slug:prev.id}}><ArrowLeft size={19} /><div><span>FICHE PRÉCÉDENTE</span><strong>{prev.title}</strong></div></Link> : <span />}{next && <Link to="/fiche/$slug" params={{slug:next.id}}><div><span>FICHE SUIVANTE</span><strong>{next.title}</strong></div><ArrowRight size={19} /></Link>}</nav>
    </article><aside className="table-of-contents"><div><List size={16} /> SUR CETTE FICHE</div><nav>{article.sections.map((s,i) => <a href={`#section-${i}`} key={i}>{s.title || 'Informations complémentaires'}</a>)}</nav><p>Manuel communautaire<br />GCP — Arma Reforger</p></aside></div>
  </div>;
}
function EquipmentChecklist({sections}: {sections:Section[]}) {
  const [checked,setChecked] = useState<string[]>([]);
  const [filter,setFilter] = useState('all');
  function optional(text:string) { return /facultati/i.test(text); }
  return <div className="equipment-checklist"><div className="checklist-toolbar"><div className="segmented-control">{([['all','Tout'],['required','Obligatoire / autorisé'],['optional','Facultatif']] as const).map(([value,label]) => <Button key={value} variant="ghost" size="sm" aria-pressed={filter === value} className={filter === value ? 'selected' : ''} onClick={() => setFilter(value)}>{label}</Button>)}</div><Button size="icon" variant="ghost" title="Réinitialiser la checklist" aria-label="Réinitialiser la checklist" onClick={() => setChecked([])}><RotateCcw /></Button></div>
    {sections.map((s,i) => {
      const items = s.items ?? [s.text ?? ''];
      const visible = items.filter(v => filter === 'all' || (filter === 'optional' ? optional(v) : !optional(v)));
      return <section className="article-section equipment-section" id={`section-${i}`} key={i}>{visible.length > 0 && <><h2>{s.title}</h2><div className="equipment-rows">{visible.map(item => {
        const id=`${i}-${item}`; const isOptional = optional(item);
        return <label className={`equipment-row ${checked.includes(id) ? 'is-checked' : ''}`} key={id}><Checkbox checked={checked.includes(id)} onCheckedChange={value => setChecked(prev => value ? [...prev,id] : prev.filter(v => v!==id))} /><span>{item}</span>{isOptional && <span className="optional-badge">Facultatif</span>}</label>;
      })}</div></>}</section>;
    })}<p className="checklist-note">{checked.length} élément{checked.length > 1 ? 's' : ''} coché{checked.length > 1 ? 's' : ''}</p>
  </div>;
}