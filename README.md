# CSU Internship Hub

CSU Internship Hub is a lightweight web-based internship guidance and peer-support platform designed for students in the School of Resources and Safety Engineering at Central South University. The project focuses on students majoring in Safety Engineering, Mining Engineering, and Urban Underground Space Engineering, where internship preparation is often affected by fragmented information, limited peer experience sharing, and unequal access to practical career guidance.

Rather than serving only as a static information page, this repository presents an early-stage digital support system prototype for engineering education. It explores how a discipline-specific online platform can help undergraduate students understand career pathways, prepare for internship applications, and transform individual internship experience into reusable peer knowledge.

## Project Motivation

Students in engineering disciplines often rely on scattered sources when preparing for internships: informal conversations, senior students' personal notes, WeChat groups, recruitment posts, and fragmented online materials. This creates several challenges:

- internship information is difficult to organize and compare;
- lower-year students may lack access to reliable peer experience;
- students often prepare resumes and interviews without discipline-specific guidance;
- valuable internship experience is easily lost after each cohort graduates;
- generic career platforms rarely reflect the needs of specialized engineering majors.

CSU Internship Hub was built to address these issues through a focused, low-barrier platform that combines structured guidance with community-based knowledge sharing.

## Research Relevance

This project can be positioned as a practice-based research prototype for PhD applications in areas such as engineering education, educational technology, human-computer interaction, digital learning environments, and career readiness support.

Potential research themes include:

- digital support systems for engineering students' career development;
- peer knowledge sharing and experience transfer in higher education;
- human-computer interaction design for student-facing educational platforms;
- discipline-specific information organization for internship preparation;
- data-informed analysis of students' career concerns and preparation behaviors.

A possible research question derived from this project is:

> How can a discipline-specific digital platform reduce information asymmetry and improve internship preparedness among undergraduate engineering students?

## Key Features

- **Structured Guidance Hub**: Provides curated guidance on major-specific career pathways, internship preparation, resume and interview strategies, common pitfalls, and a 90-day preparation plan.
- **Peer Community Space**: Allows students to publish experience posts, resource-sharing posts, and questions, helping individual experience become a reusable community knowledge base.
- **Searchable Content**: Supports keyword search across both the guidance section and community posts.
- **Multimedia Resource Sharing**: Supports image and PDF attachments, enabling students to share resume samples, interview notes, checklists, or other practical materials.
- **Interaction Mechanisms**: Includes likes and comments to encourage discussion, feedback, and peer support.
- **Basic Moderation Support**: Provides a simple administrator deletion function for maintaining content quality during the prototype stage.

## Technical Implementation

The current version is implemented as a lightweight single-page web application, prioritizing fast prototyping and low deployment cost.

| Component | Implementation |
| --- | --- |
| Frontend | React 18 via CDN |
| Styling | Tailwind CSS via CDN and custom CSS |
| Backend-as-a-Service | Supabase |
| Application Structure | Single-file `index.html` prototype |
| Core Interactions | Search, posting, commenting, likes, image/PDF preview |

This architecture makes the project easy to demonstrate, iterate, and deploy as an early-stage research prototype. It also leaves room for future migration to a more structured frontend framework and a more secure backend architecture.

## Why This Matters for a PhD Application

For research applications, the value of this project lies not only in its technical implementation but also in the way it connects a real student problem with a concrete, testable digital intervention.

The project demonstrates:

1. **Problem awareness**: It identifies a specific information gap in engineering students' internship preparation.
2. **User-centered thinking**: It is designed around the needs of students in specialized engineering majors rather than a general job-search audience.
3. **Prototype-driven research ability**: It translates an observed educational problem into an interactive system prototype.
4. **Potential for empirical evaluation**: It can be extended into user interviews, surveys, usability testing, and behavioral data analysis.
5. **Scalability of research context**: The model could be adapted from one school or major group to other engineering disciplines or institutions.

## Usage

The project is currently a single-file frontend prototype. It can be previewed by opening `index.html` directly in a browser.

```text
1. Clone or download this repository.
2. Open index.html in a browser.
3. Explore the guidance hub or use the community space to publish and discuss posts.
```

For online deployment, the project can be hosted on GitHub Pages, Netlify, Vercel, or other static hosting services.

## Potential Evaluation Plan

To further develop this project into a research-oriented study, the following evaluation methods can be considered:

- **Student Interviews**: Interview students from different years to understand how they currently obtain internship information and what barriers they face.
- **Questionnaire Study**: Measure students' perceived preparedness, information sufficiency, and confidence before and after using the platform.
- **Usability Testing**: Observe how efficiently students complete tasks such as finding a career pathway, preparing for an interview, or publishing an experience post.
- **Behavioral Data Analysis**: Analyze search keywords, post categories, comment interactions, and resource access patterns to understand students' practical concerns.
- **Comparative Study**: Compare the platform-supported preparation process with traditional fragmented information-seeking methods.

## Future Work

- Add user authentication and role-based access control.
- Move administrator authentication and sensitive logic to a more secure backend design.
- Configure Supabase Row Level Security policies for safer data operations.
- Introduce structured post categories, tags, and moderation workflows.
- Add an analytics dashboard for identifying common internship concerns and career interests.
- Improve mobile responsiveness and accessibility.
- Conduct formal usability testing with students from relevant majors.
- Extend the platform model to other schools, departments, or engineering disciplines.

## Project Status

This repository is currently an early-stage prototype. Its primary goal is to validate the concept, demonstrate the interaction flow, and provide a foundation for future research-oriented development. With further improvements in data security, content governance, user evaluation, and deployment, the project could evolve from a portfolio prototype into a practical student-support platform and a case study for research in engineering education and educational technology.