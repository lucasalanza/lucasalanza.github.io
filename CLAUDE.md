# lucasalanza.github.io — Instruções para Claude Code

Portfólio pessoal do Lucas Lanza, publicado via GitHub Pages em `https://lucasalanza.github.io/`.

**Stack**: site estático puro — HTML5 + CSS + JS vanilla, Bootstrap 5 (template BootstrapMade "iPortfolio"), sem build step. **Não introduzir bundler/framework** (Vite/Vue/React) — GitHub Pages serve os arquivos direto do repositório, sem pipeline de build.

## Regras específicas deste projeto

- **Nunca renomear ou mover** `EuNunca-Privacy.html` e `OConselheiro-Privacy.html` — são as políticas de privacidade linkadas nas fichas dos apps Flutter (`EuNuncaApp`, `OConselheiro`) na Play Store/App Store. Mudança de path quebra o link nas lojas.
- Paleta em `assets/css/main.css` via CSS custom properties (`--accent-color`, `--heading-color`, etc. em `:root` + overrides em `.light-background`/`.dark-background`) — mudar cor do site inteiro é só editar essas variáveis, não precisa caçar cor hardcoded pelo CSS.
- Site **bilíngue (PT-BR/EN)** — todo texto visível fica em `index.html` marcado com `data-i18n="chave"`, e a tradução de cada chave vive em `assets/js/i18n.js` (objeto `dict.en`/`dict.pt`). **Ao adicionar ou editar texto na página, sempre adicionar a chave correspondente nos dois idiomas do dicionário** — nunca deixar texto novo sem `data-i18n`, ou ele não muda ao trocar de idioma. Detecção inicial por `navigator.language`, override manual persistido em `localStorage` (`site_lang`).
- Site com **tema claro/escuro** — toggle persiste em `localStorage` (`site_theme`), com detecção inicial por `prefers-color-scheme`. O tema é setado via atributo `data-theme` na tag `<html>` por um script inline no `<head>` (antes do CSS carregar, pra não piscar o tema errado) — esse script inline não pode ser removido/movido. Cores do tema escuro ficam em `assets/css/main.css` no bloco `:root[data-theme="dark"]`; **ao adicionar cor nova, sempre usar uma CSS custom property** (nunca cor hardcoded), senão ela não se adapta entre os temas.
- Conteúdo bilíngue mantém o mesmo tom em ambos os idiomas (site direcionado tanto a recrutadores dos EUA quanto à rede de contatos no Brasil).
- Projetos client/privados (ex.: Lumus Care, Inara Studio Tee) aparecem no Portfólio **sem link** (são projetos privados de cliente) — só descrição. Não inventar link de GitHub/demo pra projeto que não tem repositório público.
- Sem tela de admin, sem backend — qualquer "atualização de conteúdo" é edição direta do `index.html` (+ `assets/js/i18n.js` se for texto visível).

## Estrutura

```
index.html                    → página única (hero, about, skills, resume, portfolio)
EuNunca-Privacy.html          → privacy policy (não mover)
OConselheiro-Privacy.html     → privacy policy (não mover)
docs/                          → PDFs (currículo, artigos, apresentações)
assets/css/main.css            → estilos + variáveis de tema (claro/escuro)
assets/js/main.js              → comportamento (isotope filter, AOS, typed.js, etc.)
assets/js/i18n.js              → dicionário de tradução PT/EN + lógica de troca de idioma
assets/js/theme.js             → lógica do toggle de tema claro/escuro
assets/vendor/                 → bibliotecas de terceiros vendorizadas
```

## Publicar

`git push` para `main` já publica no GitHub Pages — sem CI/build.
