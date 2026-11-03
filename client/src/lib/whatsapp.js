// Shared WhatsApp hand-off used by every public form on the site.
// Same number as the floating WhatsApp button, the Footer and the Contact page.
export const WHATSAPP_NUMBER = '919811171293';

// Opens WhatsApp with `message` pre-filled to `number`.
// Must be called synchronously from inside a click/submit handler (i.e. BEFORE any
// `await`), otherwise mobile browsers treat the new tab as a popup and block it.
export function openWhatsApp(message, number = WHATSAPP_NUMBER) {
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  const win = window.open(url, '_blank');
  if (win) {
    try {
      win.opener = null;
    } catch (e) {
      // ignore
    }
  } else {
    // Popup was blocked — fall back to navigating this tab so the message is never lost.
    window.location.href = url;
  }
}