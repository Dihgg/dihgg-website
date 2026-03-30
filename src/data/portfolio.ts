export type SocialLink = {
  label: string;
  href: string;
  icon: 'GitHub' | 'LinkedIn' | 'Twitter' | 'Facebook' | 'Mail';
};

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/Dihgg', icon: 'GitHub' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dihgg/', icon: 'LinkedIn' },
  { label: 'Twitter', href: 'https://twitter.com/Diihgg', icon: 'Twitter' },
  { label: 'Facebook', href: 'https://facebook.com/dihgg', icon: 'Facebook' }
];
