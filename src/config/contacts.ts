/**
 * Contact configuration for ordering via Telegram and Zalo.
 * 
 * Edit these values with your actual contact details:
 * - telegramUsername: the owner's Telegram username without '@'
 * - zaloPhoneOrId: your phone number in Vietnam format or international format (e.g., '0901234567' or '84901234567') or Zalo ID
 */
export const ORDER_CONTACTS = {
  telegramUsername: 'OneDay_in',

  // Zalo phone number or user ID (e.g. '0901234567' or '84901234567')
  zaloPhoneOrId: '0886105293',
};

/** Opens the owner's Telegram chat for manual-copy fallback. */
export function getTelegramChatLink(username: string) {
  const cleanUsername = username.replace(/^@/, '').trim();
  return `https://t.me/${cleanUsername}`;
}

/** Opens the owner's chat with the complete order in the message field. */
export function getTelegramOrderLink(username: string, orderText: string) {
  return `${getTelegramChatLink(username)}?text=${encodeURIComponent(orderText)}`;
}

/**
 * Builds Zalo chat link.
 * Zalo does not support pre-filled message parameter in web links,
 * so we open the user's profile/chat and copy text to clipboard.
 */
export function getZaloOrderLink(phoneOrId: string) {
  const cleanTarget = phoneOrId.replace(/[^\d+a-zA-Z_-]/g, '').trim();
  return {
    chatUrl: `https://zalo.me/${cleanTarget}`,
  };
}
