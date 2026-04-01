/**
 * External profile and contact links rendered in header/footer and home sections.
 */
export type SocialLink = {
  label: string;
  href: string;
  icon: 'GitHub' | 'LinkedIn' | 'Mail';
};

/**
 * Ordered list of public social/contact destinations for the portfolio site.
 */
export const socialLinks: SocialLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dihgg/', icon: 'LinkedIn' },
  { label: 'GitHub', href: 'https://github.com/Dihgg', icon: 'GitHub' },
  { label: 'Email', href: 'mailto:dihgg@dihgg.com', icon: 'Mail' },
];
