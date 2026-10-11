<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Manual architecture
- Keep manual content in src/data/manual.json and presentation separate; a shared typed adapter enables consistent search and article rendering.
- Use category and article dynamic routes with validated slugs; each reference is directly shareable and has its own metadata.
- Configure the two photo slots, individual credits, social links, logo, version and date in src/data/config.ts; missing values must remain honest pending states.
- Keep checklist selections ephemeral in component state; this reference tool requires no accounts or stored personal data.
