# CSU Internship Hub

CSU Internship Hub is a web-based internship guidance and peer-support platform designed for students in the School of Resources and Safety Engineering at Central South University. It focuses on three discipline areas: Safety Engineering, Mining Engineering, and Urban Underground Space Engineering.

The project addresses a common problem in engineering education: internship information is often scattered across informal chats, recruitment websites, senior students' personal notes, and short-lived social media posts. CSU Internship Hub turns these fragmented resources into a structured, searchable, and discipline-specific support platform.

## Current Release

The current version has been upgraded from a simple prototype into a more publishable single-page web application. It now includes a mature landing dashboard, discipline-specific guidance, a peer community, automatic post classification, and an internship resource radar that helps collect and organize public internship links for the three majors.

## Core Features

- **Release-ready dashboard**: Provides a clearer entry point with platform positioning, community statistics, latest posts, and posting quality standards.
- **Three-major structure**: Organizes content around Safety Engineering, Mining Engineering, and Urban Underground Space Engineering.
- **Guidance hub**: Summarizes preparation pathways, resume readiness, interview strategy, and major-specific skills.
- **Peer community**: Supports posting, searching, liking, commenting, image upload, and PDF preview.
- **Automatic post classification**: Existing and newly published posts are automatically grouped by major and content type based on keywords.
- **Internship resource radar**: Attempts to fetch public internship-related postings from external recruitment pages and organizes them by the three majors. If a website restricts cross-site crawling, the platform keeps a verified search entry so users can open the original source directly.
- **Publication safeguards**: Adds clearer quality requirements for public posts and reminds users to avoid uploading sensitive personal information.

## Research Relevance

This project can be positioned as a practice-based research prototype for PhD applications in engineering education, educational technology, human-computer interaction, digital learning environments, and career readiness support.

Potential research themes include:

- digital support systems for engineering students' career development;
- peer knowledge sharing and experience transfer in higher education;
- discipline-specific information organization for internship preparation;
- lightweight web platforms for student-facing educational support;
- data-informed analysis of students' internship concerns and preparation behavior.

A possible research question derived from this project is:

> How can a discipline-specific digital platform reduce information asymmetry and improve internship preparedness among undergraduate engineering students?

## Technical Implementation

| Component | Implementation |
| --- | --- |
| Frontend | React 18 via CDN |
| Styling | Tailwind CSS via CDN and custom CSS |
| Backend-as-a-Service | Supabase |
| Application Structure | Single-file `index.html` web app |
| Community Data | Supabase `posts` table |
| Resource Collection | Client-side public page fetching with fallback source links |
| Core Interactions | Search, posting, commenting, likes, image/PDF preview, major classification, resource radar |

The project intentionally remains lightweight so that it can be deployed through static hosting services such as GitHub Pages, Netlify, or Vercel. This makes it suitable for fast iteration, user testing, and portfolio demonstration.

## Usage

The project is currently a single-file frontend application. It can be previewed by opening `index.html` directly in a browser, or deployed through a static hosting service.

```text
1. Clone or download this repository.
2. Open index.html in a browser.
3. Explore the dashboard, guidance hub, community, and resource radar.
```

For online deployment, GitHub Pages is the simplest option for this repository structure.

## Evaluation Plan

To further develop this project into a research-oriented study, the following evaluation methods can be considered:

- **Student interviews**: Understand how students currently obtain internship information and what barriers they face.
- **Questionnaire study**: Measure students' perceived preparedness, information sufficiency, and confidence before and after using the platform.
- **Usability testing**: Observe how efficiently students complete tasks such as finding a career pathway, preparing for an interview, or publishing an experience post.
- **Behavioral data analysis**: Analyze search keywords, post categories, comment interactions, and resource access patterns.
- **Comparative study**: Compare the platform-supported preparation process with traditional fragmented information-seeking methods.

## Future Work

- Add secure user authentication and role-based access control.
- Move sensitive moderation logic to backend services or Supabase Row Level Security policies.
- Add a formal moderation queue for public posts.
- Improve the external resource crawler with a server-side scheduled job.
- Add a data dashboard for internship trends across the three majors.
- Improve mobile accessibility and visual consistency.
- Conduct formal usability testing with students from the target majors.
- Extend the model to other schools, departments, or engineering disciplines.

## Project Status

This repository is currently a release-oriented student support platform prototype. It is suitable for public demonstration and early user feedback, while still leaving room for stronger backend security, automated data pipelines, and formal research evaluation.