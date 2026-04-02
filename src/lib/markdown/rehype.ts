import type { Root, Element } from 'hast';
import { visit } from 'unist-util-visit';

const LANGUAGE_MAP: Record<string, string> = {
  js: 'JavaScript',
  ts: 'TypeScript',
  jsx: 'JSX',
  tsx: 'TSX',
  sh: 'Shell',
  bash: 'Bash',
  yml: 'YAML',
  md: 'Markdown',
  py: 'Python',
  rb: 'Ruby',
  rs: 'Rust',
  csharp: 'C#',
  cs: 'C#',
  cpp: 'C++',
  plaintext: 'Text',
  text: 'Text'
};

const normalizeCodeLanguage = (value: string) => {
  const normalized = value.toLowerCase();
  if (LANGUAGE_MAP[normalized]) return LANGUAGE_MAP[normalized];

  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
};

export function codeBlock() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName !== 'pre') return;

      const children = node.children ?? [];
      const codeChild = children.find(
        (child): child is Element => child.type === 'element' && child.tagName === 'code'
      );
      if (!codeChild) return;

      const classList = codeChild.properties?.className;
      const classes = Array.isArray(classList) ? classList.map(String) : [];
      const languageClass = classes.find((className) => className.startsWith('language-'));
      if (!languageClass) return;

      const language = normalizeCodeLanguage(languageClass.replace('language-', '').trim());
      if (!language) return;

      node.properties = {
        ...(node.properties ?? {}),
        'data-language': language
      };
    });
  };
}