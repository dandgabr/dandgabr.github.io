# dan.seg.br — Amiga Workbench Portfolio

Portfolio pessoal de **Daniel Gonçalves Araujo** (@dandgabr), Arquiteto de Segurança da Informação.
Publicado em **[dan.seg.br](https://dan.seg.br)** via GitHub Pages.

O site é um **Amiga Workbench clássico**: cada seção do portfólio é uma "aplicação"
numa janela sobre um desktop azul chapado, navegável por uma dock. Sem backend, sem
passo de build, sem dependências em tempo de execução além de um Driver.js vendorizado.

---

## Como rodar localmente

Módulos ES são bloqueados em `file://`, então abrir o `index.html` com duplo clique
**não funciona**. Sirva por HTTP:

```bash
python3 -m http.server 8080
# abra http://localhost:8080/
```

## Testes

Suíte sem dependências, usando o test runner nativo do Node (>= 22):

```bash
node --test
```

> Use `node --test` sem argumentos. `node --test tests/` falha no Node 22, que
> removeu a expansão de diretórios; ela só voltou no Node 26.

42 testes cobrem as invariantes que os revisores consideraram críticas: a paleta
RGB444, a paridade das três traduções, a pureza do roteador e seus aliases, o
registro de comandos do Shell, os dados dos projetos e as metas do tour.

---

## Arquitetura

O conteúdo das aplicações vive **estático no `index.html`** e o JavaScript apenas
alterna visibilidade e gerencia estado. O motivo é deliberado: mantém o LCP como
texto puro, preserva a degradação sem JavaScript e evita que uma mudança de
conteúdo exija mexer em lógica.

```
index.html          markup estático das 7 janelas, desktop, dock, modal e Prefs
amiga.css           tema completo: paleta, biséis, tipografia e superfícies
theme-init.js       script clássico pré-paint (tema, CRT, idioma) — nunca um módulo
main.js             bootstrap único; importa e liga todos os módulos
router.js           roteamento por hash e aliases legadas (puro, testável)
dock.js             dock: aria-current e tabindex rotativo sobre markup estático
windows.js          troca de janela e gestão de foco
i18n.js             dicionário PT-BR / EN / ES (192 chaves por idioma)
terminal.js         Shell interativo com registro de comandos
projects.js         grade de projetos, filtros e modal com deep-link
projects-data.js    dados dos projetos + acessor compartilhado com o Shell
prefs.js            aplicação de preferências (idioma, CRT, replay do tour)
tour.js             tour de primeira visita com Driver.js vendorizado
vendor/driver/      Driver.js 1.8.0 (MIT), servido do próprio domínio
assets/fonts/       Unscii (domínio público) e Terminus (SIL OFL)
tests/              suíte `node --test`
```

### As sete aplicações

| App | Conteúdo |
| --- | --- |
| `intel` | Perfil, cargo atual na Dasa e os três cargos anteriores em segurança |
| `skills` | Cinco domínios técnicos |
| `projects` | Nove repositórios públicos em destaque, com filtros e modal |
| `academic` | CompTIA, três pós-graduações, bacharelado e docência |
| `connect` | LinkedIn e GitHub |
| `shell` | Terminal interativo |
| `prefs` | Idioma, scanlines CRT e replay do tour |

### Rotas

Roteamento por hash, sem reescrever a URL na carga inicial:

```
#/intel              #/projects             #/shell
#/skills             #/projects/<id>        #/prefs
#/academic           #/connect
```

Aliases legadas (`#/credentials`, `#/contact`, `#/terminal`) resolvem para a
aplicação correta, para que links antigos não morram.

---

## Decisões de projeto

Estas foram escolhas deliberadas, não acidentes:

- **Um app por vez.** Sem janelas arrastáveis ou sobrepostas — é o modelo que
  mantém a metáfora legível no celular e dispensa biblioteca de janelas.
- **Só tema escuro.** A paleta Amiga clássica não tem variante clara; o controle
  de tema foi removido em vez de inventar uma.
- **Apenas cores RGB444.** Todo hex no CSS precisa ser representável no espaço de
  12 bits do Amiga. Um teste reprova qualquer cor fora disso.
- **Biséis, não gradientes.** Superfícies elevadas usam bisel de 2px; sombreado
  usa dither de 1px. Sem brilho, vidro, blur ou cantos arredondados.
- **Laranja nunca é texto de corpo** (2,39:1 sobre branco). É cor de moldura,
  régua e destaque.
- **Sem `unsafe-inline`.** Script pré-paint externo e zero `style=` no markup
  deixam o CSP restrito a `'self'` — coerente com o posicionamento em segurança.
- **Sem easter eggs de rede.** Os comandos que faziam `fetch` para host arbitrário
  foram removidos; o CSP os proibia de qualquer forma.
- **Fontes livres.** A Topaz da Commodore está no Kickstart, protegida por
  copyright, e não é embutida. Usamos Unscii (domínio público) com Terminus (OFL).

---

## Acessibilidade

Meta é WCAG 2.2 AA. O que está de fato implementado:

- Anel de foco duplo (2px branco interno + 2px preto externo), visível sobre azul,
  cinza e laranja.
- Dock como `<nav>` de links reais, com `tabindex` rotativo e navegação por setas.
- Troca de janela move o foco para o título e anuncia por uma região `aria-live`.
- Controles com área mínima de 24×24 CSS px.
- `prefers-reduced-motion` e `prefers-reduced-transparency` respeitados.
- Suporte completo a teclado; nenhuma ação exige mouse.

---

## Conteúdo

As informações de perfil, formação e experiência são mantidas à mão em `i18n.js`
(nos três idiomas) e `projects-data.js`. Ao atualizar:

1. Edite as **três** locales — um teste de paridade reprova chaves desiguais.
2. Rode `node --test`.
3. Rode os greps de verificação: sem `hardening-ia`, sem emoji de cor, paleta legal.

---

## Licença

Código sob MIT. As fontes mantêm suas licenças: Unscii é domínio público e
Terminus é SIL OFL 1.1. Driver.js é MIT, com o aviso preservado em `vendor/driver/`.
