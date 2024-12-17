// Mock API service
const api = {
  post: async () => {
    throw new Error('API calls are disabled in mock mode');
  },
  get: async () => {
    throw new Error('API calls are disabled in mock mode');
  },
  put: async () => {
    throw new Error('API calls are disabled in mock mode');
  },
  delete: async () => {
    throw new Error('API calls are disabled in mock mode');
  }
};

export default api;
