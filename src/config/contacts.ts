/**
 * Contact configuration for direct ordering via Telegram and Zalo.
 * 
 * Edit these values with your actual contact details:
 * - telegramUsername: your Telegram handle without '@' (e.g., 'afiget_hcmc' or 'your_username')
 * - zaloPhoneOrId: your phone number in Vietnam format or international format (e.g., '0901234567' or '84901234567') or Zalo ID
 */
export const ORDER_CONTACTS = {
  // Telegram username without '@'
  telegramUsername: 'afiget_hcmc',

  // Zalo phone number or user ID (e.g. '0901234567' or '84901234567')
  zaloPhoneOrId: '0901234567',
};

/**
 * Builds direct and share Telegram URLs.
 */
export function getTelegramOrderLinks(username: string, orderText: string) {
  const cleanUsername = username.replace(/^@/, '').trim();
  const encodedText = encodeURIComponent(orderText);

  return {
    // Direct chat with prefilled draft text (official t.me/<username>?text=...)
    directChatUrl: cleanUsername ? `https://t.me/${cleanUsername}?text=${encodedText}` : '',
    // Universal share sheet fallback if user wants to select chat
    shareUrl: `https://t.me/share/url?url=${encodedText}`,
    // Simple profile link
    profileUrl: cleanUsername ? `https://t.me/${cleanUsername}` : '',
  };
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
