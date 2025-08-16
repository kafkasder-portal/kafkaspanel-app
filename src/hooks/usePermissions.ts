import { useState, useCallback } from 'react';
import { useAuth } from './useAuth';
import { Permission, Role } from '../types/permissions';

interface PermissionCheck {
  hasPermission: boolean;
  isLoading: boolean;
  error: string | null;
}

interface RoleCheck {
  hasRole: boolean;
  isLoading: boolean;
  error: string | null;
}

interface UsePermissionsReturn {
  checkPermission: (permission: Permission) => PermissionCheck;
  checkRole: (role: Role) => RoleCheck;
  hasAnyPermission: (permissions: Permission[]) => boolean;
  hasAllPermissions: (permissions: Permission[]) => boolean;
  hasAnyRole: (roles: Role[]) => boolean;
  hasAllRoles: (roles: Role[]) => boolean;
  isLoading: boolean;
  error: string | null;
}

export const usePermissions = (): UsePermissionsReturn => {
  const { user, isLoading: authLoading } = useAuth();

  const checkPermission = useCallback((permission: Permission): PermissionCheck => {
    if (!user) {
      return {
        hasPermission: false,
        isLoading: authLoading,
        error: 'User not authenticated'
      };
    }

    // Check if user has the specific permission
    const hasPermission = user.permissions?.includes(permission) || false;

    return {
      hasPermission,
      isLoading: authLoading,
      error: null
    };
  }, [user, authLoading]);

  const checkRole = useCallback((role: Role): RoleCheck => {
    if (!user) {
      return {
        hasRole: false,
        isLoading: authLoading,
        error: 'User not authenticated'
      };
    }

    // Check if user has the specific role
    const hasRole = user.roles?.includes(role) || false;

    return {
      hasRole,
      isLoading: authLoading,
      error: null
    };
  }, [user, authLoading]);

  const hasAnyPermission = useCallback((permissions: Permission[]): boolean => {
    if (!user || !user.permissions) return false;
    return permissions.some(permission => user.permissions!.includes(permission));
  }, [user]);

  const hasAllPermissions = useCallback((permissions: Permission[]): boolean => {
    if (!user || !user.permissions) return false;
    return permissions.every(permission => user.permissions!.includes(permission));
  }, [user]);

  const hasAnyRole = useCallback((roles: Role[]): boolean => {
    if (!user || !user.roles) return false;
    return roles.some(role => user.roles!.includes(role));
  }, [user]);

  const hasAllRoles = useCallback((roles: Role[]): boolean => {
    if (!user || !user.roles) return false;
    return roles.every(role => user.roles!.includes(role));
  }, [user]);

  return {
    checkPermission,
    checkRole,
    hasAnyPermission,
    hasAllPermissions,
    hasAnyRole,
    hasAllRoles,
    isLoading: authLoading,
    error: null
  };
};
