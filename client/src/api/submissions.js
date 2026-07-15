<<<<<<< HEAD
﻿import API from './axios';
=======
import API from './axios';
>>>>>>> 61eeb18 (Complete)
// but the token interceptor in axios.js must still fire (it does via the shared instance)
export const submitTask = (taskId, formData) =>
  API.post(`/submissions/${taskId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const fetchSubmission = (taskId) => API.get(`/submissions/${taskId}`);

export const fetchAllSubmissions = () => API.get('/submissions/admin/all');

export const reviewSubmission = (id, reviewStatus) =>
  API.put(`/submissions/${id}/review`, { reviewStatus });

<<<<<<< HEAD
=======
export const fetchMySubmissions = () => API.get('/submissions/talent/mine');

>>>>>>> 61eeb18 (Complete)
