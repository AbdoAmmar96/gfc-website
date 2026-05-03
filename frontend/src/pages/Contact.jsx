import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Mail, Phone, MapPin, Send, ChevronLeft, ChevronRight } from 'lucide-react';
import SEO from '../components/SEO';
import { fetchSettings, submitContact, publicAsset } from '../lib/api';
import { t as tt } from '../lib/translatable';

const initialForm = { name: '', email: '', phone: '', company: '', subject: '', message: '' };
const MAX_MESSAGE_LENGTH = 500;

export default function Contact() {
  const { t, i18n } = useTranslation();
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [settings, setSettings] = useState(null);
  const Chev = i18n.language === 'ar' ? ChevronLeft : ChevronRight;

  useEffect(() => { fetchSettings().then(setSettings).catch(() => {}); }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'message' && value.length > MAX_MESSAGE_LENGTH) return;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitContact(form);
      toast.success(t('contact.form.success'));
      setForm(initialForm);
    } catch (err) {
      toast.error(t('contact.form.error'));
    } finally {
      setSubmitting(false);
    }
  };

  // Default Riyadh coordinates if no embed configured in settings
  const mapEmbed = settings?.google_maps_embed
    || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29024.43798267897!2d46.6753!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzQ5LjAiTiA0NsKwNDAnMzEuMCJF!5e0!3m2!1sen!2ssa!4v1700000000000';

  return (
    <>
      <SEO title={t('contact.title')} description={t('contact.subtitle')} />

      {/* === Hero with breadcrumb === */}
      <section className="relative min-h-[55vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${publicAsset('/images/hero-contact.jpg')}')` }}
        />
        <div className="hero-overlay" />
        <div className="container-x relative z-10 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              {t('contact.title')}
            </h1>
            <nav className="mt-5 flex items-center justify-center gap-2 text-sm text-white/80">
              <Link to="/" className="hover:text-primary-400 transition">{t('nav.home')}</Link>
              <Chev size={16} />
              <span className="text-primary-400">{t('contact.breadcrumb')}</span>
            </nav>
          </motion.div>
        </div>
      </section>

      {/* === 3 Contact Info Cards === */}
      <section className="py-12 bg-white -mt-20 relative z-20">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {[
            { icon: Mail,   label: t('contact.info.email'),   value: settings?.email_primary || 'itmohgamal@gf-care.com', dir: null },
            { icon: Phone,  label: t('contact.info.phone'),   value: settings?.phone_primary || '+966 50 395 9933', dir: 'ltr' },
            { icon: MapPin, label: t('contact.info.address'), value: settings?.address_line ? tt(settings.address_line) : t('contact.defaults.address'), dir: null },
          ].map(({ icon: Icon, label, value, dir }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="card text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 text-primary-500">
                <Icon size={26} />
              </div>
              <div className="mt-5 text-sm text-ink-500">{label}</div>
              <div className="mt-1 font-semibold text-ink-900" dir={dir || undefined}>{value}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* === Form + Map === */}
      <section className="py-20 bg-white">
        <div className="container-x grid gap-8 lg:grid-cols-2">
          {/* Map (left in RTL = end side; flip via order on mobile) */}
          <div className="rounded-2xl overflow-hidden border border-ink-200 min-h-[420px] order-2 lg:order-1">
            <iframe
              src={mapEmbed}
              className="w-full h-full"
              style={{ minHeight: '420px', border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office location"
            />
          </div>

          {/* Form */}
          <div className="card bg-ink-50 order-1 lg:order-2">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-ink-900">{t('contact.form.heading')}</h2>
            <p className="mt-2 text-ink-500">{t('contact.form.intro')}</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <Field name="name"  type="text"  label={t('contact.form.name')}  required value={form.name}  onChange={handleChange} />
                <Field name="email" type="email" label={t('contact.form.email')} required value={form.email} onChange={handleChange} />
              </div>
              <Field name="subject" type="text" label={t('contact.form.subject')} value={form.subject} onChange={handleChange} />
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-ink-700 mb-1.5">
                  {t('contact.form.message')}
                </label>
                <textarea
                  id="message" name="message" rows={5}
                  value={form.message} onChange={handleChange}
                  maxLength={MAX_MESSAGE_LENGTH}
                  className="w-full rounded-lg border border-ink-200 bg-white px-4 py-3 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition"
                />
                <div className="mt-1 text-xs text-ink-500 text-end-flip">
                  {form.message.length}/{MAX_MESSAGE_LENGTH}
                </div>
              </div>
              <button type="submit" disabled={submitting} className="btn-primary w-full">
                {submitting ? t('contact.form.submitting') : (
                  <>
                    {t('contact.form.submit')}
                    <Send size={16} className="rtl:-scale-x-100" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ name, type, label, value, onChange, required = false }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-ink-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name} name={name} type={type} value={value} onChange={onChange} required={required}
        className="w-full rounded-lg border border-ink-200 bg-white px-4 py-3 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition"
      />
    </div>
  );
}
