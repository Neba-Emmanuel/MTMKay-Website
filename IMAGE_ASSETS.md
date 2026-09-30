# Website imagery

Final website assets are stored in `public/images/marketing/`, with editable image choices, descriptions and captions in `src/data/media.ts`. The reusable `Media` component supplies responsive sources, explicit dimensions, below-the-fold lazy loading and an SVG fallback.

## Existing MTMKay photographs

- `mtmkay-team.jpg` and `mtmkay-team-small.jpg`: resized from `public/who_we_are.jpg`.
- `mtmkay-collaboration.jpg` and `mtmkay-collaboration-small.jpg`: resized from `public/what_we_do.jpg`.
- `mtmkay-workspace.jpg` and `mtmkay-workspace-small.jpg`: resized from `public/work-cafe-kumba.jpg`.

Original photographs are preserved. No people or locations were generated or substituted. The new files only resize/compress the existing photographs; displayed crops are controlled in CSS.

## Generated imagery

Created with the built-in image generation tool, then converted to optimised JPEGs in 1536px and 768px widths. Original generated PNGs remain in the image tool's output directory.

### `connected-systems.jpg` / `connected-systems-small.jpg`

Used for the homepage hero, services introduction and an abstract supporting illustration.

Final prompt:

> Use case: stylized-concept. Asset type: premium technology consultancy website hero and service illustration. Generate a landscape 1536x1024 editorial 3D still life: an architectural assembly of cobalt blue (#2450d8) anodized metal arches, translucent frosted-glass rectangular panels, brushed silver connecting rails and warm ivory ceramic blocks on a warm off-white studio floor. The objects form an elegant connected modular system, evocative of software architecture built with purpose. A large cobalt hollow arch anchors the right half, small glass layers and an angled silver bridge lead towards it from the left foreground. Tactile real materials, subtle reflections, beautiful natural directional daylight and soft shadows, refined architectural photography, restrained and sophisticated, no neon, no glowing circuitry. Wide balanced composition with generous breathing room around the sculpture, easily cropped to square or wide. Crisp tangible forms. No text, letters, logos, watermarks, people or interfaces. This is an abstract brand illustration, not an actual product screenshot.

### `exam-prep-concept.jpg` / `exam-prep-concept-small.jpg`

Used as a visibly labelled illustrative project cover, not a screenshot or evidence of product features. Replace with approved platform screenshots when available.

Final prompt:

> Use case: product-mockup. Asset type: landscape editorial cover image for an exam preparation and STEM learning website case study, clearly a conceptual illustration, not an actual screenshot. Create a premium photorealistic 3D still life of an open thin silver laptop, angled three-quarter view, on a pale cobalt-blue studio surface. The laptop screen is a clean dark navy canvas with only a simple elegant three-dimensional blue and white orbital atom shape, absolutely no interface, no text and no numbers. Next to the laptop: two cream notebooks, a cobalt pencil and a small brushed metal geometric sphere. Wide landscape 1536x1024 framing with the laptop filling the right two-thirds and quieter blue space on the left. Soft daylight, tactile materials, crisp shadows, airy composition, educational and sophisticated. Restrained palette of cobalt #2450d8, pale periwinkle, cream and silver. No people, logos, text, charts, fake product features, extra devices or watermarks.

## Placeholder

`image-placeholder.svg` is a local, explicitly labelled fallback for an unavailable asset. It is a simple vector image icon, not an attempted replacement photo.

## Coverage

- Home: abstract hero, working-session photograph, project illustration, supporting abstract image, team photograph.
- Services: abstract introductory image and four service thumbnails.
- About: team introduction, working-session photo and wide workspace photograph.
- Work and case study: illustrative laptop cover.
- Contact: workspace photograph beside the introduction.
- Existing training, blog and Work Café imagery remains intact.

## Team portraits

`team-micheal-mbu.jpg`, `team-shantay-mbu.jpg`, `team-marie-ebangha.jpg`, and `team-neba-emmanuel.jpg` are compressed 640px-wide versions of the existing matching portraits in `public/team/`. Names and roles come from `src/data/team.ts`. The shared team section appears on Home and About; existing dummy biographies are not displayed. Unavailable portraits fall back to the member's initials and a “Portrait coming soon” label.
