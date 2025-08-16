import { describe, it, expect } from 'vitest';
import {
  formatDate,
  formatCurrency,
  formatPhoneNumber,
  formatFileSize,
  formatDuration,
  formatPercentage,
  truncateText,
  capitalizeFirst,
  slugify,
} from '../formatters';

describe('Formatters Utilities', () => {
  describe('formatDate', () => {
    it('formats date with default format', () => {
      const date = new Date('2024-01-15T10:30:00Z');
      const result = formatDate(date);
      expect(result).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/);
    });

    it('formats date with custom format', () => {
      const date = new Date('2024-01-15T10:30:00Z');
      const result = formatDate(date, 'yyyy-MM-dd');
      expect(result).toBe('2024-01-15');
    });

    it('handles invalid date', () => {
      const result = formatDate(new Date('invalid'));
      expect(result).toBe('Invalid Date');
    });

    it('formats date string', () => {
      const result = formatDate('2024-01-15');
      expect(result).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/);
    });
  });

  describe('formatCurrency', () => {
    it('formats currency with default options', () => {
      const result = formatCurrency(1234.56);
      expect(result).toBe('$1,234.56');
    });

    it('formats currency with custom currency', () => {
      const result = formatCurrency(1234.56, 'EUR');
      expect(result).toMatch(/€1,234.56|1,234.56\s*€/);
    });

    it('formats currency with custom locale', () => {
      const result = formatCurrency(1234.56, 'USD', 'de-DE');
      expect(result).toMatch(/1\.234,56/);
    });

    it('handles zero amount', () => {
      const result = formatCurrency(0);
      expect(result).toBe('$0.00');
    });

    it('handles negative amount', () => {
      const result = formatCurrency(-1234.56);
      expect(result).toBe('-$1,234.56');
    });
  });

  describe('formatPhoneNumber', () => {
    it('formats US phone number', () => {
      const result = formatPhoneNumber('1234567890');
      expect(result).toBe('(123) 456-7890');
    });

    it('formats phone number with country code', () => {
      const result = formatPhoneNumber('+11234567890');
      expect(result).toBe('+1 (123) 456-7890');
    });

    it('handles invalid phone number', () => {
      const result = formatPhoneNumber('123');
      expect(result).toBe('123');
    });

    it('handles empty string', () => {
      const result = formatPhoneNumber('');
      expect(result).toBe('');
    });
  });

  describe('formatFileSize', () => {
    it('formats bytes', () => {
      const result = formatFileSize(512);
      expect(result).toBe('512 B');
    });

    it('formats kilobytes', () => {
      const result = formatFileSize(1024);
      expect(result).toBe('1.0 KB');
    });

    it('formats megabytes', () => {
      const result = formatFileSize(1048576);
      expect(result).toBe('1.0 MB');
    });

    it('formats gigabytes', () => {
      const result = formatFileSize(1073741824);
      expect(result).toBe('1.0 GB');
    });

    it('handles zero size', () => {
      const result = formatFileSize(0);
      expect(result).toBe('0 B');
    });

    it('formats with custom decimals', () => {
      const result = formatFileSize(1536, 2);
      expect(result).toBe('1.50 KB');
    });
  });

  describe('formatDuration', () => {
    it('formats seconds', () => {
      const result = formatDuration(45);
      expect(result).toBe('45s');
    });

    it('formats minutes and seconds', () => {
      const result = formatDuration(125);
      expect(result).toBe('2m 5s');
    });

    it('formats hours, minutes and seconds', () => {
      const result = formatDuration(3665);
      expect(result).toBe('1h 1m 5s');
    });

    it('handles zero duration', () => {
      const result = formatDuration(0);
      expect(result).toBe('0s');
    });

    it('formats exact minutes', () => {
      const result = formatDuration(120);
      expect(result).toBe('2m');
    });

    it('formats exact hours', () => {
      const result = formatDuration(3600);
      expect(result).toBe('1h');
    });
  });

  describe('formatPercentage', () => {
    it('formats percentage with default decimals', () => {
      const result = formatPercentage(0.1234);
      expect(result).toBe('12.34%');
    });

    it('formats percentage with custom decimals', () => {
      const result = formatPercentage(0.1234, 1);
      expect(result).toBe('12.3%');
    });

    it('handles zero percentage', () => {
      const result = formatPercentage(0);
      expect(result).toBe('0.00%');
    });

    it('handles 100 percentage', () => {
      const result = formatPercentage(1);
      expect(result).toBe('100.00%');
    });

    it('handles values over 100%', () => {
      const result = formatPercentage(1.5);
      expect(result).toBe('150.00%');
    });
  });

  describe('truncateText', () => {
    it('truncates long text', () => {
      const text = 'This is a very long text that should be truncated';
      const result = truncateText(text, 20);
      expect(result).toBe('This is a very long...');
    });

    it('does not truncate short text', () => {
      const text = 'Short text';
      const result = truncateText(text, 20);
      expect(result).toBe('Short text');
    });

    it('handles custom suffix', () => {
      const text = 'This is a long text';
      const result = truncateText(text, 10, ' [more]');
      expect(result).toBe('This is a [more]');
    });

    it('handles empty string', () => {
      const result = truncateText('', 10);
      expect(result).toBe('');
    });
  });

  describe('capitalizeFirst', () => {
    it('capitalizes first letter', () => {
      const result = capitalizeFirst('hello world');
      expect(result).toBe('Hello world');
    });

    it('handles already capitalized text', () => {
      const result = capitalizeFirst('Hello World');
      expect(result).toBe('Hello World');
    });

    it('handles empty string', () => {
      const result = capitalizeFirst('');
      expect(result).toBe('');
    });

    it('handles single character', () => {
      const result = capitalizeFirst('a');
      expect(result).toBe('A');
    });
  });

  describe('slugify', () => {
    it('converts text to slug', () => {
      const result = slugify('Hello World');
      expect(result).toBe('hello-world');
    });

    it('handles special characters', () => {
      const result = slugify('Hello, World! How are you?');
      expect(result).toBe('hello-world-how-are-you');
    });

    it('handles multiple spaces', () => {
      const result = slugify('Hello    World');
      expect(result).toBe('hello-world');
    });

    it('handles accented characters', () => {
      const result = slugify('Café & Restaurant');
      expect(result).toBe('cafe-restaurant');
    });

    it('handles empty string', () => {
      const result = slugify('');
      expect(result).toBe('');
    });

    it('removes leading and trailing dashes', () => {
      const result = slugify('  Hello World  ');
      expect(result).toBe('hello-world');
    });
  });
});