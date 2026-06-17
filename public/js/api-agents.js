/**
 * Agent API calls (Optional)
 * Uncomment to enable backend persistence
 */

/*
const agentAPI = {
    getAll: () => api.get('/api/agents'),
    create: (agentData) => api.post('/api/agents', agentData),
    getOne: (agentId) => api.get(`/api/agents/${agentId}`),
    update: (agentId, data) => api.put(`/api/agents/${agentId}`, data),
    delete: (agentId) => api.delete(`/api/agents/${agentId}`),
};
*/

// Frontend-only agent storage (using localStorage)
// Agents are stored per user in browser
// For backend integration, replace with agentAPI calls above
