import { api } from './apiClient';

export const placeBid = (auctionId, amount) =>
    api.post('/bid/add', { auctionId, amount });

export const getBuyerBids = () =>
    api.get('/bid/buyer/my-bids');

export const getWonBids = () =>
    api.get('/bid/buyer/won-bids');

