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

- Keep portfolio facts in `src/content/portfolio.ts` and render them in the index route so dates, outcomes, and contact details stay consistent across sections.
- Use semantic CSS tokens and shared Button/Accordion controls for the portfolio to keep styling and keyboard interactions consistent.
- Portfolio asset pointers are mapped in a browser-safe content asset module; original public logos are copied to managed storage to avoid external hotlinks.
- Contact form logic generates a mailto draft entirely in the browser and never persists or submits messages because no contact backend is configured.
