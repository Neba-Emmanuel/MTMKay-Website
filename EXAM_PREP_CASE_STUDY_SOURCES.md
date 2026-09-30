# MTMKay Exam Prep case study evidence

Reviewed for the owner's request to complete the project case study, 29 September 2026.

## Public website

- https://exam.mtmkay.com/ — live product name, Cameroon audience, exam pathways, exam practice, analytics, arts subjects, science practicals, account entry links.
- https://exam.mtmkay.com/about — product purpose and approach to exam preparation.

The homepage and About page publish different student totals and other impact figures without supporting methodology. Those figures are not reproduced in the case study. Authenticated journeys were not tested on production. The web reader could not retrieve the registration and category link destinations, so the text does not claim successful end-to-end verification.

## Local implementation corroboration

Read-only inspection of the adjacent `../MTMKay-Exam-Prep` repository:

- `README.md`: product overview and student/admin capabilities.
- `backend/src/modules/exams/exam.service.ts`: exam sessions, answer recording, submission, score calculation, counts of correct, wrong, and unanswered questions.
- `frontend/src/app/(student)/results/[resultId]/page.tsx`: answer review and explanations where available.
- `frontend/src/app/(student)/dashboard/page.tsx`: recent attempts and strong/focus topic lists.
- `frontend/src/app/(student)/practicals/[id]/page.tsx`: practical steps, observations, apparatus, and safety information.
- Admin routes for questions, subjects, practicals, and users corroborate the content-administration scope.

Local source corroborates implementation, not the deployed version or verified production behavior. The case study avoids a claim of randomized selection because inspected service code selects questions by ascending ID despite the public marketing description.

## Editorial decisions

- Describe the product, learner flow, and learning context; do not invent a delivery timeline, research process, named contributors, customer testimonial, or measured learning outcome.
- Retain the existing cover and explicitly caption it as a concept illustration. It is not a screenshot.
- Remove preparation notices and draft indexing restrictions from the work routes, as requested.
- Link readers directly to the live platform.
