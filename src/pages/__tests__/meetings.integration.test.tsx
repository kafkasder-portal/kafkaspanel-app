import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MeetingsIndex } from '../meetings/Index'
import { mockMeeting } from '../../test/utils'

// Mock the API modules
vi.mock('../../api/meetings', () => ({
  meetingsApi: {
    getMeetings: vi.fn(),
    createMeeting: vi.fn(),
    updateMeeting: vi.fn(),
    deleteMeeting: vi.fn(),
    getAttendees: vi.fn(),
    addAttendee: vi.fn(),
    removeAttendee: vi.fn()
  }
}))

vi.mock('../../api/messages', () => ({
  messagesApi: {
    sendMessage: vi.fn(),
    getMessages: vi.fn()
  }
}))

vi.mock('../../api/tasks', () => ({
  tasksApi: {
    getTasks: vi.fn(),
    createTask: vi.fn(),
    updateTask: vi.fn(),
    deleteTask: vi.fn()
  }
}))

describe('Meetings Integration Tests', () => {
  beforeEach(async () => {
    vi.clearAllMocks()
    
    // Mock successful API responses
    const { meetingsApi } = await import('../../api/meetings')
    meetingsApi.getMeetings.mockResolvedValue([
      mockMeeting({ id: '1', title: 'Team Standup' }),
      mockMeeting({ id: '2', title: 'Project Review' })
    ])
    meetingsApi.getAttendees.mockResolvedValue([])
  })

  it('renders meetings list correctly', async () => {
    render(<MeetingsIndex />)

    // Check if page title is rendered
    expect(screen.getByText('Toplantılar')).toBeInTheDocument()

    // Wait for meetings to load
    await waitFor(() => {
      expect(screen.getByText('Team Standup')).toBeInTheDocument()
      expect(screen.getByText('Project Review')).toBeInTheDocument()
    })
  })

  it('allows creating a new meeting', async () => {
    const { meetingsApi } = await import('../../api/meetings')
    const newMeeting = mockMeeting({ title: 'New Meeting' })
    meetingsApi.createMeeting.mockResolvedValue(newMeeting)

    render(<MeetingsIndex />)

    // Click create meeting button
    const createButton = screen.getByText('Yeni Toplantı')
    fireEvent.click(createButton)

    // Check if create modal opens
    await waitFor(() => {
      expect(screen.getByText('Toplantı Oluştur')).toBeInTheDocument()
    })

    // Fill out the form
    const titleInput = screen.getByLabelText(/toplantı başlığı/i)
    fireEvent.change(titleInput, { target: { value: 'New Meeting' } })

    const descriptionInput = screen.getByLabelText(/açıklama/i)
    fireEvent.change(descriptionInput, { target: { value: 'Meeting description' } })

    // Submit the form
    const submitButton = screen.getByText('Toplantı Oluştur')
    fireEvent.click(submitButton)

    // Verify API was called
    await waitFor(() => {
      expect(meetingsApi.createMeeting).toHaveBeenCalledWith({
        title: 'New Meeting',
        description: 'Meeting description',
        date: expect.any(String),
        duration: expect.any(Number),
        location: expect.any(String)
      })
    })
  })

  it('allows editing existing meeting', async () => {
    const { meetingsApi } = await import('../../api/meetings')
    meetingsApi.updateMeeting.mockResolvedValue(
      mockMeeting({ id: '1', title: 'Updated Meeting' })
    )

    render(<MeetingsIndex />)

    // Wait for meetings to load
    await waitFor(() => {
      expect(screen.getByText('Team Standup')).toBeInTheDocument()
    })

    // Click edit button for first meeting
    const editButtons = screen.getAllByLabelText(/düzenle/i)
    fireEvent.click(editButtons[0])

    // Check if edit modal opens
    await waitFor(() => {
      expect(screen.getByText('Toplantı Düzenle')).toBeInTheDocument()
    })

    // Update the title
    const titleInput = screen.getByDisplayValue('Team Standup')
    fireEvent.change(titleInput, { target: { value: 'Updated Meeting' } })

    // Submit the form
    const saveButton = screen.getByText('Değişiklikleri Kaydet')
    fireEvent.click(saveButton)

    // Verify API was called
    await waitFor(() => {
      expect(meetingsApi.updateMeeting).toHaveBeenCalledWith('1', {
        title: 'Updated Meeting'
      })
    })
  })

  it('allows deleting a meeting', async () => {
    const { meetingsApi } = await import('../../api/meetings')
    meetingsApi.deleteMeeting.mockResolvedValue({ success: true })

    render(<MeetingsIndex />)

    // Wait for meetings to load
    await waitFor(() => {
      expect(screen.getByText('Team Standup')).toBeInTheDocument()
    })

    // Click delete button for first meeting
    const deleteButtons = screen.getAllByLabelText(/sil/i)
    fireEvent.click(deleteButtons[0])

    // Confirm deletion
    const confirmButton = screen.getByText('Sil')
    fireEvent.click(confirmButton)

    // Verify API was called
    await waitFor(() => {
      expect(meetingsApi.deleteMeeting).toHaveBeenCalledWith('1')
    })
  })

  it('handles API errors gracefully', async () => {
    const { meetingsApi } = await import('../../api/meetings')
    meetingsApi.getMeetings.mockRejectedValue(new Error('API Error'))

    render(<MeetingsIndex />)

    // Check if error message is displayed
    await waitFor(() => {
      expect(screen.getByText(/hata/i)).toBeInTheDocument()
    })
  })

  it('allows adding attendees to meeting', async () => {
    const { meetingsApi } = await import('../../api/meetings')
    meetingsApi.addAttendee.mockResolvedValue({ success: true })

    render(<MeetingsIndex />)

    // Wait for meetings to load
    await waitFor(() => {
      expect(screen.getByText('Team Standup')).toBeInTheDocument()
    })

    // Click on meeting to open details
    const meetingCard = screen.getByText('Team Standup').closest('div')
    fireEvent.click(meetingCard!)

    // Check if attendees section is visible
    await waitFor(() => {
      expect(screen.getByText(/katılımcılar/i)).toBeInTheDocument()
    })

    // Add attendee
    const addAttendeeButton = screen.getByText(/katılımcı ekle/i)
    fireEvent.click(addAttendeeButton)

    // Fill attendee form
    const emailInput = screen.getByLabelText(/e-posta/i)
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })

    // Submit form
    const submitButton = screen.getByText('Ekle')
    fireEvent.click(submitButton)

    // Verify API was called
    await waitFor(() => {
      expect(meetingsApi.addAttendee).toHaveBeenCalledWith('1', 'test@example.com')
    })
  })

  it('allows sending messages to meeting attendees', async () => {
    const { messagesApi } = await import('../../api/messages')
    messagesApi.sendMessage.mockResolvedValue({ success: true })

    render(<MeetingsIndex />)

    // Wait for meetings to load
    await waitFor(() => {
      expect(screen.getByText('Team Standup')).toBeInTheDocument()
    })

    // Click on meeting to open details
    const meetingCard = screen.getByText('Team Standup').closest('div')
    fireEvent.click(meetingCard!)

    // Check if messaging section is visible
    await waitFor(() => {
      expect(screen.getByText(/mesaj gönder/i)).toBeInTheDocument()
    })

    // Send message
    const messageInput = screen.getByLabelText(/mesaj/i)
    fireEvent.change(messageInput, { target: { value: 'Meeting reminder' } })

    const sendButton = screen.getByText('Gönder')
    fireEvent.click(sendButton)

    // Verify API was called
    await waitFor(() => {
      expect(messagesApi.sendMessage).toHaveBeenCalledWith({
        meetingId: '1',
        message: 'Meeting reminder',
        recipients: expect.any(Array)
      })
    })
  })

  it('allows creating tasks from meeting', async () => {
    const { tasksApi } = await import('../../api/tasks')
    tasksApi.createTask.mockResolvedValue({ id: 'task-1', title: 'New Task' })

    render(<MeetingsIndex />)

    // Wait for meetings to load
    await waitFor(() => {
      expect(screen.getByText('Team Standup')).toBeInTheDocument()
    })

    // Click on meeting to open details
    const meetingCard = screen.getByText('Team Standup').closest('div')
    fireEvent.click(meetingCard!)

    // Check if tasks section is visible
    await waitFor(() => {
      expect(screen.getByText(/görevler/i)).toBeInTheDocument()
    })

    // Create task
    const createTaskButton = screen.getByText(/görev oluştur/i)
    fireEvent.click(createTaskButton)

    // Fill task form
    const titleInput = screen.getByLabelText(/görev başlığı/i)
    fireEvent.change(titleInput, { target: { value: 'New Task' } })

    const descriptionInput = screen.getByLabelText(/açıklama/i)
    fireEvent.change(descriptionInput, { target: { value: 'Task description' } })

    // Submit form
    const submitButton = screen.getByText('Oluştur')
    fireEvent.click(submitButton)

    // Verify API was called
    await waitFor(() => {
      expect(tasksApi.createTask).toHaveBeenCalledWith({
        title: 'New Task',
        description: 'Task description',
        meetingId: '1'
      })
    })
  })
})
