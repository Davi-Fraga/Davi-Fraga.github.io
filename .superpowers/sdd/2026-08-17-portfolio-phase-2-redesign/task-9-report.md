# Task 9 Report — Case page transition and reading progress

## Status

Concluída no worktree `C:\Dev\Portifolio-DaviFraga\.worktrees\portfolio-phase-2`, sem commit, push, PR ou subagentes.

## Implementação

- Criado `components/cases/case-reading-progress.tsx` com `CaseReadingProgress({ targetId, label? })`.
- Adicionado contrato `role="progressbar"`, `aria-valuemin="0"`, `aria-valuemax="100"` e `aria-valuenow` inteiro.
- Progresso calculado relativamente a `#case-content` e atualizado por um listener passivo de scroll limitado por `requestAnimationFrame`.
- Cleanup remove o listener e cancela o RAF pendente.
- Barra visual usa `transform: scaleX()` com origem à esquerda; não anima largura.
- Integrado `CaseReadingProgress targetId="case-content"` e `id="case-content"` sem alterar metadata, SEO, conteúdo, ordem editorial ou navegação para o próximo projeto.
- Entrada editorial usa opacity e `translateY(8px)` por 400ms; reduced motion força conteúdo imediatamente visível e sem transform.
- A página de case não renderiza `[data-signature="true"]` nem `[data-architecture-diagram]`.
- Nenhum arquivo em `data/*` foi modificado.

## TDD

### RED

Comando:

```powershell
npm run build
npx playwright test e2e/motion.spec.ts
```

Os contratos novos falharam pelos motivos esperados: progressbar e `#case-content` ausentes. A execução paralela também apresentou timeouts de navegação preexistentes por contenção no servidor desktop; os testes mobile carregaram normalmente.

### GREEN focado

Comando:

```powershell
npm run build
npx playwright test e2e/motion.spec.ts --grep "case reading progress|case pages do not repeat|shows case content immediately" --workers=1
```

Resultado: `6 passed` em desktop e mobile.

## Gates

- `npm run lint`: aprovado com 0 erros e 5 warnings preexistentes.
- `npm run typecheck`: aprovado.
- `npm run build`: aprovado.
- `npx playwright test e2e/portfolio.spec.ts e2e/accessibility.spec.ts e2e/motion.spec.ts --workers=1`: `69 passed`, `11 skipped`, `0 failed`.

## Preocupações

- O build alerta que o Next.js detectou lockfiles no repositório principal e no worktree e inferiu o root pelo lockfile principal.
- O build informa que validação TypeScript é ignorada pela configuração existente; o gate separado de typecheck passou.
- O lint mantém cinco warnings fora do escopo da Task 9: dois já existentes na página de case e três em UI/toast.
- A suíte motion paralela no RED sofreu contenção e timeouts de `page.goto`; o gate final foi executado serialmente e passou integralmente.

## Fix round 1

### Localização

Correção executada no worktree absoluto `C:\Dev\Portifolio-DaviFraga\.worktrees\portfolio-phase-2`.

### Causa raiz e correção

- O cálculo anterior forçava `target.offsetHeight - window.innerHeight` para no mínimo `1`, fazendo targets menores que o viewport saltarem para 100% após qualquer deslocamento positivo.
- O cálculo agora trata explicitamente targets maiores e menores/iguais ao viewport, início, fim e clamp entre 0 e 100.
- Para target que cabe inteiro no viewport, o contrato é 0 antes do topo e 100 quando o topo é alcançado.
- `resize` usa o mesmo scheduler de scroll, mantendo no máximo um RAF pendente.
- Cleanup remove listeners de scroll e resize e cancela o RAF pendente.
- A barra continua atualizando apenas `transform: scaleX()`; o teste confirma que `style.width` não é mutado.
- Nenhum arquivo em `data/*` foi alterado.

### TDD

O RED reproduziu deterministicamente o salto incorreto para target curto e a ausência de recálculo após resize. Após a correção, os contratos cobrem:

- zero no início;
- crescimento durante leitura;
- 100 no fim;
- clamp 0–100;
- target maior que o viewport;
- target menor/igual ao viewport;
- recálculo após resize;
- atualização visual por `scaleX` sem mutação de width.

### Gates do Fix round 1

- `npx playwright test e2e/motion.spec.ts --workers=1`: `43 passed`, `11 skipped`, `0 failed`.
- `npx playwright test e2e/portfolio.spec.ts --workers=1`: `20 passed`, `0 failed`.
- `npm run lint`: aprovado com 0 erros e 5 warnings preexistentes.
- `npm run typecheck`: aprovado.
- `npm run build`: aprovado.

### Preocupações do Fix round 1

- O build mantém o warning de múltiplos lockfiles e root inferido pelo Next.js.
- O build mantém a validação TypeScript desabilitada na configuração existente; o typecheck separado passou.
- Permanecem cinco warnings de lint preexistentes e fora deste fix.
