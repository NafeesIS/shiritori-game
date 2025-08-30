# Multiplayer Shiritori Game

**Multiplayer Shiritori Game** is a two-player word-chain game built with [Next.js](https://nextjs.org). Players take turns entering words starting with the last letter of the previous word. The game validates words using [DictionaryAPI](https://dictionaryapi.dev/), enforces rules (minimum 4 letters, no repetition, last-letter match), includes a countdown timer, tracks scores, and displays word history.

Live Demo: https://shiritori-game-eosin-xi.vercel.app/

## Features

* Two-player turn-based gameplay
* Word validation using DictionaryAPI
* Last-letter and minimum 4-letter rule enforcement
* Countdown timer for each turn
* Score tracking for each player
* Word history display to avoid repetition
* Clean, responsive UI built with Next.js


## How to Play

1. Two players take turns entering words.
2. Each new word must:

   * Start with the last letter of the previous word
   * Be at least 4 letters long
   * Not repeat any previous word
   * Be a valid English word (DictionaryAPI)
3. Each player has 10 seconds per turn.
4. Correct word = +1 point, invalid word or timeout = -1 point
5. Word history is displayed to prevent repetition

---

## Tech Stack

* [Next.js](https://nextjs.org)
* React Hooks (useState, useEffect)
* Tailwind CSS (optional for styling)
* [DictionaryAPI](https://dictionaryapi.dev)



