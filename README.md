# Feathr Takehome

## Getting Started

**Prerequisites:** Node.js installed

1. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

2. Start the dev server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. Open the URL shown in your terminal (usually `http://localhost:5173`)

## Other Commands

- `npm test` / `yarn test` — run tests

## Features Implemented

- **Multi-tab browser** — Browse Star Wars People, Planets, and Starships data from the SWAPI API across three tabs
- **Search** — Filter results by name within each tab; resets when switching tabs
- **Expandable detail cards** — Each item has a collapsible section showing related data (homeworld, films, crew, etc.), fetched on demand using React Query
- **Dark/Light theme toggle** — Header button to switch themes, persisted to localStorage. Note: this was added as a custom example using a React Context (`src/context/ThemeContext.tsx`), however Chakra UI has built-in color mode support that handles this out of the box via the `useColorMode` hook in `src/components/ui/color-mode.tsx`
- **Accessibility** — ARIA labels, `aria-live` regions, semantic HTML, and keyboard navigation throughout

## Approach

The goal was to keep things simple while making sure all core requirements were met. I focused on displaying good React patterns through composition, reusable components, and custom hooks. I wanted to keep performance in mind by only fetching data when a tab is selected, or a card is expanded, avoiding unnecessary network requests on the initial load. Test coverage was also a priority to ensure the core functionality is reliable.

# AI in My Workflow

# 1. Which AI tools you used (e.g., GitHub Copilot, ChatGPT, Claude, Cursor, etc.)

For this project, the only AI tool I used was Claude Code via the terminal.

# 2. Specific examples of how AI helped you — code generation, debugging, architecture decisions, writing tests, etc.

Claude Code was a vital piece of my workflow when working on this assignment. From the very beginning when I was creating the project with all the dependencies, and working on each requirement that was part of the assignment, I would initiate the process with Claude
and then make any changes that I felt were appropriate. It was really useful for scaffolding boilerplate quickly, like generating TypeScript types to match the Star Wars API response shapes and setting up React Query fetchers, so I could stay focused on the higher level architecture decisions. 

# 3. Where you pushed back on or corrected AI output, and why

There was one key moment where I really had to push back on the result generated from Claude. It was when I asked Claude to setup the Chakra provider scaffolding after the dependency was installed. For some reason, Claude kept to providing set up instructions for an older version of the library, so it was not setting up correctly based on the version that was installed. I asked Claude to apply the code for the correct version, but it was struggling to do so. I ended up having to manually setup Chakra myself.

# 4. How AI shaped your overall approach or development speed

AI has significantly accelerated my development speed. Instead of context switching to look up syntax or boilerplate, I could stay focused on the actual implementation and logic. This has shifted my overall approach because I can spend more time thinking about architecture and design decisions rather. I really like using Claude Code via the terminal in the directory because it can have complete context of the files, so it adds another level of efficiency. 

# Any challenges faced and how you resolved them

The biggest challenges were around the initial scaffolding of the project, where I ran into some friction getting everything configured correctly. For example, Chakra UI setup required referencing the docs directly to resolve. Another challenge was making sure the 
TypeScript types were clean, reusable, and correctly matched across the hooks and API layer. Once those foundations were solid though, the rest of the implementation came together pretty smoothly.

# Areas for future improvement

A few areas that could enhance the project would be adding skeleton loaders for a more polished loading experience rather than a simple spinner. It would also be interesting to add cross resource navigation. For example, if a person's home world is listed in 
their info card, clicking it could navigate directly to that planet's data rather than requiring the user to find it manually. This kind of linked navigation would make the explorer feel much more connected and intuitive. 

Another improvement could be introducing dedicated resource pages, so clicking a card navigates to a full page with more detailed data about that resource rather than expanding inline. Additionally, expanding the filtering options beyond just search such as alphabetical sorting A-Z or Z-A and filtering by resource type would give users more control over how they explore the data.
