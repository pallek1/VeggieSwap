import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [veggies, setVeggies] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    isForTrade: true
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('veggies')) || [];
    setVeggies(saved);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const updated = [...veggies, formData];
    setVeggies(updated);
    localStorage.setItem('veggies', JSON.stringify(updated));
    setFormData({ name: '', quantity: '', isForTrade: true });
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>👋 Welcome, {user?.name || 'Friend'}!</h2>

      <h3>Add a Vegetable 🥕</h3>
      <form onSubmit={handleAdd}>
        <input
          name="name"
          placeholder="Veggie Name"
          value={formData.name}
          onChange={handleChange}
        /><br />
        <input
          name="quantity"
          placeholder="Quantity (e.g. 2kg)"
          value={formData.quantity}
          onChange={handleChange}
        /><br />
        <label>
          <input
            type="checkbox"
            name="isForTrade"
            checked={formData.isForTrade}
            onChange={handleChange}
          />
          Barter Trade
        </label><br />
        <button type="submit">Add Veggie</button>
      </form>

      <h3>Your Vegetables 🛒</h3>
      <ul>
        {veggies.map((veg, index) => (
          <li key={index}>
            {veg.name} - {veg.quantity} [{veg.isForTrade ? 'Barter' : 'Sell'}]
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
