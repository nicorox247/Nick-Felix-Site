import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import '../styles/Contact.css';

import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';


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
    <div className='pb-10 md:pb-5'>
      <h1 className="text-4xl font-bold m-8 text-center">Get In Touch!</h1>

    <div className=" mx-auto px-6 py-20 max-w-[95%] md:max-w-[80%] rounded-2xl bg-light">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column – Contact Info */}
        <div className="space-y-6 flex flex-col items-center text-center">
          <h2 className="text-2xl font-semibold">Let's work together</h2>
          <p className="text-muted">
            I'm always interested in new opportunities and exciting projects. Whether you have a question or just want to say hi, feel free to reach out!
          </p>
          <div className="space-y-4 text-2xl xl:text-3xl">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-highlight" />
              <h2 className=''>nf2574@columbia.edu</h2>
            </div>
            <div className="flex items-center gap-3">
              <FaPhone className="text-highlight" />
              <h2 className=''>(949)-771-4265</h2>
            </div>
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-highlight" />
              <h2 className=''>New York, NY</h2>
            </div>
          </div>
        </div>

        {/* Right Column – Contact Form */}
        <div className="bg-light p-10 rounded-lg border border-muted shadow-lg">
          <h3 className="text-xl font-semibold mb-1 pt-2">Send a Message</h3>
          <p className="text-muted mb-6 text-sm">Fill out the form and I’ll get back to you as soon as possible.</p>

          <form ref={form} onSubmit={sendEmail} className="space-y-5">
            <div>
              {errors.user_name && <p className="error-msg">{errors.user_name}</p>}
              <input
                type="text"
                name="user_name"
                placeholder="Your Name"
                value={formValues.user_name}
                onChange={handleChange}
                className={`input-style ${errors.user_name ? 'border-error' : ''}`}
              />
            </div>

            <div>
              {errors.user_email && <p className="error-msg">{errors.user_email}</p>}
              <input
                type="email"
                name="user_email"
                placeholder="Your Email"
                value={formValues.user_email}
                onChange={handleChange}
                className={`input-style ${errors.user_email ? 'border-error' : ''}`}
              />
            </div>

            <div>
              {errors.message && <p className="error-msg">{errors.message}</p>}
              <textarea
                name="message"
                rows="5"
                placeholder="Your Message"
                value={formValues.message}
                onChange={handleChange}
                className={`input-style ${errors.message ? 'border-error' : ''}`}
              />
            </div>

            <button type="submit" disabled={loading} className="w-full px-6 py-3 rounded-lg button-primary text-lg">
              {loading ? 'Sending...' : 'Send'}
            </button>

            {sent && <p className="text-green-600 text-sm pt-2">Message sent to my email successfully!</p>}
          </form>
        </div>
      </div>
    </div>
    </div>
  );

}
