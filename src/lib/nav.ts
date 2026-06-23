// Primary navigation. Anchor items scroll to a homepage section; route items
// navigate to a dedicated page. The Header resolves anchors against the home
// route when rendered on an inner page.
export type NavKey = "services" | "about" | "brands" | "journal" | "contact";

export type NavItem = {
  key: NavKey;
  type: "anchor" | "route";
  target: string;
};

export const navItems: NavItem[] = [
  { key: "about", type: "anchor", target: "#about" },
  { key: "services", type: "anchor", target: "#services" },
  { key: "brands", type: "route", target: "/brands" },
  { key: "journal", type: "route", target: "/journal" },
  { key: "contact", type: "route", target: "/contact" },
];
