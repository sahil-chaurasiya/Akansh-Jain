const WHATSAPP_LINK =
  'https://api.whatsapp.com/send/?phone=919811171293&text&type=phone_number&app_absent=0';

export default function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      style={{
        position: 'fixed',
        bottom: '25px',
        right: '25px',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: '#25D366',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        zIndex: 9999,
        transition: 'transform 0.2s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="#ffffff"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.475.744 4.777 2.02 6.693L4.5 29.5l7.98-1.472A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.75c-2.02 0-3.898-.567-5.5-1.55l-.394-.234-4.735.873.9-4.615-.257-.402A9.7 9.7 0 0 1 4.75 15c0-6.213 5.05-11.25 11.254-11.25 6.204 0 11.254 5.037 11.254 11.25S22.208 24.75 16.004 24.75Zm6.166-8.394c-.338-.169-2.001-.987-2.31-1.1-.31-.113-.536-.169-.762.169-.226.338-.874 1.1-1.072 1.325-.197.226-.395.254-.732.085-.338-.169-1.427-.526-2.717-1.677-1.004-.895-1.682-2.001-1.878-2.339-.197-.338-.021-.52.148-.688.152-.151.338-.395.508-.592.169-.197.226-.338.338-.564.113-.226.056-.423-.028-.592-.085-.169-.762-1.838-1.044-2.518-.275-.66-.554-.571-.762-.582l-.649-.011c-.226 0-.592.085-.902.423-.31.338-1.185 1.157-1.185 2.822 0 1.665 1.213 3.273 1.382 3.499.169.226 2.388 3.646 5.786 5.113.808.349 1.439.557 1.931.713.811.258 1.549.222 2.132.135.65-.097 2.001-.818 2.283-1.607.282-.789.282-1.466.197-1.607-.084-.141-.31-.226-.649-.395Z" />
      </svg>
    </a>
  );
}