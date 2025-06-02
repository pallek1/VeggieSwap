import React, { useEffect, useState } from 'react';

const VeggieMarket = () => {
  const [veggies, setVeggies] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    tradeType: 'barter'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, barter, coins

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('veggies')) || [];
    setVeggies(saved);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAdd = (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));
    const newVeggie = {
      ...formData,
      ownerId: user?.id || 'unknown',
      ownerName: user?.name || 'Anonymous'
    };

    const updated = [...veggies, newVeggie];
    setVeggies(updated);
    localStorage.setItem('veggies', JSON.stringify(updated));

    if (formData.tradeType === 'coins') {
      const currentCoins = parseInt(localStorage.getItem('coins')) || 0;
      localStorage.setItem('coins', currentCoins + 10);
      alert('Veggie added! +10 coins 🎉');
    } else {
      alert('Veggie added for barter!');
    }

    setFormData({ name: '', quantity: '', tradeType: 'barter' });
  };

  // 🔍 Search + Filter logic
  const filteredVeggies = veggies.filter((veg) => {
    const matchesSearch = veg.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterType === 'all' ? true : veg.tradeType === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div style={{ padding: '30px' }}>
      <h2>🥦 Veggie Market</h2>

      <form onSubmit={handleAdd}>
        <input
          name="name"
          placeholder="Veggie Name"
          value={formData.name}
          onChange={handleChange}
          required
        /><br />
        <input
          name="quantity"
          placeholder="Quantity (e.g. 2kg)"
          value={formData.quantity}
          onChange={handleChange}
          required
        /><br />
        <label>Trade Type:</label>
        <select name="tradeType" value={formData.tradeType} onChange={handleChange}>
          <option value="barter">Barter</option>
          <option value="coins">Sell for Coins</option>
        </select><br />
        <button type="submit">Add Veggie</button>
      </form>

      <hr />

      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="🔍 Search veggies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        &nbsp;&nbsp;
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">Show All</option>
          <option value="barter">Only Barter</option>
          <option value="coins">Only Coins</option>
        </select>
      </div>

      <h3>🛒 Listed Vegetables:</h3>
      <ul>
        {filteredVeggies.map((veg, index) => (
          <li key={index}>
            {veg.name} - {veg.quantity} [{veg.tradeType}] — Added by {veg.ownerName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VeggieMarket;
