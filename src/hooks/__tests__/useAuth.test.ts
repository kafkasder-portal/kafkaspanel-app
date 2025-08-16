import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useAuth } from '../useAuth';
import { createClient } from '@supabase/supabase-js';

// Mock Supabase client
vi.mock('@supabase/supabase-js');

const mockSupabase = {
  auth: {
    signInWithPassword: vi.fn(),
    signUp: vi.fn(),
    signOut: vi.fn(),
    getUser: vi.fn(),
    onAuthStateChange: vi.fn(),
    updateUser: vi.fn(),
  },
};

vi.mocked(createClient).mockReturnValue(mockSupabase as any);

describe('useAuth Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.auth.onAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    });
  });

  it('initializes with correct default values', () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.user).toBe(null);
    expect(result.current.isLoading).toBe(true);
    expect(typeof result.current.login).toBe('function');
    expect(typeof result.current.logout).toBe('function');
    expect(typeof result.current.refreshAccessToken).toBe('function');
  });

  it('handles successful login', async () => {
    const mockUser = { id: '1', email: 'test@example.com' };
    const mockSession = { access_token: 'token', user: mockUser };
    
    mockSupabase.auth.signInWithPassword.mockResolvedValue({
      data: { user: mockUser, session: mockSession },
      error: null,
    });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login({ email: 'test@example.com', password: 'password' });
    });

    expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
    });
  });

  it('handles login error', async () => {
    const mockError = { message: 'Invalid credentials' };
    
    mockSupabase.auth.signInWithPassword.mockResolvedValue({
      data: { user: null, session: null },
      error: mockError,
    });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      const result_login = await result.current.login({ email: 'test@example.com', password: 'wrong-password' });
      expect(result_login).toBe(false);
    });
  });

  it('handles successful login', async () => {
    const mockUser = { id: '1', email: 'test@example.com' };
    const mockSession = { access_token: 'token', user: mockUser };
    
    mockSupabase.auth.signInWithPassword.mockResolvedValue({
      data: { user: mockUser, session: mockSession },
      error: null,
    });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      const success = await result.current.login({
        email: 'test@example.com',
        password: 'password'
      });
      expect(success).toBe(true);
    });

    expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
    });
  });

  it('handles refresh token', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: { id: '1', email: 'test@example.com' } },
      error: null,
    });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      const success = await result.current.refreshAccessToken();
      expect(success).toBe(true);
    });
  });

  it('handles logout', async () => {
    mockSupabase.auth.signOut.mockResolvedValue({
      error: null,
    });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.logout();
    });

    expect(mockSupabase.auth.signOut).toHaveBeenCalled();
  });

  it('handles logout error', async () => {
    const mockError = { message: 'Logout failed' };
    
    mockSupabase.auth.signOut.mockResolvedValue({
      error: mockError,
    });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.logout();
    });

    expect(mockSupabase.auth.signOut).toHaveBeenCalled();
  });

  it('sets up auth state change listener', () => {
    renderHook(() => useAuth());
    
    expect(mockSupabase.auth.onAuthStateChange).toHaveBeenCalled();
  });

  it('cleans up auth state change listener on unmount', () => {
    const mockUnsubscribe = vi.fn();
    mockSupabase.auth.onAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: mockUnsubscribe } },
    });

    const { unmount } = renderHook(() => useAuth());
    
    unmount();
    
    expect(mockUnsubscribe).toHaveBeenCalled();
  });
});