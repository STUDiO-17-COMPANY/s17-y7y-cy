import { getTranslations } from "next-intl/server";
import {
  InstagramLogo,
  FacebookLogo,
  XLogo,
} from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/site";

// Tag pills + share links shown at the foot of an article. Share targets use
// real intents pointing at the canonical article URL (the old site's icons
// were inert href="#" placeholders).
export default async function ShareTags({
  tags,
  url,
  title,
}: {
  tags: string[];
  url: string;
  title: string;
}) {
  const t = await getTranslations("journal");
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shares = [
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      Icon: FacebookLogo,
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      Icon: XLogo,
    },
    { label: "Instagram", href: site.social.instagram, Icon: InstagramLogo },
  ];

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-6 border-t border-gray-200 px-6 pb-20 pt-12 sm:flex-row">
      <div className="flex gap-3 font-sans text-xs uppercase tracking-widest text-gray-500">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-gray-200 bg-white px-4 py-2"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <span className="font-sans text-xs font-semibold uppercase tracking-widest text-phos-black">
          {t("share")}:
        </span>
        {shares.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t("share")} ${label}`}
            className="hover-trigger text-gray-400 transition-colors hover:text-phos-sage"
          >
            <Icon size={20} />
          </a>
        ))}
      </div>
    </div>
  );
}
