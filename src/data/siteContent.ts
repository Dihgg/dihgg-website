import type { Project, TimelineItem } from './portfolio';

export type Locale = 'pt-BR' | 'en';

export const siteContent = {
  'pt-BR': {
    homeTitle: 'Dihgg | Diego Lopes',
    homeDescription: 'Portfolio de Diego Lopes, desenvolvedor web e de aplicacoes.',
    heroLead:
      'Cientista da computacao, adoro aprender novas tecnologias e tenho interesses em: desenvolvimento web, inteligencia artificial, ciencia de dados, internet das coisas e desenvolvimento de jogos.',
    aboutTitle: '{Sobre}',
    aboutText:
      'Com mais de uma decada de experiencia em desenvolvimento de software. Tenho experiencia em empresas que incluem consultoria de desenvolvimento, aplicacoes web e desenvolvimento de jogos educacionais. Trabalhei com frontend e backend, com alguma experiencia em: Javascript, Node, Angular, HTML, CSS, SQL, PHP, Python e Java.',
    latestPostsTitle: '{Ultimos Posts}',
    latestPostsCta: 'Ver todos os posts',
    latestPostsEmptyLabel: 'Sem posts publicados ainda.',
    skillsTitle: '{Skills}',
    workTitle: '{Trabalho}',
    projectsTitle: '{Projetos}',
    contactTitle: '{Contato}',
    contactLead: 'Envie um email para',
    contactCta: 'Entre em contato',
    blogCta: 'Ler blog',
    headerBlogLabel: 'Blog',
    headerContactLabel: 'Contato',
    projectCta: 'Ver projeto',
    socialAriaLabel: 'Redes sociais',
    switcherAriaLabel: 'Selecionar idioma',
    blogPageTitle: 'Blog | Dihgg',
    blogDescription: 'Artigos e notas tecnicas de Diego Lopes.',
    blogIntro: 'Posts em markdown versionados no Git. Simples de manter, simples de publicar.',
    noPostsLabel: 'Ainda sem posts neste idioma.',
    backHomeLabel: '← Voltar para home',
    backBlogLabel: '← Blog',
    madeWithLabel: 'feito com',
    dateLocale: 'pt-BR'
  },
  en: {
    homeTitle: 'Dihgg | Diego Lopes',
    homeDescription: 'Diego Lopes portfolio, web developer and product engineer.',
    heroLead:
      'Computer scientist who loves learning new technologies, with interests in web development, artificial intelligence, data science, internet of things, and game development.',
    aboutTitle: '{About}',
    aboutText:
      'With more than a decade of experience in software development, I have worked in consulting, web applications, and educational game development. I have delivered frontend and backend work with hands-on experience in Javascript, Node, Angular, HTML, CSS, SQL, PHP, Python, and Java.',
    latestPostsTitle: '{Latest Posts}',
    latestPostsCta: 'View all posts',
    latestPostsEmptyLabel: 'No published posts yet.',
    skillsTitle: '{Skills}',
    workTitle: '{Work}',
    projectsTitle: '{Projects}',
    contactTitle: '{Contact}',
    contactLead: 'Send an email to',
    contactCta: 'Get in touch',
    blogCta: 'Read blog',
    headerBlogLabel: 'Blog',
    headerContactLabel: 'Contact me',
    projectCta: 'View project',
    socialAriaLabel: 'Social links',
    switcherAriaLabel: 'Choose language',
    blogPageTitle: 'Blog | Dihgg',
    blogDescription: 'Articles and engineering notes by Diego Lopes.',
    blogIntro: 'Markdown posts versioned in Git. Easy to maintain, easy to publish.',
    noPostsLabel: 'No posts in this language yet.',
    backHomeLabel: '← Back to home',
    backBlogLabel: '← Blog',
    madeWithLabel: 'made with',
    dateLocale: 'en-US'
  }
} as const satisfies Record<Locale, {
  homeTitle: string;
  homeDescription: string;
  heroLead: string;
  aboutTitle: string;
  aboutText: string;
  latestPostsTitle: string;
  latestPostsCta: string;
  latestPostsEmptyLabel: string;
  skillsTitle: string;
  workTitle: string;
  projectsTitle: string;
  contactTitle: string;
  contactLead: string;
  contactCta: string;
  blogCta: string;
  headerBlogLabel: string;
  headerContactLabel: string;
  projectCta: string;
  socialAriaLabel: string;
  switcherAriaLabel: string;
  blogPageTitle: string;
  blogDescription: string;
  blogIntro: string;
  noPostsLabel: string;
  backHomeLabel: string;
  backBlogLabel: string;
  madeWithLabel: string;
  dateLocale: string;
}>;

export const timelineByLocale: Record<Locale, TimelineItem[]> = {
  'pt-BR': [
    {
      company: 'UNIP',
      role: 'Developer (Estagio)',
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
  ],
  en: [
    {
      company: 'UNIP',
      role: 'Developer Intern',
      period: '2014',
      summary: 'First professional experience building academic and internal projects.'
    },
    {
      company: 'Tinpix',
      role: 'Web Developer',
      period: '2014 - 2019',
      summary: 'Delivered institutional websites, e-commerce experiences, and ongoing web platform maintenance.'
    },
    {
      company: 'IBM',
      role: 'Application Developer',
      period: '2019 - 2021',
      summary: 'Worked on large-scale products with a focus on frontend, backend, and integrations.'
    },
    {
      company: 'Thoughtworks',
      role: 'Software Developer',
      period: '2021 - Present',
      summary: 'Consulting on digital products with a focus on quality, accessibility, and collaboration.'
    }
  ]
};

export const projectsByLocale: Record<Locale, Project[]> = {
  'pt-BR': [
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
  ],
  en: [
    {
      name: 'Guaxinim Games',
      description: 'Institutional website for an independent game studio.',
      stack: 'Web Development',
      href: 'https://guaxinimgames.com/'
    },
    {
      name: 'Mundo Alfabeto',
      description: 'E-commerce and editorial experience for a children-focused brand.',
      stack: 'Web + E-commerce',
      href: 'https://mundoalfabeto.com.br/'
    },
    {
      name: 'Gamefoss',
      description: 'Portal with continuous development and a content-driven strategy.',
      stack: 'Web + Content',
      href: 'https://gamefoss.com.br/'
    },
    {
      name: 'Bradesco Home Personalizada',
      description: 'Personalized Bradesco app home with a strong focus on performance.',
      stack: 'Frontend + Backend',
      href: 'https://play.google.com/store/apps/details?id=com.bradesco'
    }
  ]
};

export function getLocalizedHomePath(locale: Locale) {
  return locale === 'en' ? '/en/' : '/';
}

export function getLocalizedBlogPath(locale: Locale, slug?: string) {
  const base = locale === 'en' ? '/en/blog/' : '/blog/';
  return slug ? `${base}${slug}/` : base;
}