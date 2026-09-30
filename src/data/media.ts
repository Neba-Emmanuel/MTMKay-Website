/** Asset provenance and generation prompts are recorded in IMAGE_ASSETS.md. */
const root = "/images/marketing";
export const media = {
  systems: {
    src: `${root}/connected-systems.jpg`,
    small: `${root}/connected-systems-small.jpg`,
    width: 1536,
    height: 1024,
    smallWidth: 768,
    alt: "Abstract blue arches, glass panels, and silver bridges forming a connected system.",
    caption: "Ideas, connected. An illustration of purposeful technology.",
  },
  exam: {
    src: `${root}/exam-prep-concept.jpg`,
    small: `${root}/exam-prep-concept-small.jpg`,
    width: 1536,
    height: 1024,
    smallWidth: 768,
    alt: "Illustrative STEM study scene with a laptop displaying mtmkay exam prep beside notebooks.",
    caption: "Concept illustration / MTMKay Exam Prep",
  },
  laptop: {
    src: `${root}/laptop-concept.jpg`,
    small: `${root}/laptop-concept-small.jpg`,
    width: 1536,
    height: 1024,
    smallWidth: 768,
    alt: "Illustrative STEM study scene with a laptop displaying an atom model beside notebooks.",
    caption: "Concept illustration / MTMKay Exam Prep",
  },
  team: {
    src: `${root}/mtmkay-team.jpg`,
    small: `${root}/mtmkay-team-small.jpg`,
    width: 1280,
    height: 960,
    smallWidth: 640,
    alt: "People wearing MTMKay shirts working with laptops and equipment in the office.",
    caption: "People behind the work / MTMKay",
  },
  collaboration: {
    src: `${root}/mtmkay-collaboration.jpg`,
    small: `${root}/mtmkay-collaboration-small.jpg`,
    width: 1280,
    height: 960,
    smallWidth: 640,
    alt: "MTMKay colleagues gathered around laptops during a working session.",
    caption: "Shared thinking. Practical work.",
  },
  workspace: {
    src: `${root}/mtmkay-workspace.jpg`,
    small: `${root}/mtmkay-workspace-small.jpg`,
    width: 1280,
    height: 960,
    smallWidth: 640,
    alt: "Two people working side by side on laptops in the MTMKay workspace.",
    caption: "A place to work, learn, and connect / Kumba",
  },
};
export type MediaKey = keyof typeof media;
