import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api.js';
import { openWhatsApp } from '../lib/whatsapp.js';
import Layout from '../components/Layout.jsx';
import PageMeta from '../components/PageMeta.jsx';
import Breadcrumb from '../components/Breadcrumb.jsx';
import { useLegacyScripts } from '../hooks/useLegacyScripts.js';
import './consultation-premium.css';

const FALLBACK = {
  eyebrow: 'Online Consultation',
  introHeading: 'Dr. Aakansh Jain will provide you with his expert feedback in order for you to make a well informed decision.',
  introParagraph1:
    "We now offer online consultations to ensure your convenience, privacy, and comfort. Whether you're exploring options or ready to take the next step, our virtual sessions are designed to fit your schedule.",
  introParagraph2: 'We look forward to your online consultation!',
  processHeading: 'How Online Consultation Works',
  processSteps: [
    { icon: 'fa-light fa-file-pen', title: 'Fill Up Our Form' },
    { icon: 'fa-light fa-file-shield', title: 'Agree To The Terms & Conditions' },
    { icon: 'fa-light fa-hand-pointer', title: 'Submit The Form' },
    { icon: 'fa-light fa-mobile-screen', title: 'Pay Online By GPay Or Paytm' },
    { icon: 'fa-light fa-building-columns', title: 'Complete The Transaction' },
    { icon: 'fa-light fa-share-nodes', title: 'Share Payment Details With Us' },
    { icon: 'fa-light fa-phone-volume', title: 'Our Team Will Contact You' },
  ],
  formHeading: 'Book Your Online Consultation',
  consentCheckboxLabel: 'I agree to the Informed Consent for Telemedicine Consultation',
  viewConsentLinkText: 'View Informed Consent for Telemedicine Consultation',
  submitButtonText: 'Book Online Consultation',
  feeTableHeading: 'Below given is a comprehensive list of the online consultation fee that hold good with Dr. Aakansh Jain.',
  feeTableNote: 'Review clients should confirm their registration ID No. prior to consultation.',
  feeRows: [
    { type: 'Video', client: 'New', fee: '₹ 700', duration: '10 min' },
    { type: 'Video', client: 'Review', fee: '₹ 500', duration: '10 min' },
  ],
  paymentHeading: 'Online Payment',
  upiId: 'aakanshjain@sbi',
  paymentMobile: '9811171293',
  paymentNote: 'Kindly note that these are not clickable gateways and the payment has to be made manually through Google Pay or Paytm.',
  paymentQrImage: null,
  paymentDoctorPhoto: null,
  paymentDoctorPhotoCaption: 'Scan to pay Dr. Aakansh Jain',
  termsHeading: 'Terms and Conditions',
  termsItems: [
    'The consultation will be provided to you via audio/video call. Please make sure you have working video-conferencing equipment and a stable internet connection.',
    'You understand and acknowledge that there will not be any physical examination involved and the consultation will be provided via video only.',
    'The opinion given by the doctor will be based solely on the verbal communication between the doctor and the patient, and on the information you provide.',
    'If you miss or cancel your appointment, you will not be entitled to a refund.',
    'Our online consultation service is not meant for emergency conditions. In an emergency, please go to the nearest hospital immediately.',
  ],
  regulationNote:
    'This Telemedicine Consultation is offered in accordance with the Indian Medical Council (Professional Conduct, Etiquette and Ethics) (Amendment) Regulations, 2020.',
  consentModalTitle: 'Informed Consent for Telemedicine Consultation',
  consentGuidelinesHeading: 'Guidelines',
  consentGuidelinesItems: [
    'As per MOHFW and MCI guidelines, we offer teleconsultation as a convenient option for patients.',
    'Video consultation is offered as the primary mode of consult, with email used for sharing medical records.',
    'We offer only elective consultations. For all emergencies, patients should get to the nearest hospital in person.',
  ],
  consentDoctorHeading: 'Identification of Your Doctor',
  consentDoctorName: 'Dr. Aakansh Jain',
  consentDoctorQualification: '',
  consentDoctorCouncil: '',
  consentDoctorRegNo: '',
  consentAppointmentSlotsHeading: 'Appointment Slots',
  consentAppointmentSlotsText:
    'Appointments are of 15 minutes duration, with an accommodative window of about 10 minutes to prepare for the next teleconsult.',
  consentIntroHeading: 'Introduction',
  consentIntroText:
    'Telemedicine involves the use of electronic communication (phone, email, SMS, WhatsApp, video call, etc.) to allow a healthcare provider at one location to provide patient care to someone at a different location.',
  consentIntroItems: ['Patient medical records', 'Medical images', 'Live two-way audio and video', 'Output data from medical devices, and sound and video files'],
  consentIntroFooter:
    'The electronic systems used incorporate network and software security protocols to protect the confidentiality of patient identification and imaging data.',
  consentBenefitsHeading: 'Expected Benefits',
  consentBenefitsItems: [
    'Improved access to medical care by allowing you to remain at your own location while the doctor provides care from a different site.',
    'More efficient medical evaluation and management.',
    'Access to the doctor\u2019s expertise without the need to travel.',
    'Reduced need for travel.',
  ],
  consentRisksHeading: 'Possible Risks',
  consentRisksIntro: 'As with any medical process, telemedicine carries some potential risks, which may include but are not limited to:',
  consentRisksItems: [
    'In rare cases, the information transmitted may not be sufficient for the doctor to make an appropriate decision, and a face-to-face visit may be recommended.',
    'Delays in evaluation or treatment could occur because of equipment deficiencies or failures.',
    'In very rare instances, a security protocol could fail, resulting in a breach of privacy of your personal medical information.',
  ],
  consentFinancialText: 'I understand that I am financially responsible for all charges incurred during the telemedicine consultation.',
  consentExplicitHeading: 'Explicit Informed Consent for Telemedicine Consultation',
  consentExplicitIntro: 'By agreeing to this consent, I understand the following:',
  consentExplicitItems: [
    'There will not be any physical examination involved, and the consultation will be provided via video only.',
    'I have the right to withhold or withdraw my consent to the use of telemedicine at any time, without affecting my right to future care or treatment.',
    'This online consultation service is not meant for emergency conditions.',
  ],
  consentFooterText:
    'By checking the box to agree, you confirm that you have read the above Informed Consent for Telemedicine Consultation and wish to proceed with your consultation.',
};

export default function Consultation() {
  const [data, setData] = useState(FALLBACK);
  const [ready, setReady] = useState(false);
  const [showConsent, setShowConsent] = useState(false);
  const [showQrZoom, setShowQrZoom] = useState(false);
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    appointmentType: 'new',
    reviewRegistrationId: '',
    preferredDate: '',
    message: '',
    consentAgreed: false,
  });
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get('/consultation-section')
      .then((res) => setData({ ...FALLBACK, ...res.data.data }))
      .finally(() => setReady(true));
  }, []);

  useLegacyScripts(ready, [data]);

  // Lock body scroll while the consent popup or QR zoom is open.
  useEffect(() => {
    document.body.style.overflow = showConsent || showQrZoom ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [showConsent, showQrZoom]);

  // The WhatsApp number the completed booking + payment screenshot should be
  // shared to. Falls back to the CMS-editable payment mobile number, with a
  // hardcoded last resort so this never silently breaks. wa.me needs the
  // country code, so a bare 10-digit Indian number gets "91" prefixed.
  const whatsappNumber = (() => {
    const digits = (data.paymentMobile || '9811171293').replace(/\D/g, '');
    return digits.length === 10 ? `91${digits}` : digits;
  })();

  const buildWhatsappMessage = () => {
    const typeLabel = form.appointmentType === 'review' ? 'Review Patient' : 'New Appointment';
    const lines = [
      'Hi Dr. Aakansh Jain, I would like to book an online consultation.',
      '',
      `Name: ${form.name}`,
      `Mobile Number: ${form.mobile}`,
      `Appointment Type: ${typeLabel}`,
    ];
    if (form.appointmentType === 'review' && form.reviewRegistrationId) {
      lines.push(`Registration ID: ${form.reviewRegistrationId}`);
    }
    if (form.preferredDate) {
      lines.push(`Preferred Date: ${form.preferredDate}`);
    }
    lines.push(`Message: ${form.message}`);
    lines.push('', 'I have made the payment — attaching the screenshot here.');
    return lines.join('\n');
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.consentAgreed) {
      setStatus('Please agree to the Informed Consent for Telemedicine Consultation before submitting.');
      return;
    }

    // No DB save any more — the booking goes straight to WhatsApp.
    openWhatsApp(buildWhatsappMessage(), whatsappNumber);
    navigate('/thank-you');
  };

  const qrImage = data.paymentQrImage?.url;
  const doctorPhoto = data.paymentDoctorPhoto?.url;

  return (
    <Layout>
      <PageMeta pageKey="online-consultation" fallbackTitle="Online Consultation - Dr. Aakansh Jain" />
      <Breadcrumb title="Online Consultation" />

      <section className="oc-section">
        <div className="oc-wrap">
          {/* ---------- Intro ---------- */}
          <div className="oc-head">
            <span className="oc-eyebrow">{data.eyebrow}</span>
            <h2>{data.introHeading}</h2>
            <p>{data.introParagraph1}</p>
            <p className="oc-lead">{data.introParagraph2}</p>
          </div>

          {/* ---------- Process steps ---------- */}
          {!!data.processSteps?.length && (
            <div className="oc-process">
              <h3 className="oc-process-heading">{data.processHeading}</h3>
              <div className="oc-process-track">
                {data.processSteps.map((step, i) => (
                  <div className="oc-process-step" key={i}>
                    <div className="oc-process-circle">
                      <i className={step.icon || 'fa-light fa-circle'}></i>
                    </div>
                    <p>{step.title}</p>
                    {i < data.processSteps.length - 1 && <span className="oc-process-arrow">›</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---------- Booking form + fee/payment card ---------- */}
          <div className="oc-grid">
            <div className="oc-form-card">
              <h3>{data.formHeading}</h3>
              <form onSubmit={submit}>
                <div className="oc-field">
                  <label htmlFor="oc-name">Name *</label>
                  <input
                    id="oc-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div className="oc-field">
                  <label htmlFor="oc-mobile">Mobile Number *</label>
                  <input
                    id="oc-mobile"
                    type="tel"
                    required
                    value={form.mobile}
                    onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                  />
                </div>

                <div className="oc-field">
                  <label>Appointment Type *</label>
                  <div className="oc-radio-row">
                    <label className="oc-radio">
                      <input
                        type="radio"
                        name="appointmentType"
                        checked={form.appointmentType === 'new'}
                        onChange={() => setForm({ ...form, appointmentType: 'new' })}
                      />
                      New Appointment
                    </label>
                    <label className="oc-radio">
                      <input
                        type="radio"
                        name="appointmentType"
                        checked={form.appointmentType === 'review'}
                        onChange={() => setForm({ ...form, appointmentType: 'review' })}
                      />
                      Review Patient
                    </label>
                  </div>
                  {form.appointmentType === 'review' && (
                    <input
                      type="text"
                      className="oc-sub-input"
                      placeholder="Nova / Clinic registration ID No."
                      value={form.reviewRegistrationId}
                      onChange={(e) => setForm({ ...form, reviewRegistrationId: e.target.value })}
                    />
                  )}
                </div>

                <div className="oc-field">
                  <label htmlFor="oc-date">Preferred Date Of Appointment</label>
                  <input
                    id="oc-date"
                    type="date"
                    value={form.preferredDate}
                    onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                  />
                </div>

                <div className="oc-field">
                  <label htmlFor="oc-message">Message *</label>
                  <textarea
                    id="oc-message"
                    rows="4"
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  ></textarea>
                </div>

                <div className="oc-consent-row">
                  <label className="oc-checkbox">
                    <input
                      type="checkbox"
                      checked={form.consentAgreed}
                      onChange={(e) => setForm({ ...form, consentAgreed: e.target.checked })}
                    />
                    <span>{data.consentCheckboxLabel}</span>
                  </label>
                  <button type="button" className="oc-view-consent" onClick={() => setShowConsent(true)}>
                    <i className="fa-solid fa-file-lines"></i> {data.viewConsentLinkText}
                  </button>
                </div>

                <button className="oc-submit" type="submit" disabled={status === 'loading'}>
                  <span>{status === 'loading' ? 'Sending...' : data.submitButtonText}</span>
                  <span className="oc-submit-icon">
                    <i className="fa-brands fa-whatsapp"></i>
                  </span>
                </button>
                <p className="oc-whatsapp-hint">
                  <i className="fa-brands fa-whatsapp"></i> This opens WhatsApp with your details filled in —
                  attach your payment screenshot there and hit send.
                </p>
                {status && status !== 'loading' && <p className="oc-status">{status}</p>}
              </form>
            </div>

            <div className="oc-side">
              {/* ---------- Fee table ---------- */}
              <div className="oc-card">
                <p className="oc-fee-heading">{data.feeTableHeading}</p>
                <table className="oc-fee-table">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Client</th>
                      <th>Fee</th>
                      <th>Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(data.feeRows || []).map((row, i) => (
                      <tr key={i}>
                        <td>{row.type}</td>
                        <td>{row.client}</td>
                        <td>{row.fee}</td>
                        <td>{row.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {data.feeTableNote && <p className="oc-fee-note">{data.feeTableNote}</p>}
              </div>

              {/* ---------- Payment ---------- */}
              <div className="oc-card">
                <h4>{data.paymentHeading}</h4>
                <div className="oc-payment-brands">
                  <i className="fa-brands fa-google-pay"></i>
                  <span>/</span>
                  <span className="oc-paytm">Paytm</span>
                </div>
                <div className="oc-payment-visuals">
                  {doctorPhoto && (
                    <div className="oc-payment-photo">
                      <img src={doctorPhoto} alt={data.consentDoctorName || 'Doctor'} />
                      <p>{data.paymentDoctorPhotoCaption}</p>
                    </div>
                  )}
                  {qrImage && (
                    <button
                      type="button"
                      className="oc-payment-qr oc-payment-qr-btn"
                      onClick={() => setShowQrZoom(true)}
                      aria-label="View larger QR code"
                    >
                      <img src={qrImage} alt="Payment QR code" />
                      <span className="oc-payment-qr-zoom-icon">
                        <i className="fa-light fa-magnifying-glass-plus"></i>
                      </span>
                    </button>
                  )}
                </div>
                <p className="oc-payment-line">
                  UPI ID: <strong>{data.upiId}</strong>
                </p>
                <p className="oc-payment-line">
                  Mob: <strong>{data.paymentMobile}</strong>
                </p>
                {data.paymentNote && <p className="oc-payment-note">{data.paymentNote}</p>}
              </div>
            </div>
          </div>

          {/* ---------- Terms ---------- */}
          <div className="oc-terms">
            <h3>{data.termsHeading}</h3>
            <ol>
              {(data.termsItems || []).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ol>
            {data.regulationNote && <p className="oc-regulation">{data.regulationNote}</p>}
          </div>
        </div>
      </section>

      {/* ---------- QR zoom popup ---------- */}
      {showQrZoom && qrImage && (
        <div className="oc-modal-overlay oc-qr-modal-overlay" onClick={() => setShowQrZoom(false)}>
          <div className="oc-qr-modal" onClick={(e) => e.stopPropagation()}>
            <button className="oc-modal-close" onClick={() => setShowQrZoom(false)} aria-label="Close">
              &times;
            </button>
            <img src={qrImage} alt="Payment QR code" />
            <p>
              UPI ID: <strong>{data.upiId}</strong>
            </p>
          </div>
        </div>
      )}

      {/* ---------- Informed Consent popup ---------- */}
      {showConsent && (
        <div className="oc-modal-overlay" onClick={() => setShowConsent(false)}>
          <div className="oc-modal" onClick={(e) => e.stopPropagation()}>
            <button className="oc-modal-close" onClick={() => setShowConsent(false)} aria-label="Close">
              ×
            </button>
            <h3>{data.consentModalTitle}</h3>

            <h4>{data.consentGuidelinesHeading}</h4>
            <ul>
              {(data.consentGuidelinesItems || []).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <h4>{data.consentDoctorHeading}</h4>
            <p className="oc-doctor-id">
              <strong>{data.consentDoctorName}</strong>
              {data.consentDoctorQualification && <><br />{data.consentDoctorQualification}</>}
              {data.consentDoctorCouncil && <><br />{data.consentDoctorCouncil}</>}
              {data.consentDoctorRegNo && <><br />Reg. No. {data.consentDoctorRegNo}</>}
            </p>

            <h4>{data.consentAppointmentSlotsHeading}</h4>
            <p>{data.consentAppointmentSlotsText}</p>

            <h4>{data.consentIntroHeading}</h4>
            <p>{data.consentIntroText}</p>
            <ul>
              {(data.consentIntroItems || []).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p>{data.consentIntroFooter}</p>

            <h4>{data.consentBenefitsHeading}</h4>
            <ul>
              {(data.consentBenefitsItems || []).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <h4>{data.consentRisksHeading}</h4>
            <p>{data.consentRisksIntro}</p>
            <ul>
              {(data.consentRisksItems || []).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p>{data.consentFinancialText}</p>

            <h4>{data.consentExplicitHeading}</h4>
            <p>{data.consentExplicitIntro}</p>
            <ul>
              {(data.consentExplicitItems || []).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <p className="oc-consent-footer">{data.consentFooterText}</p>

            <div className="oc-modal-actions">
              <label className="oc-checkbox">
                <input
                  type="checkbox"
                  checked={form.consentAgreed}
                  onChange={(e) => setForm({ ...form, consentAgreed: e.target.checked })}
                />
                <span>{data.consentCheckboxLabel}</span>
              </label>
              <button type="button" className="oc-modal-done" onClick={() => setShowConsent(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}