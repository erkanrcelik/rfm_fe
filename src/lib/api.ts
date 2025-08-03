import axios from 'axios';

/**
 * API response interface for selected IDs
 * @interface SelectedIdsResponse
 * @property {boolean} success - Whether the operation was successful
 * @property {string} message - Response message
 * @property {number} count - Number of selected IDs
 * @property {string[]} selectedIds - Array of selected IDs
 */
export interface SelectedIdsResponse {
  success: boolean;
  message: string;
  count: number;
  selectedIds: string[];
}

/**
 * Request interface for selected IDs
 * @interface SelectedIdsRequest
 * @property {string[]} selectedIds - Array of selected customer IDs
 */
export interface SelectedIdsRequest {
  selectedIds: string[];
}

/**
 * Simple axios instance with base configuration
 */
export const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * API functions for RFM operations
 */
export const rfmApi = {
  /**
   * Submits selected customer IDs to the API
   * @param {SelectedIdsRequest} data - Request data
   * @returns {Promise<SelectedIdsResponse>} API response
   */
  submitSelectedIds: async (data: SelectedIdsRequest): Promise<SelectedIdsResponse> => {
    const response = await api.post<SelectedIdsResponse>('/selected-ids', data);
    return response.data;
  },

  /**
   * Gets API endpoint information
   * @returns {Promise<unknown>} API information
   */
  getApiInfo: async (): Promise<unknown> => {
    const response = await api.get('/selected-ids');
    return response.data;
  },
}; 