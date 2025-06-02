import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'; // ✅ Import the navigation bar

const BrowseVeggies = () => {
  const [allVeggies, setAllVeggies] = useState([]);

  useEffect(() => {
    const veggies = JSON.parse(localStorage.getItem('veggies')) || [];
    const currentUser = JSON.parse(localStorage.getItem('user'));

    // Filter out current user's veggies (optional enhancement)
    const othersVeggies = veggies.filter(v => v.ownerId !== currentUser?.id);
    setAllVeggies(othersVeggies);
  }, []);

  return (
    <>
      <Navbar /> {/* ✅ Add the navigation bar */}
      <div style={{ padding: '30px' }}>
        <h2>🌍 Browse All Veggies</h2>
        {allVeggies.length === 0 ? (
          <p>No veggies listed yet by others.</p>
        ) : (
          <ul>
            {allVeggies.map((veg, index) => (
              <li key={index}>
                {veg.name} – {veg.quantity} [{veg.isForTrade ? 'Barter' : 'Sell'}] — by {veg.ownerName}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default BrowseVeggies;
