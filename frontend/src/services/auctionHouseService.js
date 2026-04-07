import { api } from './apiClient';

export const getAllAuctionHouses = () => api.get('/auctionhouse/get/all');

export const createAuctionHouse = (data) => api.post('/auctionhouse/add', data);

export const updateAuctionHouse = (data) => api.put('/auctionhouse/update', data);

export const getSellerAuctionHouse = () => api.get('/auctionhouse/seller/current');

export const addAuctionHouseAdminByEmail = (email) =>
	api.put(`/auctionhouse/admin/add/${encodeURIComponent(email)}`);

export const removeAuctionHouseAdminByEmail = (email) =>
	api.put(`/auctionhouse/admin/remove/${encodeURIComponent(email)}`);

export const addSelfAsAuctionHouseAdmin = () => api.put('/auctionhouse/admin/add');

export const getAuctionHouseTeam = () => api.get('/auctionhouse/team');

export const addSellerToAuctionHouse = (email) =>
	api.put(`/auctionhouse/team/add/${encodeURIComponent(email)}`);

export const removeSellerFromAuctionHouse = (email) =>
	api.put(`/auctionhouse/team/remove/${encodeURIComponent(email)}`);

export const promoteSellerToAdmin = (email) =>
	api.put(`/auctionhouse/team/promote/${encodeURIComponent(email)}`);

export const getPendingTeamInvitations = () => api.get('/auctionhouse/team/invitations/pending');

export const getSentTeamInvitations = () => api.get('/auctionhouse/team/invitations/sent');

export const acceptTeamInvitation = () => api.put('/auctionhouse/team/invitations/accept');

export const rejectTeamInvitation = () => api.put('/auctionhouse/team/invitations/reject');

export const cancelTeamInvitation = (email) =>
	api.put(`/auctionhouse/team/invitations/cancel/${encodeURIComponent(email)}`);

export const leaveAuctionHouse = () => api.put('/auctionhouse/team/leave');

