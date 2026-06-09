import { formatPostDate } from '@/lib/date';

// All dates are constructed as midnight UTC to mirror the app convention.
function utcDate(year: number, month: number, day: number): Date {
  return new Date(Date.UTC(year, month - 1, day));
}

describe('formatPostDate', () => {
  describe('en locale', () => {
    it('formats a date in English', () => {
      expect(formatPostDate(utcDate(2024, 3, 15), 'en')).toBe('Mar 15, 2024');
    });

    it('accepts "en-US" as an alias for "en"', () => {
      expect(formatPostDate(utcDate(2024, 1, 1), 'en-US')).toBe('Jan 1, 2024');
    });

    it('formats a single-digit day without zero-padding', () => {
      expect(formatPostDate(utcDate(2025, 7, 4), 'en')).toBe('Jul 4, 2025');
    });
  });

  describe('pt-BR locale', () => {
    it('formats a date in Brazilian Portuguese', () => {
      expect(formatPostDate(utcDate(2024, 3, 15), 'pt-BR')).toBe('15/03/2024');
    });

    it('formats a single-digit day with zero-padding', () => {
      expect(formatPostDate(utcDate(2025, 7, 4), 'pt-BR')).toBe('04/07/2025');
    });

    it('formats the last day of December correctly', () => {
      expect(formatPostDate(utcDate(2023, 12, 31), 'pt-BR')).toBe('31/12/2023');
    });
  });

  it('does not shift the date due to timezone differences', () => {
    // A midnight UTC date should not appear as the previous day in any timezone.
    const date = new Date('2024-06-01T00:00:00.000Z');
    expect(formatPostDate(date, 'en')).toBe('Jun 1, 2024');
    expect(formatPostDate(date, 'pt-BR')).toBe('01/06/2024');
  });
});
