# 💫 Creatorverse — The Iron Index

Submitted by: **Eli Khurgin**

**Creatorverse — The Iron Index** is a gym-themed content creator directory. It ships with five lifters, coaches, and champions worth following, and gives you full CRUD control over the roster: add creators, edit them, and cut the dead weight.

Time spent: **X** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **A logical components structure in React is used to create the frontend of the app**
- [x] **At least five content creators are displayed on the homepage of the app**
- [x] **Each content creator item includes their name, a link to their channel/page, and a short description of their content**
- [x] **API calls use the async/await design pattern via Axios or fetch**
- [x] **Clicking on a content creator item takes the user to their details page, which includes their name, url, and description**
- [x] **Each content creator has their own unique URL**
- [x] **The user can edit a content creator to change their name, url, or description**
- [x] **The user can delete a content creator**
- [x] **The user can add a new content creator by entering a name, url, or description and then it is displayed on the homepage**

The following **optional** features are implemented:

- [x] Picocss is used to style HTML elements
- [x] The content creator items are displayed in a creative format, like cards instead of a list
- [x] An image of each content creator is shown on their content creator card

The following **additional** features are implemented:

- [x] Custom "Dark Iron" theme layered over Pico CSS — near-black canvas, steel panels, single amber accent, Bebas Neue display type
- [x] Graceful image fallback: any creator without an `imageURL` renders a gradient monogram tile instead of a broken image
- [x] Broken image links are caught at runtime (`onError`) and fall back to the monogram
- [x] Shared `CreatorForm` component powers both Add and Edit, with inline validation and a live image preview
- [x] Setup notice screen that walks you through connecting Supabase if `.env` isn't configured yet
- [x] Loading, empty, error, and 404 states
- [x] Confirmation dialog before any delete
- [x] Fully responsive layout

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<!-- Replace this with your GIF or video link -->
`TODO: add walkthrough GIF`

GIF created with [LiceCap](https://www.cockos.com/licecap/).

## Getting Started

```bash
npm install
```

### 1. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor → New query**, paste in [`supabase/schema.sql`](supabase/schema.sql), and run it. This creates the `creators` table, disables RLS, enables Realtime, and seeds the five creators.
3. Copy your credentials from **Project Settings → API**.

### 2. Add your environment variables

```bash
cp .env.example .env
```

Then fill in:

```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

### 3. Run it

```bash
npm run dev
```

## Project Structure

```
src/
├── client.js                 Supabase client + config check
├── App.jsx                   Routes (useRoutes), header/footer shell, fetches all creators
├── index.css                 Dark Iron theme
├── components/
│   ├── Card.jsx              Creator card with image/monogram fallback
│   ├── CreatorForm.jsx       Shared form for Add + Edit
│   └── SetupNotice.jsx       Shown when Supabase isn't configured
└── pages/
    ├── ShowCreators.jsx      /            — all creators
    ├── ViewCreator.jsx       /creator/:id — single creator + delete
    ├── EditCreator.jsx       /edit/:id    — update + delete
    ├── AddCreator.jsx        /new         — create
    └── NotFound.jsx          *            — 404
```

## Routes

| Path           | Page           | Purpose                          |
| -------------- | -------------- | -------------------------------- |
| `/`            | `ShowCreators` | Card grid of every creator       |
| `/creator/:id` | `ViewCreator`  | Single creator detail + delete   |
| `/edit/:id`    | `EditCreator`  | Pre-filled update form + delete  |
| `/new`         | `AddCreator`   | Create a new creator             |

## Notes

Descriptions and channel URLs in the seed file are starting points — verify each link and swap in your own copy and image URLs before submitting. Creators without an `imageURL` render as a styled monogram tile, so the layout stays intact either way.

## License

    Copyright 2026 Eli Khurgin

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
