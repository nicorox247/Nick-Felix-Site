import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import '../styles/Contact.css';

export default function Contact() {
  const form = useRef();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    user_name: '',
    user_email: '',
    message: ''
  });

  const validate = () => {
    const newErrors = {};
    if (!formValues.user_name.trim()) newErrors.user_name = 'Name is required';
    if (!formValues.user_email.trim()) {
      newErrors.user_email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.user_email)) {
      newErrors.user_email = 'Enter a valid email address';
    }
    if (!formValues.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: null }));
    }
    
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    emailjs.sendForm(
      'service_irc8kqo',
      'template_z7z7iqe',
      form.current,
      'Gdn4aC9Jq5ha5-2y0'
    ).then(() => {
      setSent(true);
      setLoading(false);
      setFormValues({ user_name: '', user_email: '', message: '' });
      form.current.reset();
    }, (error) => {
      console.error('Failed to send:', error);
      setLoading(false);
    });
  };


  return (
    <div className="mx-auto px-6 py-20 media-source border-none">
      <h1 className="text-4xl font-bold mb-4 text-center">Get In Touch!</h1>
      <p className="text-center mb-10 text-muted">Feel free to reach out via the form below. This will send me an email</p>

      <form ref={form} onSubmit={sendEmail} className="space-y-6">

        {errors.user_name && <p className="error-msg">{errors.user_name}</p>}
        <input
          type="text"
          name="user_name"
          placeholder="Your Name"
          value={formValues.user_name}
          onChange={handleChange}

          className={`input-style ${errors.user_name ? 'border-error' : ''}`}
        />
        
        
        {errors.user_email && <p className="error-msg">{errors.user_email}</p>}
        <input
          type="email"
          name="user_email"
          placeholder="Your Email"
          value={formValues.user_email}
          onChange={handleChange}

          className={`input-style ${errors.user_email ? 'border-error' : ''}`}
        />

        {errors.message && <p className="error-msg">{errors.message}</p>}
        <textarea
          name="message"
          rows="6"
          placeholder="Your Message"
          value={formValues.message}
          onChange={handleChange}

          className={`input-style ${errors.message ? 'border-error' : ''}`}
        />

        <button type="submit" disabled={loading} className="px-8 py-3 rounded-lg button-primary text-lg">
          {loading ? 'Sending...' : 'Send'}
        </button>

        {sent && <p className="text-green-600 text-md mt-2">Message sent to my email successfully!</p>}
      </form>
    </div>
  );
}
