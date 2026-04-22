/**
 * Validation helper functions that provide specific, actionable error messages
 */

export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,32}$/;
export const PHONE_REGEX = /^\+9665\d{8}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates password and returns specific error message
 * @param {string} password - Password to validate
 * @param {Function} t - Translation function
 * @returns {string|null} - Error message or null if valid
 */
export function validatePassword(password, t) {
  if (!password) {
    return t('requiredField');
  }

  if (password.length < 8) {
    return t('passwordTooShort');
  }

  if (password.length > 32) {
    return t('passwordTooLong');
  }

  if (!/[A-Z]/.test(password)) {
    return t('passwordNoUppercase');
  }

  if (!/[a-z]/.test(password)) {
    return t('passwordNoLowercase');
  }

  if (!/\d/.test(password)) {
    return t('passwordNoNumber');
  }

  if (!/[@$!%*?&]/.test(password)) {
    return t('passwordNoSpecial');
  }

  return null;
}

/**
 * Validates phone number and returns specific error message
 * @param {string} phone - Phone number to validate
 * @param {Function} t - Translation function
 * @returns {string|null} - Error message or null if valid
 */
export function validatePhone(phone, t) {
  if (!phone) {
    return t('requiredField');
  }

  // Remove spaces and dashes for more lenient checking
  const cleaned = phone.replace(/[\s-]/g, '');

  if (!cleaned.startsWith('+966')) {
    return t('profileInvalidPhone') || 'Phone must start with +966';
  }

  const digits = cleaned.slice(4); // Remove '+966'

  if (digits.length !== 8) {
    return t('phoneInvalidFormat') || 'Invalid format - must be +9665XXXXXXXX';
  }

  if (!/^\d+$/.test(digits)) {
    return t('phoneInvalidFormat') || 'Invalid format - must be +9665XXXXXXXX';
  }

  // Final regex check
  if (!PHONE_REGEX.test(cleaned)) {
    return t('phoneInvalidFormat') || 'Invalid format - must be +9665XXXXXXXX';
  }

  return null;
}

/**
 * Validates email and returns specific error message
 * @param {string} email - Email to validate
 * @param {Function} t - Translation function
 * @returns {string|null} - Error message or null if valid
 */
export function validateEmail(email, t) {
  if (!email) {
    return t('requiredField');
  }

  if (!EMAIL_REGEX.test(email)) {
    return t('profileInvalidEmail');
  }

  return null;
}

/**
 * Check if password is strong (all requirements met)
 * @param {string} password - Password to check
 * @returns {boolean} - True if password is strong
 */
export function isStrongPassword(password) {
  return PASSWORD_REGEX.test(password);
}

/**
 * Check if phone number is valid
 * @param {string} phone - Phone number to check
 * @returns {boolean} - True if phone is valid
 */
export function isValidPhone(phone) {
  const cleaned = phone.replace(/[\s-]/g, '');
  return PHONE_REGEX.test(cleaned);
}

/**
 * Check if email is valid
 * @param {string} email - Email to check
 * @returns {boolean} - True if email is valid
 */
export function isValidEmail(email) {
  return EMAIL_REGEX.test(email);
}

