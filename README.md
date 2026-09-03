# Can or Cannot? — The Singapore Showdown

A host-led Singapore trivia game for two teams, built for a live hawker-food session with La Trobe University colleagues.

**Live game:** https://hareshsuppiah.github.io/can-or-cannot-singapore-showdown/

## Game format

- 5 player-selected themes with 20 sourced questions each: hawker food, Singlish, Singapore sport, pop culture, and inventions plus Australia–Singapore links.
- The host asks the players to choose a theme, then selects it on the category board.
- Two representatives face off at a time.
- Representatives yell their team name: **Kopi** or **Tea** by default.
- The host selects the team that called first, then enters the spoken answer: A, B, C or D.
- A correct answer earns 100 points automatically.
- A wrong answer automatically hands the other team one attempt to steal the same 100 points; no second buzz is required.
- Each theme has one 30-second countdown. It starts automatically, pauses on a buzz, and resumes on the next question without resetting.
- When the theme clock reaches zero, a clear time-up panel lets the host add another 30 seconds or end the theme and choose another.
- Built-in game-show cues distinguish buzz-ins, correct answers, wrong answers and time-outs.
- Each question includes a short explanation and a source link.
- Host settings includes a teacher-facing class performance report across eight learning areas, with team comparisons and steal statistics.
- Performance results persist in the same browser until the host selects **Start new group · clear results**.

## Host controls

| Action | Mouse/touch | Keyboard |
| --- | --- | --- |
| Select first team | Team button | `1` or `2` |
| Enter answer | A–D button | `A`, `B`, `C` or `D` |
| Enter automatic steal | A–D button after the steal banner appears | `A`, `B`, `C` or `D` |
| Pause or resume countdown | Timer control | `Space` |
| Reveal without scoring | Reveal answer | `R` |
| Move to next question | Next | `→` |

## Run locally

```bash
npm ci
npm run validate
npm run dev
```

For a production build:

```bash
npm run build
npm run preview
```

## Question bank

Questions are stored in [`src/questions.js`](src/questions.js). Every question requires:

- a unique topic ID so paraphrased duplicates cannot slip back in;
- four answer options;
- one answer index from 0 to 3;
- one teacher-facing performance category;
- a concise explanation; and
- a reliable source URL.

Run `npm run validate` before submitting changes. Question suggestions and corrections are welcome through the repository's issue templates.

## Deployment

Pushes to `main` are validated, built and published automatically by [GitHub Actions](.github/workflows/deploy-pages.yml).

## Licensing

- Application code: [MIT License](LICENSE)
- Original trivia questions and explanatory text: [Creative Commons Attribution 4.0](LICENSE-CONTENT.md)

Third-party sources remain the property of their respective owners and are linked for verification.
