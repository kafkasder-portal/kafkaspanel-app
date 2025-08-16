import { describe, it, expect } from 'vitest'
import {
  formatDate,
  formatCurrency,
  formatPhoneNumber,
  formatFileSize,
  formatDuration,
  formatPercentage,
  truncateText,
  capitalizeFirst,
  slugify
} from '../formatters'

describe('Formatters Utilities', () => {
  describe('formatDate', () => {
    it('formats date correctly', () => {
      const date = new Date('2023-01-15')
      const result = formatDate(date)
      expect(result).toMatch(/^\d{1,2}\/\d{1,2}\/\d{4}$/)
    })

    it('handles string dates', () => {
      const result = formatDate('2023-01-15')
      expect(result).toMatch(/^\d{1,2}\/\d{1,2}\/\d{4}$/)
    })

    it('handles invalid dates', () => {
      const result = formatDate('invalid-date')
      expect(result).toBe('Invalid Date')
    })

    it('formats with custom format', () => {
      const date = new Date('2023-01-15')
      const result = formatDate(date, 'yyyy-MM-dd')
      expect(result).toBe('2023-01-15')
    })
  })

  describe('formatCurrency', () => {
    it('formats USD currency', () => {
      const result = formatCurrency(1234.56)
      expect(result).toMatch(/\$1,234\.56/)
    })

    it('formats with custom currency', () => {
      const result = formatCurrency(1234.56, 'EUR')
      expect(result).toMatch(/1,234\.56/)
    })

    it('handles zero amount', () => {
      const result = formatCurrency(0)
      expect(result).toMatch(/\$0\.00/)
    })

    it('handles negative amounts', () => {
      const result = formatCurrency(-1234.56)
      expect(result).toMatch(/-\$1,234\.56/)
    })

    it('handles large numbers', () => {
      const result = formatCurrency(1234567.89)
      expect(result).toMatch(/\$1,234,567\.89/)
    })
  })

  describe('formatPhoneNumber', () => {
    it('formats 10-digit number', () => {
      const result = formatPhoneNumber('1234567890')
      expect(result).toBe('(123) 456-7890')
    })

    it('formats 11-digit number with country code', () => {
      const result = formatPhoneNumber('11234567890')
      expect(result).toBe('+1 (123) 456-7890')
    })

    it('handles already formatted numbers', () => {
      const result = formatPhoneNumber('(123) 456-7890')
      expect(result).toBe('(123) 456-7890')
    })

    it('handles empty string', () => {
      const result = formatPhoneNumber('')
      expect(result).toBe('')
    })
  })

  describe('formatFileSize', () => {
    it('formats bytes', () => {
      const result = formatFileSize(512)
      expect(result).toBe('512 B')
    })

    it('formats kilobytes', () => {
      const result = formatFileSize(1024)
      expect(result).toBe('1 KB')
    })

    it('formats megabytes', () => {
      const result = formatFileSize(1048576)
      expect(result).toBe('1 MB')
    })

    it('formats gigabytes', () => {
      const result = formatFileSize(1073741824)
      expect(result).toBe('1 GB')
    })

    it('handles zero size', () => {
      const result = formatFileSize(0)
      expect(result).toBe('0 B')
    })

    it('formats with custom decimals', () => {
      const result = formatFileSize(1536, 2)
      expect(result).toBe('1.5 KB')
    })
  })

  describe('formatDuration', () => {
    it('formats seconds only', () => {
      const result = formatDuration(30)
      expect(result).toBe('30s')
    })

    it('formats minutes and seconds', () => {
      const result = formatDuration(90)
      expect(result).toBe('1m 30s')
    })

    it('formats hours, minutes and seconds', () => {
      const result = formatDuration(3665)
      expect(result).toBe('1h 1m 5s')
    })

    it('handles zero duration', () => {
      const result = formatDuration(0)
      expect(result).toBe('0s')
    })

    it('formats hours only', () => {
      const result = formatDuration(3600)
      expect(result).toBe('1h')
    })

    it('formats minutes only', () => {
      const result = formatDuration(120)
      expect(result).toBe('2m')
    })
  })

  describe('formatPercentage', () => {
    it('formats decimal to percentage', () => {
      const result = formatPercentage(0.1234)
      expect(result).toBe('12.34%')
    })

    it('formats with custom decimals', () => {
      const result = formatPercentage(0.1234, 1)
      expect(result).toBe('12.3%')
    })

    it('handles zero', () => {
      const result = formatPercentage(0)
      expect(result).toBe('0.00%')
    })

    it('handles one hundred percent', () => {
      const result = formatPercentage(1)
      expect(result).toBe('100.00%')
    })

    it('handles negative values', () => {
      const result = formatPercentage(-0.1)
      expect(result).toBe('-10.00%')
    })
  })

  describe('truncateText', () => {
    it('truncates long text', () => {
      const text = 'This is a very long text that should be truncated'
      const result = truncateText(text, 20)
      expect(result).toBe('This is a very lo...')
    })

    it('does not truncate short text', () => {
      const text = 'Short text'
      const result = truncateText(text, 20)
      expect(result).toBe('Short text')
    })

    it('handles custom suffix', () => {
      const text = 'This is a long text'
      const result = truncateText(text, 10, ' [more]')
      expect(result).toBe('Thi [more]')
    })

    it('handles empty string', () => {
      const result = truncateText('', 10)
      expect(result).toBe('')
    })
  })

  describe('capitalizeFirst', () => {
    it('capitalizes first letter', () => {
      const result = capitalizeFirst('hello world')
      expect(result).toBe('Hello world')
    })

    it('handles already capitalized', () => {
      const result = capitalizeFirst('Hello World')
      expect(result).toBe('Hello World')
    })

    it('handles empty string', () => {
      const result = capitalizeFirst('')
      expect(result).toBe('')
    })

    it('handles single character', () => {
      const result = capitalizeFirst('a')
      expect(result).toBe('A')
    })
  })

  describe('slugify', () => {
    it('converts text to slug', () => {
      const result = slugify('Hello World')
      expect(result).toBe('hello-world')
    })

    it('handles special characters', () => {
      const result = slugify('Hello, World!')
      expect(result).toBe('hello-world')
    })

    it('handles multiple spaces', () => {
      const result = slugify('Hello   World')
      expect(result).toBe('hello-world')
    })

    it('handles accented characters', () => {
      const result = slugify('café résumé')
      expect(result).toBe('cafe-resume')
    })

    it('handles numbers', () => {
      const result = slugify('Page 123')
      expect(result).toBe('page-123')
    })

    it('handles empty string', () => {
      const result = slugify('')
      expect(result).toBe('')
    })
  })
})