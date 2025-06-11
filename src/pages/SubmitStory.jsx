import React, { useState } from 'react';
import './styles/SubmitStory.css'
import { Crown, Star } from "lucide-react"

const SubmitStory = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    story: '',
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple client-side validation
    if (!formData.name || !formData.email || !formData.title || !formData.story) {
      setError('Please fill out all fields.');
      return;
    }

    try {
      const res = await fetch('/api/submit-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      console.log('API response:', result);


      if (result.success) {
        setSuccess(true);
        setError('');
        setFormData({ name: '', email: '', title: '', story: '' });
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    }
  };

  return (
    <div className="form-container">
      <h2>Submit Your Story</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label>Name</label>
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Story Title</label>
        <input
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label>Your Story</label>
        <textarea
          name="story"
          value={formData.story}
          onChange={handleChange}
          required
        />

        <div className="mt-6 mb-6 p-4 border-2 border-football-yellow rounded-lg bg-yellow-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Star className="h-6 w-6 text-football-yellow" />
                <div>
                  <h3 className="font-semibold text-charcoal">Make Priority Story ($5)</h3>
                  <p className="text-sm text-gray-600">Get featured placement and increased visibility</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    className="bg-football-yellow text-charcoal px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors disabled:opacity-50"
                  >
                    Purchase Priority
                  </button>
        </div>
        </div>
        </div>

        <button type="submit" className="btn-primary">Publish Story</button>
      </form>

      {success && (
        <div className="success-message">✅ Thank you for your submission!</div>
      )}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default SubmitStory;