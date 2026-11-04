// Phone-number display helpers so the clinic's number always shows with +91,
// no matter how it was typed in the admin panel ("9811171293", "98111 71293",
// "09811171293", "91 9811171293", or already "+91 ...").

export function formatPhone(raw) {
  const s = String(raw ?? '').trim();
  if (!s) return '';
  if (s.startsWith('+')) return s; // already has a country code — leave it untouched
  const digits = s.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) return `+91 ${digits.slice(2)}`; // "91" typed without the +
  if (digits.length === 11 && digits.startsWith('0')) return `+91 ${digits.slice(1)}`; // leading trunk 0
  return `+91 ${s}`;
}

// tel: link with the country code, digits only (e.g. tel:+919811171293).
export function phoneHref(raw) {
  return `tel:${formatPhone(raw).replace(/[^\d+]/g, '')}`;
}