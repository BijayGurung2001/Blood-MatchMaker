import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useGeolocated } from 'react-geolocated';
import '../css/Userprofile.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [bloodType, setBloodType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [bloodBanks, setBloodBanks] = useState([]);
  const [tab, setTab] = useState('history');
  const navigate = useNavigate();

  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    if (!loggedUser) {
      navigate('/login');
    } else {
      setUser(loggedUser);
      // Fetch user history
      axios.get(`http://localhost:5000/history?email=${loggedUser.email}`)
        .then(response => setHistory(response.data))
        .catch(error => console.error('Error fetching history:', error));
      // Fetch random blood banks
      axios.get('http://localhost:5000/bloodbanks')
        .then(response => setBloodBanks(response.data))
        .catch(error => console.error('Error fetching blood banks:', error));
    }
  }, [navigate]);

  useEffect(() => {
    if (user && coords) {
      axios.post('http://localhost:5000/update-location', {
        userId: user.id,
        latitude: coords.latitude,
        longitude: coords.longitude,
      }).then(response => {
        console.log(response.data.message);
      }).catch(error => {
        console.error('Error updating location:', error);
      });
    }
  }, [user, coords]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/search', { bloodType, quantity, latitude: coords?.latitude, longitude: coords?.longitude })
      .then(response => setBloodBanks(response.data))
      .catch(error => console.error('Error searching:', error));
  };

  const handleDirection = (latitude, longitude) => {
    if (coords) {
      const origin = `${coords.latitude},${coords.longitude}`;
      const destination = `${latitude},${longitude}`;
      const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
      window.open(googleMapsUrl, '_blank');
    } else {
      console.error('User location is not available');
    }
  };

  return (
    <div className="userprofile">
      <header>
        <div className="logo">Blood MatchMaker</div>
        <nav>
          <button onClick={() => navigate('/details')}>Details</button>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </header>
      <div className="profile-container">
        <aside>
          <img src="/path/to/profile-pic.jpg" alt="Profile" id="profile_pic"/>
          <div className="details_main">
            <p>Name: {user?.fullname}</p>
            <p>Email: {user?.email}</p>
            <p>Date of Birth: {user?.dob}</p>
            <p>Blood Type: {user?.bloodtype}</p>
            <button onClick={() => navigate('/edit-info')}>Edit Info</button>
          </div>
        </aside>
        <main>
          <div className="tabs">
            <button onClick={() => setTab('history')}>History</button>
            <button onClick={() => setTab('search')}>Search</button>
            <button onClick={() => setTab('donation')}>Donation</button>
          </div>
          <section className="tab-content">
            {tab === 'history' && <History history={history} />}
            {tab === 'search' && (
              <Search 
                bloodType={bloodType}
                setBloodType={setBloodType}
                quantity={quantity}
                setQuantity={setQuantity}
                handleSearch={handleSearch} 
                bloodBanks={bloodBanks} 
                handleDirection={handleDirection}
              />
            )}
            {tab === 'donation' && <Donation />}
          </section>
        </main>
      </div>
    </div>
  );
};

const History = ({ history }) => (
  <div className="history">
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Organization</th>
          <th>Charge</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {history.map((entry, index) => (
          <tr key={index}>
            <td>{entry.date}</td>
            <td>{entry.organization}</td>
            <td>{entry.charge}</td>
            <td>{entry.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Search = ({ bloodType, setBloodType, quantity, setQuantity, handleSearch, bloodBanks, handleDirection }) => (
  <div className="search">
    <h2 className='search_heading'>Search for Blood</h2>
    <p className='search_p'>Important notice: Please bring the documents that are provided by the hospital and provide them to the blood bank operator before receiving blood. Carry loose transportation fees from respective hospital authorities.</p>
    <form onSubmit={handleSearch}>
      <select className='search_option' value={bloodType} onChange={(e) => setBloodType(e.target.value)}>
        <option value="">Select Blood Type</option>
        <option value="o+plasma">O+ Plasma</option>
        <option value="o+redcell">O+ Red Cell</option>
        <option value="o-plasma">O- Plasma</option>
        <option value="o-redcell">O- Red Cell</option>
        <option value="a+plasma">A+ Plasma</option>
        <option value="a+redcell">A+ Red Cell</option>
        <option value="a-plasma">A- Plasma</option>
        <option value="a-redcell">A- Red Cell</option>
        <option value="b+plasma">B+ Plasma</option>
        <option value="b+redcell">B+ Red Cell</option>
        <option value="b-plasma">B- Plasma</option>
        <option value="b-redcell">B- Red Cell</option>
        <option value="ab+plasma">AB+ Plasma</option>
        <option value="ab+redcell">AB+ Red Cell</option>
        <option value="ab-plasma">AB- Plasma</option>
        <option value="ab-redcell">AB- Red Cell</option>
      </select>
      <input
        className='search_option' 
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
    <ul className="search-results">
      {bloodBanks.map((bank, index) => (
        <li key={index} className="search-result-item">
          <p><strong>Organization Name:</strong> {bank.orgname}</p>
          <p><strong>Address:</strong> {bank.orgaddress}</p>
          <p><strong>Contact:</strong> {bank.orgcontact}</p>
          <p><strong>Email:</strong> {bank.orgemail}</p>
          <p><strong>Available Quantity:</strong> {bank[bloodType]}</p>
          <button>Book now</button>
          <button onClick={() => handleDirection(bank.latitude, bank.longitude)}>Direction</button>
        </li>
      ))}
    </ul>
  </div>
);

const Donation = () => (
  <div className="donation">
   <p>There is no features available right now</p>
  </div>
);

export default UserProfile;
