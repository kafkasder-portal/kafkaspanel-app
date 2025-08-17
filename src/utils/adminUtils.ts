// Admin utilities removed - authentication and role management disabled
// All users now have full access without role restrictions

export async function assignTempAdminRole() {
  // Implementation would go here
}

export async function checkUserProfile() {
  // Implementation would go here
}

export async function getCurrentUserRole() {
  console.log('Role checking disabled')
  return 'super_admin'
}
