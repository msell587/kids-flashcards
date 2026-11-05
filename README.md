# Let's Learn! English flashcards for children aged 3 to 6

A bilingual (English and Spanish) set of flashcards, listening games, printable sheets and teacher lesson plans. It works in any web browser and can be installed to a phone or tablet so it works offline.

> **Status:** work in progress. This README is a skeleton. Screenshots, architecture notes and before-and-after numbers will be added as the project develops.

## Live demo

[https://lets-learn-flashcards.netlify.app](https://lets-learn-flashcards.netlify.app)

## Features

- Flashcards for each topic, with English and Spanish words and example sentences
- Listening and picture games
- Printable colouring sheets and worksheets
- Teacher's corner with lesson plans, songs, games and crafts
- Installable web app that works offline after the first visit
- Options to hide Spanish, hide words or hide sentences, remembered on the device

## Privacy

The app does not collect information about children. It has no accounts and no sign-up, and it does not send any information about children anywhere. Details are on the [privacy page](privacy.html).

## Image sources and licences

All pictures were made with AI image tools (Midjourney or Canva), according to the author. None is a stock photo or a photo of a real child. The sources and the licence checks are listed in [PHOTO-SOURCES.md](PHOTO-SOURCES.md). The licence checks are not complete yet.

## Getting started

You need [Node.js](https://nodejs.org/) (version 20 or newer) and npm.

```bash
npm install
npm run dev       # start a development server
npm run build     # build the site into dist/
npm run preview   # serve the built site to check it
```

## Project layout

| Path | What it holds |
|---|---|
| `*.html` | One page per topic, game and printable, plus the home page and the teacher's corner |
| `flashcards.js`, `game-common.js`, `game.js` | Shared behaviour for the flashcard and game pages |
| `topics.js`, `teacher-content.js` | Content data: topics, words, sentences and lesson plans |
| `theme.css`, `style.css`, `teacher.css` | Styles |
| `sw.js`, `pwa.js`, `manifest.webmanifest` | Offline support and install settings |
| `images/`, `icons/`, `printables/` | Pictures and printable files |
| `vite.config.js` | Build settings: every HTML page is built, and static files are copied across |

## Planned work

- Consolidate the topic pages into one template generated from the data
- Move inline scripts into modules
- Add TypeScript, tests (Vitest and Playwright), linting and continuous integration
- Optimise images and check accessibility

## Licence

_To be decided by the author._
