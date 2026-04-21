import { api } from './apiClient';

const USE_MOCK = false; // Set to false when backend is ready

// LocalStorage key
const STORAGE_KEY = 'mazadat_featured_auctions';

const formatLocalDateTime = (value) => {
  if (!value) return value;

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

// ========== Mock Implementation (uses localStorage) ==========

const mockGetFeaturedAuctions = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const featuredAuctions = stored ? JSON.parse(stored) : [];
    return Promise.resolve({ data: featuredAuctions });
  } catch (error) {
    console.error('Error loading featured auctions from localStorage:', error);
    return Promise.resolve({ data: [] });
  }
};

const mockFeatureAuction = (auctionId) => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const featuredAuctions = stored ? JSON.parse(stored) : [];

    // Check if already featured
    const alreadyFeatured = featuredAuctions.some((item) => item.auctionId === auctionId);
    if (alreadyFeatured) {
      return Promise.resolve({ message: 'Already featured' });
    }

    // Add to featured
    const newFeatured = {
      id: Date.now(),
      auctionId,
      createdAt: new Date().toISOString(),
    };

    featuredAuctions.push(newFeatured);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(featuredAuctions));

    return Promise.resolve({ data: newFeatured });
  } catch (error) {
    return Promise.reject(new Error('Failed to feature auction'));
  }
};

const mockUnfeatureAuction = (auctionId) => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const featuredAuctions = stored ? JSON.parse(stored) : [];

    // Remove from featured
    const updatedFeatured = featuredAuctions.filter((item) => item.auctionId !== auctionId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFeatured));

    return Promise.resolve({ message: 'Unfeatured successfully' });
  } catch (error) {
    return Promise.reject(new Error('Failed to unfeature auction'));
  }
};

// ========== API Implementation (connects to backend) ==========

const apiFetchFeaturedAuctions = () => {
  return api.get('/auction/featured/random');
};

const apiFeatureAuction = (auctionId, featuredEndDate) => {
  return api.post(`/auction/${auctionId}/feature`, {
    featuredEndDate: formatLocalDateTime(featuredEndDate)
  });
};

const apiUnfeatureAuction = (auctionId) => {
  return api.delete(`/auction/${auctionId}/feature`);
};

const apiGetSellerFeaturedAuctions = () => {
  return api.get('/auction/featured/my-featured');
};

// ========== Export the appropriate implementation ==========

export const getFeaturedAuctions = USE_MOCK ? mockGetFeaturedAuctions : apiFetchFeaturedAuctions;
export const featureAuction = USE_MOCK ? mockFeatureAuction : apiFeatureAuction;
export const unfeatureAuction = USE_MOCK ? mockUnfeatureAuction : apiUnfeatureAuction;
export const getSellerFeaturedAuctions = USE_MOCK ? mockGetFeaturedAuctions : apiGetSellerFeaturedAuctions;
