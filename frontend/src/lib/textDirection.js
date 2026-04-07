const ARABIC_CHAR_REGEX = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

export function containsArabic(text) {
    return typeof text === 'string' && ARABIC_CHAR_REGEX.test(text);
}

export function resolveTextDirection(text) {
    return containsArabic(text) ? 'rtl' : 'ltr';
}

export function resolveTextAlignmentClass(text) {
    return containsArabic(text) ? 'text-right' : 'text-left';
}

