// Global teardown for Jest tests
export default async function globalTeardown() {
  console.log('🧹 Cleaning up test environment...')
  
  try {
    // Clean up test database if needed
    // For example, dropping test tables, clearing test data, etc.
    
    // Close any open connections
    // await testDbConnection.close()
    
    console.log('✅ Test environment cleanup completed')
  } catch (error) {
    console.error('❌ Failed to cleanup test environment:', error)
    // Don't throw error in teardown to avoid masking test failures
  }
}