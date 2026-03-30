export type SocialLink = {
  label: string;
  href: string;
  icon: 'GitHub' | 'LinkedIn' | 'Twitter' | 'Facebook' | 'Mail';
};

export type TimelineItem = {
  company: string;
  role: string;
  period: string;
  summary: string;
};

export type Project = {
  name: string;
  description: string;
  stack: string;
  href: string;
};

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/Dihgg', icon: 'GitHub' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dihgg/', icon: 'LinkedIn' },
  { label: 'Twitter', href: 'https://twitter.com/Diihgg', icon: 'Twitter' },
  { label: 'Facebook', href: 'https://facebook.com/dihgg', icon: 'Facebook' }
];

export const skills: string[] = [
  'TypeScript',
  'React',
  'Astro',
  'Tailwind',
  'Node.js',
  'Jest',
  'PHP',
  'WordPress',
  'Java',
  'Python',
  'MySQL',
  'Angular'
];

export const timeline: TimelineItem[] = [
  {
    company: 'UNIP',
    role: 'Developer (Estágio)',
    period: '2014',
    summary: 'Primeira experiencia profissional construindo projetos academicos e internos.'
  },
  {
    company: 'Tinpix',
    role: 'Programador Web',
    period: '2014 - 2019',
    summary: 'Entrega de websites institucionais, e-commerce e manutencao de plataformas web.'
  },
  {
    company: 'IBM',
    role: 'Desenvolvedor de Aplicacoes',
    period: '2019 - 2021',
    summary: 'Atuacao em produtos de grande escala com foco em frontend, backend e integracoes.'
  },
  {
    company: 'Thoughtworks',
    role: 'Pessoa Desenvolvedora',
    period: '2021 - Atual',
    summary: 'Consultoria em produtos digitais com foco em qualidade, acessibilidade e colaboracao.'
  }
];

export const projects: Project[] = [
  {
    name: 'Guaxinim Games',
    description: 'Site institucional para estudio de jogos independente.',
    stack: 'Web Development',
    href: 'https://guaxinimgames.com/'
  },
  {
    name: 'Mundo Alfabeto',
    description: 'E-commerce e experiencia editorial para publico infantil.',
    stack: 'Web + E-commerce',
    href: 'https://mundoalfabeto.com.br/'
  },
  {
    name: 'Gamefoss',
    description: 'Portal com desenvolvimento continuo e estrategia de conteudo.',
    stack: 'Web + Conteudo',
    href: 'https://gamefoss.com.br/'
  },
  {
    name: 'Bradesco Home Personalizada',
    description: 'Home personalizada do app Bradesco, com foco em performance.',
    stack: 'Frontend + Backend',
    href: 'https://play.google.com/store/apps/details?id=com.bradesco'
  }
];
