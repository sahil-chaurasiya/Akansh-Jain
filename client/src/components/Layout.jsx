import Header from './Header.jsx';
import Footer from './Footer.jsx';
import WhatsAppFloat from './WhatsAppFloat.jsx';

export default function Layout({ children }) {
  return (
    <>
      {/* Hides the legacy jQuery "scrollUp" back-to-top button (the orange up-arrow
          circle injected by /assets/js/jquery.scrollUp.min.js) so only the WhatsApp
          float shows in the bottom-right corner. */}
      <style>{'#scrollUp { display: none !important; }'}</style>
      <div id="preloader">
        <div id="loading"> </div>
      </div>
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}