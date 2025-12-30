import API_CONFIG from '../apiConfig';

class AdminApiService {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
  }

  async request(endpoint, method = 'GET', data = null, token = null) {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
      method,
      headers,
      signal: AbortSignal.timeout(API_CONFIG.TIMEOUT)
    };

    if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      config.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout. Please try again.');
      }
      throw error;
    }
  }

  // Auth methods
  async login(username, password) {
    const data = { username, password };
    return this.request(API_CONFIG.ENDPOINTS.ADMIN.LOGIN, 'POST', data);
    console.log(data);
  }

  async logout(token) {
    return this.request(API_CONFIG.ENDPOINTS.ADMIN.LOGOUT, 'POST', null, token);
  }

  async getProfile(token) {
    return this.request(API_CONFIG.ENDPOINTS.ADMIN.PROFILE, 'GET', null, token);
  }

  // Admin CRUD operations
  async createAdmin(data, token) {
    return this.request(API_CONFIG.ENDPOINTS.ADMIN.CREATE, 'POST', data, token);
  }

  async deleteAdmin(id, token) {
    const endpoint = `${API_CONFIG.ENDPOINTS.ADMIN.DELETE}/${id}`;
    return this.request(endpoint, 'DELETE', null, token);
  }

  async updateAdmin(id, data, token) {
    const endpoint = `${API_CONFIG.ENDPOINTS.ADMIN.UPDATE}/${id}`;
    return this.request(endpoint, 'PUT', data, token);
  }
}

export default new AdminApiService();