import type { MDXComponents } from "mdx/types";

// Styling for the article body rendered from MDX.
export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="mb-6 mt-16 font-display text-3xl text-phos-black md:text-4xl"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mb-4 mt-12 font-display text-2xl text-phos-black"
      {...props}
    />
  ),
  p: (props) => (
    <p
      className="mb-8 font-sans text-lg leading-relaxed text-phos-charcoal/90"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="my-12 border-l-2 border-phos-sage pl-6 font-display text-2xl italic leading-relaxed text-phos-black"
      {...props}
    />
  ),
  a: (props) => (
    <a className="text-phos-sage underline underline-offset-4" {...props} />
  ),
  ul: (props) => (
    <ul
      className="mb-8 list-disc space-y-2 pl-6 font-sans text-lg text-phos-charcoal/90"
      {...props}
    />
  ),
};
