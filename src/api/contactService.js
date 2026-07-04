import portfolioService from './portfolioService';

export const submitContact = portfolioService.submitContact;
export const getContacts = portfolioService.getContacts;
export const deleteContact = portfolioService.deleteContact;
export const adminLogin = portfolioService.adminLogin;
export const markRead = portfolioService.markRead;

export default {
  submitContact,
  getContacts,
  deleteContact,
  adminLogin,
  markRead
};
