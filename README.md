# GovTech DCube Developer Applicant Coding Challenge

This is a submission for the [GovTech DCube Developer Applicant Coding Challenge](https://gist.github.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf).

## 💻 Table of Contents

- 🔗 Deployments: TODO
- 🗄️ [Project Structure](#project-structure)
- ⚙️ [Installation](#installation)
- 🚄 [Run the App](#run-the-app)
- 🧪 Run Unit Tests: TODO
- 🧱 [Technologies Used](#technologies-used)
- 📷 Preview: TODO
- 📝 [Assumptions](#assumptions)

<h2 id="project-structure">🗄️ Project Structure</h2>

```
src
├── components                    # shared components
│   ├── layout                    # layout components which define the page's layout
│   │   ├── Banner.tsx            # is the top-most banner containg logo
│   │   ├── Container.tsx         # limits the max width of elements
│   │   ├── Header.tsx            # is the Hader with Sarch Form
│   │   └── Layout.tsx            # is the overall Layout of the pages
│   ├── search                    # contains components related to search feature
│   │   ├── SearchForm.tsx        # handles search form UI and events
│   │   ├── SearchResult.tsx      # handles search result
│   │   ├── SearchResultItem.tsx  # handles search result item
│   │   └── SearchSuggestion.tsx  # handles search suggestion list
│   └── ui                        # contains shared common UI components
│       ├── HighlightedText.tsx
│       └── LoadingSpinner.tsx
├── hooks
│   └── use-request.ts
├── index.css                     # global css
├── interface                     # interfaces of data received from api
│   ├── document.ts
│   └── suggestion.ts
├── lib
│   └── util.tsx                  # contains utility functions like merge classname
├── main.tsx                      # handles routing logic
├── pages                         # contains pages displayed by routes
│   ├── Landing.tsx               # is the Landing page, routed by /
│   └── SearchResult.tsx          # is the SearchResult page, routed by /search-result
└── vite-env.d.ts
```

<h2 id="installation">⚙️ Installation</h2>
- Node.js (version 18 and above)
- npm (comes with NodeJS)

1. Clone the repository

   ```bash
   git clone git@github.com:trungnd3/dcube-search.git
   cd dcube-search
   ```

2. Install dependencies

   ```bash
    npm install
   ```

<h2 id="run-the-app">🚄 Run the App</h2>

This will start a development server on port 5173 by default.

```bash
npm run dev
```

Open your browser and go to http://localhost:5173 (vite serves the app by default on port 5173)

<h2 id="technologies-used">🧱 Technologies Used</h2>

- **Frontend**: ReactJS, Typescript, TailwindCSS
- **Build tool**: Vite
- **Testing tool**: React Testing Library, Jest

<h2 id="assumptions">📝 Assumptions</h2>

- Each suggestion needs to highlights all words in the search string individually.
- The mock data for query result only highlights the word 'child'. An additional filter has been added to dynamically change the highlights array to match the actual search word.
- If a user search has multiple words and they all have synonyms, only the synonyms of the first word is used to generate the extra suggestion list. This is to keep things simple.
