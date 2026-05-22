# CSU Internship Hub

CSU Internship Hub is a web-based internship guidance and peer-support platform for students in the School of Resources and Safety Engineering at Central South University. It focuses on three discipline areas: Safety Engineering, Mining Engineering, and Urban Underground Space Engineering.

The current version uses an automated feed pipeline: GitHub Actions runs a scheduled scraper, collects public internship-related results from social media and employment websites, writes them into `data/feeds.json`, and the website reads that JSON file to display a clear, searchable information feed.

## What It Collects

The automated pipeline is configured around three majors:

- Safety Engineering
- Mining Engineering
- Urban Underground Space Engineering

It attempts to collect public information from:

- Xiaohongshu
- Douyin
- Bilibili
- Shixiseng
- Zhaopin
- 51job
- Yingjiesheng
- Liepin

The platform keeps titles, short summaries, source names, categories, major tags, and original URLs. It does not copy full social media posts, comments, images, or private user information.

## Core Features

- **Automated information feed**: Reads `data/feeds.json` and displays collected internship items directly on the website.
- **Scheduled scraping**: GitHub Actions runs the scraper every day and can also be triggered manually.
- **Three-major classification**: Items are grouped under Safety Engineering, Mining Engineering, and Urban Underground Space Engineering.
- **Source categories**: Items are separated into employment-site resources and social-media experience resources.
- **Search and filters**: Users can filter by keyword, major, and source category.
- **Original-source links**: Every item links back to the original website or platform for verification.
- **Community section**: Students can still publish their own internship experiences through the existing Supabase-backed community.
- **Fallback handling**: If a platform blocks automated parsing, the scraper keeps the source search page as a fallback entry so users can still open the original platform.

## Architecture

| Layer | Implementation |
| --- | --- |
| Frontend | Single-file React app in `index.html` |
| Styling | Tailwind CSS via CDN and custom CSS |
| Community Data | Supabase `posts` table |
| Automated Data | `data/feeds.json` |
| Scraper | `scripts/update-feeds.mjs` |
| Scheduler | `.github/workflows/update-feeds.yml` |
| Runtime | Node.js 20 on GitHub Actions |

## How the Scraper Works

1. The workflow runs on a daily schedule or through manual dispatch.
2. `npm run scrape` executes `scripts/update-feeds.mjs`.
3. The script visits configured search URLs for each major and source.
4. It extracts public link titles when available.
5. It classifies each item by major and source type.
6. It writes the result to `data/feeds.json`.
7. The workflow commits the updated JSON file back to the repository.
8. The website reads `data/feeds.json` and displays the latest feed.

## Important Notes

Some platforms, especially Xiaohongshu and Douyin, may restrict automated access or render content dynamically. The scraper is designed to degrade gracefully:

- if item-level extraction works, it displays extracted titles and links;
- if item-level extraction is blocked, it preserves the original search page as a fallback;
- the website always links users back to the original platform for verification.

This keeps the platform suitable for public release while still providing automatic information aggregation.

## Usage

Open `index.html` directly or deploy the repository through GitHub Pages.

To update feeds manually:

```text
GitHub -> Actions -> Update internship feeds -> Run workflow
```

To run locally with Node.js 20+:

```bash
npm run scrape
```

## Research Relevance

This project can be positioned as a practice-based research prototype for PhD applications in engineering education, educational technology, human-computer interaction, digital learning environments, and career readiness support.

Potential research themes include:

- automated aggregation of informal internship information;
- discipline-specific career support systems for engineering students;
- social media link curation for informal learning;
- peer knowledge sharing and experience transfer in higher education;
- data-informed analysis of students' internship concerns and preparation behavior.

## Future Work

- Add a server-side crawler with stronger rendering support for dynamic pages.
- Store collected social media links in Supabase for moderation and shared editing.
- Add duplicate detection using richer URL normalization and semantic similarity.
- Add a moderation dashboard for public feed curation.
- Add analytics for trending majors, keywords, platforms, and career concerns.
- Conduct usability testing with students from the three target majors.
