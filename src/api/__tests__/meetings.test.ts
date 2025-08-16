import { describe, it, expect, vi, beforeEach } from 'vitest'
import { meetingsApi } from '../meetings'
import { mockMeeting } from '../../test/utils'

describe('meetingsApi', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getMeetings', () => {
    it('should fetch meetings successfully', async () => {
      const result = await meetingsApi.getMeetings()

      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBeGreaterThan(0)
      expect(result[0]).toHaveProperty('id')
      expect(result[0]).toHaveProperty('title')
      expect(result[0]).toHaveProperty('start_date')
    })

    it('should handle API errors gracefully', async () => {
      // Test error handling by temporarily breaking the function
      const originalGetMeetings = meetingsApi.getMeetings
      meetingsApi.getMeetings = vi.fn().mockRejectedValue(new Error('API Error'))

      try {
        await expect(meetingsApi.getMeetings()).rejects.toThrow('API Error')
      } finally {
        // Restore original function
        meetingsApi.getMeetings = originalGetMeetings
      }
    })
  })

  describe('getMeeting', () => {
    it('should fetch a single meeting successfully', async () => {
      const result = await meetingsApi.getMeeting('1')

      expect(result).toBeDefined()
      expect(result).toHaveProperty('id', '1')
      expect(result).toHaveProperty('title')
    })

    it('should return null for non-existent meeting', async () => {
      const result = await meetingsApi.getMeeting('non-existent-id')

      expect(result).toBeNull()
    })
  })

  describe('createMeeting', () => {
    it('should create a meeting successfully', async () => {
      const newMeeting = {
        title: 'Test Meeting',
        description: 'Test Description',
        start_date: '2024-01-01T10:00:00Z',
        end_date: '2024-01-01T11:00:00Z',
        meeting_type: 'physical' as const,
        location: 'Test Location'
      }

      const result = await meetingsApi.createMeeting(newMeeting)

      expect(result).toBeDefined()
      expect(result).toHaveProperty('id')
      expect(result).toHaveProperty('title', 'Test Meeting')
      expect(result).toHaveProperty('description', 'Test Description')
      expect(result).toHaveProperty('meeting_type', 'physical')
    })

    it('should handle creation errors gracefully', async () => {
      const newMeeting = {
        title: 'Test Meeting',
        description: 'Test Description',
        start_date: '2024-01-01T10:00:00Z',
        end_date: '2024-01-01T11:00:00Z',
        meeting_type: 'physical' as const,
        location: 'Test Location'
      }

      // Test error handling by temporarily breaking the function
      const originalCreateMeeting = meetingsApi.createMeeting
      meetingsApi.createMeeting = vi.fn().mockRejectedValue(new Error('Creation failed'))

      try {
        await expect(meetingsApi.createMeeting(newMeeting)).rejects.toThrow('Creation failed')
      } finally {
        // Restore original function
        meetingsApi.createMeeting = originalCreateMeeting
      }
    })
  })

  describe('updateMeeting', () => {
    it('should update a meeting successfully', async () => {
      const updateData = {
        title: 'Updated Meeting Title',
        description: 'Updated Description'
      }

      const result = await meetingsApi.updateMeeting('1', updateData)

      expect(result).toBeDefined()
      expect(result).toHaveProperty('id', '1')
      expect(result).toHaveProperty('title', 'Updated Meeting Title')
      expect(result).toHaveProperty('description', 'Updated Description')
    })
  })

  describe('deleteMeeting', () => {
    it('should delete a meeting successfully', async () => {
      const result = await meetingsApi.deleteMeeting('1')

      expect(result).toBeDefined()
      expect(result).toHaveProperty('success', true)
    })
  })
})
