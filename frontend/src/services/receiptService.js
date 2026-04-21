import { api } from './apiClient';

export const generateReceipt = async (auctionId, language = 'en') => {
    const blob = await api.post(`/receipt/generate/${auctionId}`, null, {
        responseType: 'blob',
        headers: {
            'X-Language': language,
        },
    });

    if (!(blob instanceof Blob) || blob.size === 0) {
        throw new Error('Generated receipt is empty');
    }

    const signature = await blob.slice(0, 4).text();
    if (signature !== '%PDF') {
        throw new Error('Server returned an invalid receipt file');
    }

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `receipt_${auctionId}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    return { success: true };
};

