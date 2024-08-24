# Patternless Optimisms, its a&hellip; thing

It's time for a change in approach, and I'm here to inspire and motivate you to join me on this journey towards a simplified development process. I'm questioning whether our industry's best practices truly serve the development process, especially in front-end-focused projects. The standard techniques I see in use today have become overly-complicated and extremely frail; to say nothing of performance, semantic meaning, or inclusivity.

> Seriously, how often does a company need to be sued before they take it, well serious!?

## Disclaimer

Industry standards do still provide value and are relevant for many teams striving to modernize their workflows and improve delivery metrics, but not when they become too reliant on prebuilt solutions and over-generalized patterns, potentially missing out on approaches better aligned to their need. Think rubberband balls and the "it's not a bug, it's a feature" mentality&mdash;the we can just push it up and fix it later approach doesn't work. You will not go back and fix it later, your company will fill your time with other work and someone will have to clean up your mess down the road.

## Perhaps the problem is our tools

Package managers, Frameworks, Bundlers, Formatters, Linters, Preprocessors, Transpilers, TypeSafety, and so on are all great for their intent and have their place; however, they're the core reaason behind the complexity that has become the norm. Using all tools in an ecosystem passes ownership off but limits your ability to make informed decisions about what to use and when.

- **Dependencies** have helpd steer us away from reinventing the wheel yet they also create security vulnerabilities and limit access to the latest features and optimizations because of lacking backwards compatibility and varied version support for the same library. A better approch is using third-party libraries to ramp up quickly for a Proof of concept so you can demo the intent of the effort, then building a solution to accommodate your needs in a lean, concise, and consistent way. The sheer bloat of dependencies is astronomical. 

- **TypeSafety** may improve quality on your branch but it can be a double-edged sword that blocks progress and further complicating implementation stategies while attempting to scale or evolve features. I usually prefer JSDoc typing over TSC, but ultimately if you slow down and truly write sound logic, proper error handling, safe conditional logic to insure proper instance and type usage&mdash;these tools become much less important if you have a good grasp on the language fundamentals. Teach your team instead of layering in more tools!

- **Frameworks** have really helped push the industry to new hights, but have also become a crutch for teams, one that is stunting growth and improvement. I see *SO* few developers who have even an elemantary understanding of Javascript (or CSS for that matter), they don't understand HTML semantics, accessibility, or how to debug with in devtools or other environments; all because they're so reliant on popular tools that provide access to existing code to `copy` + `paste` from. They piecemeal together a hacky solution with AI and stolen source code without even attempting to understand the underlying problem.

- **Familiarity** is a great asset, but it is not a substitute for understanding the core principles and constructs that make truly enjoyable working environments and high-performance develpement teams. The cookie cutter implementations I have utilized recently are dated, clunky, and unsustainable due to repetitive hotfixes, layers of unnecessary abstractions, unrealistic asks from Product and Business teams, and forcing standards from frameworks that have zero relevance to the project needs.

## The non-solution&hellip; solution

The primary goal of this project is to create an enterprise design system and web component library, but the end-result is irrelivant; it is eclipsed in importance by the process. The effort's premise champions minimalism, simplification of process, and a bare essential approach to adoption of standards, patterns, and tools. I want to see whether a from-scratch project, absent of all the shiney toys, is feasible for a maintainable, performant, scalable and reusable project. I want to see if it has the ability to be applicable to any project, regardless of size, scope, or complexity; I know it can be!

### Implementation game plan

My strategy, as of right now, is to create a story instead of fixating on code, I want to write in plain english what this project's intent is without attempting to code it; at least initially. Once I've settled on a cohesive trajectory that outlines my need. Then I can start with native HTML elements, some basic styling for theme and layout, while using javascript web components (I am *avoiding* Shadow DOM interaction for now) to extend the functionality of elements where necessary. The content will be the hardest part so I intend to create a *Kitchen Sink* with all elements and fill in some placeholder data to get started.

- I intend to begin with a static site (no bundle/transpile/routing steps)
- no `npm`, no `Vite`, no `ESLint` no `Prettier`, no `React` no `Typescript` no `Tailwind`, etc.
- I want to keep toolings down at a minimum, so I intend to use only Github for planning, documentation, and code management.
- I am using VSCode for my IDE at current, but may use codespaces via github instead for this project.
- I intend to document the entire process to showcase why I am doing what I'm doing and want to also mention to anyone that stumbles upon this repository to get involved if they want to, offer insight, add suggestions, or even just share areas you may want to revisit and improve.

> More to come&hellip;

#### Resources

- [Wiki Documentation](https://github.com/darcher-/patternlessOptimisms/wiki)
- [Known Issues](https://github.com/darcher-/patternlessOptimisms/issues)
- [Project Planning](https://github.com/users/darcher-/projects/8)
- [Codespace Editor](https://laughing-yodel-g4xw997964cw776.github.dev/)
- [Discussion Topics](https://github.com/darcher-/patternlessOptimisms/discussions/9)
