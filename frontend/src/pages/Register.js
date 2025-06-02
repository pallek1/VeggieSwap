import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '', city: '', password: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      console.log('📦 Server Response:', data);

      if (!res.ok) {
        // Show specific error if available
        throw new Error(data.msg || 'Registration failed');
      }

      alert(data.msg || 'User registered successfully!');
    } catch (err) {
      console.error('❌ Register error:', err);
      alert(err.message || 'Error registering user');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Register 🌽</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required /><br />
        <input name="email" placeholder="Email" onChange={handleChange} required /><br />
        <input name="phone" placeholder="Phone" onChange={handleChange} required /><br />
        <input name="address" placeholder="Address" onChange={handleChange} required /><br />
        <input name="city" placeholder="City" onChange={handleChange} required /><br />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required /><br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
