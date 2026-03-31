export type Locale = 'pt-BR' | 'en';

export const siteContent = {
  'pt-BR': {
    homeTitle: 'Dihgg | Diego Lopes',
    homeDescription: 'Portfolio de Diego Lopes, desenvolvedor web e de aplicacoes.',
    heroLead:
      'Cientista da computação, adoro aprender novas tecnologias e tenho interesses em: desenvolvimento web, inteligência artificial, ciência de dados, internet das coisas e desenvolvimento de jogos.',
    aboutTitle: '{Sobre}',
    aboutText:
      'Com mais de uma década de experiência em desenvolvimento de software. Trabalhei em empresas que incluem consultoria de desenvolvimento, aplicações web e desenvolvimento de jogos educacionais. Trabalhei com frontend e backend, com experiência em: Javascript, Typescript, Node, Angular, HTML, CSS, SQL, PHP, Python, Java e muito mais.',
    latestPostsTitle: '{Últimos Posts}',
    latestPostsCta: 'Ver todos os posts',
    latestPostsEmptyLabel: 'Sem posts publicados ainda.',
    latestPostsCardCta: 'Ler post',
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
    blogDescription: 'Artigos e notas técnicas de Diego Lopes.',
    blogIntro: 'Bem-vindo(a) ao meu blog pessoal! Aqui compartilho artigos, notas técnicas e insights sobre desenvolvimento web, programação e tecnologia. Fique ligado(a) para atualizações regulares e sinta-se à vontade para entrar em contato caso tenha alguma dúvida ou sugestão de temas que gostaria que eu abordasse.',
    noPostsLabel: 'Ainda sem posts.',
    backHomeLabel: '← Voltar para home',
    backBlogLabel: '← Blog',
    madeWithLabel: 'feito com',
    searchPlaceholder: 'Buscar posts...',
    paginationAriaLabel: 'Paginação do blog',
    paginationPreviousLabel: 'Anterior',
    paginationNextLabel: 'Próxima',
    dateLocale: 'pt-BR'
  },
  en: {
    homeTitle: 'Dihgg | Diego Lopes',
    homeDescription: 'Diego Lopes portfolio, web developer and product engineer.',
    heroLead:
      'Computer scientist who loves learning new technologies, with interests in web development, artificial intelligence, data science, internet of things, and game development.',
    aboutTitle: '{About}',
    aboutText:
      'With more than a decade of experience in software development, I have worked in consulting, web applications, and educational game development. I have delivered frontend and backend work with hands-on experience in Javascript, Node, Angular, HTML, CSS, SQL, PHP, Python, Java and more.',
    latestPostsTitle: '{Latest Posts}',
    latestPostsCta: 'View all posts',
    latestPostsEmptyLabel: 'No published posts yet.',
    latestPostsCardCta: 'Read post',
    skillsTitle: '{Skills}',
    workTitle: '{Work}',
    projectsTitle: '{Projects}',
    contactTitle: '{Contact}',
    contactLead: 'Send an email to',
    contactCta: 'Get in touch',
    blogCta: 'Read blog',
    headerBlogLabel: 'Blog',
    headerContactLabel: 'Get in touch',
    projectCta: 'View project',
    socialAriaLabel: 'Social links',
    switcherAriaLabel: 'Choose language',
    blogPageTitle: 'Blog | Dihgg',
    blogDescription: 'Articles and engineering notes by Diego Lopes.',
    blogIntro: 'Welcome to my personal blog! Here I share articles, technical notes, and insights on web development, programming, and technology. Stay tuned for regular updates and feel free to reach out if you have any questions or topics you would like me to cover.',
    noPostsLabel: 'No posts yet.',
    backHomeLabel: '← Back to home',
    backBlogLabel: '← Blog',
    madeWithLabel: 'made with',
    searchPlaceholder: 'Search posts...',
    paginationAriaLabel: 'Blog pagination',
    paginationPreviousLabel: 'Previous',
    paginationNextLabel: 'Next',
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
  latestPostsCardCta: string;
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
  searchPlaceholder: string;
  paginationAriaLabel: string;
  paginationPreviousLabel: string;
  paginationNextLabel: string;
  dateLocale: string;
}>;

export function getLocalizedHomePath(locale: Locale) {
  return locale === 'en' ? '/en/' : '/';
}

export function getLocalizedBlogPagePath(locale: Locale, page = 1) {
  const base = locale === 'en' ? '/en/blog/' : '/blog/';
  return page <= 1 ? base : `${base}page/${page}/`;
}

export function getLocalizedBlogPath(locale: Locale, slug?: string) {
  const base = locale === 'en' ? '/en/blog/' : '/blog/';
  return slug ? `${base}${slug}/` : base;
}