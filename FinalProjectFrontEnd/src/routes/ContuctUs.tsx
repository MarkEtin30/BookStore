import React, { useState } from 'react';
import './ContactUs.scss';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real-world app, you would submit the form data to an API.
    // console.log('Form submitted', formData);
    setIsSubmitted(true);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100 dark:bg-gray-800 dark:text-gray-200">
      <div className="contact-us-container  dark:bg-gray-700  dark:text-white-100 bg-gray-300  min-h-screen flex justify-center items-center  py-12 px-6 md:px-12">
       <div className="contact-us-content w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center ">Contact Us</h2>
        <h3 className="text-xl font-bold text-green-600">Mark Etin Phone - 054-762-5856</h3>

        {isSubmitted ? (
          <div className="thank-you-message text-center">
            <h3 className="text-xl font-bold text-green-600">Thank you for reaching out!</h3>
            <p className="text-lg text-gray-600">We will get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 " >
            <div className="form-group">
              <label htmlFor="name" className="block text-sm font-medium text-black-300  ">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-control block w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="block text-sm font-medium  text-black-300">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-control block w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject" className="block text-sm font-medium  text-black-300">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="form-control block w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message" className="block text-sm font-medium  text-black-300">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="form-control block w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <button type="submit" className="btn-submit bg-blue-600  text-black-300 py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
    </div>
  );
};

export default ContactUs;
