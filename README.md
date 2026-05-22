# CSU Internship Hub

CSU Internship Hub is a class-facing internship information and peer-support website for students in the School of Resources and Safety Engineering at Central South University. It focuses on three discipline areas: Safety Engineering, Mining Engineering, and Urban Underground Space Engineering.

The public site is designed for classmates: it shows searchable internship information, original-source links, discipline tags, and peer experience posts. The builder and maintainer is **Da Bai (大白)**.

## Public Website

The website helps students quickly find and compare public internship-related information from:

- Xiaohongshu
- Douyin
- Bilibili
- Shixiseng
- Zhaopin
- 51job
- Yingjiesheng
- Liepin

The public page keeps only titles, short summaries, source names, categories, major tags, and original URLs. It does not copy full posts, comments, images, passwords, or private user information.

## Core Features

- **Classmate-facing UI**: The homepage is written for students rather than developers.
- **Three-major filtering**: Safety Engineering, Mining Engineering, and Urban Underground Space Engineering.
- **Searchable internship feed**: Students can search by keyword, platform, company, interview experience, or technical direction.
- **Original-source links**: Every item links back to the original platform for verification.
- **Peer experience section**: Students can publish internship reflections through the Supabase-backed community section.
- **Maintainer credit**: The site clearly identifies Da Bai (大白) as the builder and maintainer.
- **Admin console**: `admin.html` is separated from the public website for maintenance tasks.

## Admin Console

`admin.html` is the private maintenance entry for Da Bai. It is intended for:

- checking feed statistics;
- reviewing community posts;
- viewing user profiles;
- viewing login records.

User and login information should not be shown on the public frontend. To enable the admin console safely, run `docs/admin-setup.sql` in the Supabase SQL Editor, then add Da Bai's Supabase Auth user id to `admin_users`.

```sql
insert into public.admin_users (user_id)
values ('YOUR_AUTH_USER_UUID')
on conflict do nothing;
```

Supabase Auth email login must also be enabled. The frontend uses the publishable anon key only; do not place a Supabase service-role key in `index.html` or `admin.html`.

## Automated Feed Pipeline

| Layer | Implementation |
| --- | --- |
| Public frontend | Single-file React app in `index.html` |
| Admin frontend | Single-file React app in `admin.html` |
| Styling | Tailwind CSS via CDN and custom CSS |
| Community data | Supabase `posts` table |
| Admin data | Supabase `profiles`, `login_events`, `admin_users` tables |
| Automated feed data | `data/feeds.json` |
| Scraper | `scripts/update-feeds.mjs` |
| Scheduler | `.github/workflows/update-feeds.yml` |
| Runtime | Node.js 20 on GitHub Actions |

The scheduled workflow runs daily and can also be triggered manually:

```text
GitHub -> Actions -> Update internship feeds -> Run workflow
```

Local update command:

```bash
npm run scrape
```

## Compliance Notes

Some platforms, especially Xiaohongshu and Douyin, may restrict automated access or render content dynamically. The scraper degrades gracefully:

- if item-level extraction works, it displays extracted titles and links;
- if extraction is blocked, it preserves the original search page as a fallback;
- the website always sends users back to the original platform for details.

This keeps the project suitable for public release while avoiding unnecessary copying of platform content.

## Research Relevance

This project can be positioned as a practice-based research prototype for PhD applications in engineering education, educational technology, human-computer interaction, digital learning environments, and career readiness support.

Potential research themes include:

- automated aggregation of informal internship information;
- discipline-specific career support systems for engineering students;
- social media link curation for informal learning;
- peer knowledge sharing and experience transfer in higher education;
- privacy-aware student support platforms;
- data-informed analysis of students' internship concerns and preparation behavior.

## Future Work

- Add stronger server-side rendering support for dynamic platforms.
- Add moderation workflows for public peer posts.
- Add duplicate detection using richer URL normalization and semantic similarity.
- Add administrator-only analytics for trending majors, keywords, platforms, and career concerns.
- Conduct usability testing with students from the three target majors.
