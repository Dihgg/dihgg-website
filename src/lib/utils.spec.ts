import { normalize, replacePlaceholders } from '@/lib/utils';

describe('normalize', () => {
  it('lowercases the string', () => {
    expect(normalize('TypeScript')).toBe('typescript');
  });

  it('strips diacritical marks', () => {
    expect(normalize('Café')).toBe('cafe');
    expect(normalize('ação')).toBe('acao');
    expect(normalize('Ångström')).toBe('angstrom');
  });

  it('replaces whitespace with dashes', () => {
    expect(normalize('node js')).toBe('node-js');
    expect(normalize('spring  boot')).toBe('spring-boot');
    expect(normalize('a\tb')).toBe('a-b');
  });

  it('strips disallowed characters', () => {
    expect(normalize('C++')).toBe('c');
    expect(normalize('C#')).toBe('c');
  });

  it('preserves dots', () => {
    expect(normalize('node.js')).toBe('node.js');
  });

  it('handles an empty string', () => {
    expect(normalize('')).toBe('');
  });
});

describe('replacePlaceholders', () => {
  it('replaces a single placeholder', () => {
    expect(replacePlaceholders('Hello, {name}!', { name: 'World' })).toBe('Hello, World!');
  });

  it('replaces multiple placeholders', () => {
    expect(
      replacePlaceholders('{count} posts on page {page}', { count: 5, page: 2 })
    ).toBe('5 posts on page 2');
  });

  it('leaves unknown placeholders unchanged', () => {
    expect(replacePlaceholders('Hello, {name}!', {})).toBe('Hello, {name}!');
  });

  it('handles a template with no placeholders', () => {
    expect(replacePlaceholders('No placeholders here', { foo: 'bar' })).toBe(
      'No placeholders here'
    );
  });

  it('replaces numeric values', () => {
    expect(replacePlaceholders('Page {page} of {total}', { page: 1, total: 10 })).toBe(
      'Page 1 of 10'
    );
  });
});
