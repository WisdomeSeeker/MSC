export const config = {
  // Set this to true to use mock services instead of real API calls
  useMockServices: true,
  
  api: {
    baseUrl: '',  // Empty base URL in mock mode
    endpoints: {
      login: '/auth/login',
      logout: '/auth/logout',
      currentUser: '/auth/me',
      projects: '/projects',
      timesheet: '/timesheet',
    }
  }
};
