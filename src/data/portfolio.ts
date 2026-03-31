export type SocialLink = {
  label: string;
  href: string;
  icon: 'GitHub' | 'LinkedIn' | 'Mail';
};

export const socialLinks: SocialLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dihgg/', icon: 'LinkedIn' },
  { label: 'GitHub', href: 'https://github.com/Dihgg', icon: 'GitHub' },
  { label: 'Email', href: 'mailto:dihgg@dihgg.com', icon: 'Mail' },
];
