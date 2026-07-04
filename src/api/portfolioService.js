import apiClient from './apiClient';

// Admin Auth
export const adminLogin = async (username, password) => {
  return apiClient.post('/api/admin/login', { username, password });
};

// Projects
export const getProjects = async () => apiClient.get('/api/projects');
export const createProject = async (project) => apiClient.post('/api/projects', project);
export const updateProject = async (id, project) => apiClient.put(`/api/projects/${id}`, project);
export const deleteProject = async (id) => apiClient.delete(`/api/projects/${id}`);

// Skills
export const getSkills = async () => apiClient.get('/api/skills');
export const createSkill = async (skill) => apiClient.post('/api/skills', skill);
export const updateSkill = async (id, skill) => apiClient.put(`/api/skills/${id}`, skill);
export const deleteSkill = async (id) => apiClient.delete(`/api/skills/${id}`);

// Education
export const getEducation = async () => apiClient.get('/api/education');
export const createEducation = async (edu) => apiClient.post('/api/education', edu);
export const updateEducation = async (id, edu) => apiClient.put(`/api/education/${id}`, edu);
export const deleteEducation = async (id) => apiClient.delete(`/api/education/${id}`);

// Experience
export const getExperiences = async () => apiClient.get('/api/experience');
export const createExperience = async (exp) => apiClient.post('/api/experience', exp);
export const updateExperience = async (id, exp) => apiClient.put(`/api/experience/${id}`, exp);
export const deleteExperience = async (id) => apiClient.delete(`/api/experience/${id}`);

// Certifications
export const getCertifications = async () => apiClient.get('/api/certifications');
export const createCertification = async (cert) => apiClient.post('/api/certifications', cert);
export const updateCertification = async (id, cert) => apiClient.put(`/api/certifications/${id}`, cert);
export const deleteCertification = async (id) => apiClient.delete(`/api/certifications/${id}`);

// Social Links
export const getSocialLinks = async () => apiClient.get('/api/social-links');
export const createSocialLink = async (link) => apiClient.post('/api/social-links', link);
export const updateSocialLink = async (id, link) => apiClient.put(`/api/social-links/${id}`, link);
export const deleteSocialLink = async (id) => apiClient.delete(`/api/social-links/${id}`);

// Resume
export const getResume = async () => apiClient.get('/api/resume');
export const updateResume = async (resume) => apiClient.put('/api/resume', resume);

// Contacts (Admin & User)
export const submitContact = async (payload) => apiClient.post('/api/contact', payload);
export const getContacts = async () => apiClient.get('/api/contact');
export const deleteContact = async (id) => apiClient.delete(`/api/contact/${id}`);
export const markRead = async (id, read = true) => apiClient.patch(`/api/contact/${id}/read`, { read });

export default {
  adminLogin,
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
  getSocialLinks,
  createSocialLink,
  updateSocialLink,
  deleteSocialLink,
  getResume,
  updateResume,
  submitContact,
  getContacts,
  deleteContact,
  markRead
};
