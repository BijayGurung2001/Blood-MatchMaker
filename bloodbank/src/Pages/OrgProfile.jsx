import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../css/orgprofile.css';
import NavBar from '../Components/NavBar';
import { useNavigate } from 'react-router-dom';

const OrgProfile = () => {
  const [links, setLinks] = useState('inventory');
  const [orgData, setOrgData] = useState({});
  const [bloodStorageData, setBloodStorageData] = useState([]);
  const [newBloodData, setNewBloodData] = useState({});
  const navigate = useNavigate();
  const id = localStorage.getItem('id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:5000/orgprofile', { id });
        const data = response.data;
        if (data) {
          setOrgData(data.org);
        } else {
          console.log("No data found");
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (id) {
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    const fetchBloodStorageData = async () => {
      try {
        const response = await axios.post('http://localhost:5000/orginventory', { id });
        const data = response.data;
        if (data) {
          setBloodStorageData(data);
        } else {
          console.log("No blood storage data found");
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (id && links === 'inventory') {
      fetchBloodStorageData();
    }
  }, [id, links]);

  const handleLogout = () => {
    localStorage.removeItem('id');
    navigate('/orglogin');
  };

  const handleClick = (e) => {
    setLinks(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBloodData({ ...newBloodData, [name]: parseInt(value) });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/updateinventory', { id, bloodData: newBloodData });
      if (response.status === 200) {
        alert('Inventory updated successfully');
        setLinks('inventory');
        // Fetch the updated inventory data
        const updatedResponse = await axios.post('http://localhost:5000/orginventory', { id });
        setBloodStorageData(updatedResponse.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="org_profile">
      <NavBar />
      <div className="org_info">
        <div className='org_details'>
          {orgData ? (
            <>
              <tr>
                <th id='org_data'>Organization Details :</th>
              </tr>
              <tr>
                <td id='org_data'>ID :</td>
                <td id='org_data'>{orgData.org_id}</td>
              </tr>
              <tr>
                <td id='org_data'>Name :</td>
                <td id='org_data'>{orgData.orgname}</td>
              </tr>
              <tr>
                <td id='org_data'>Address :</td>
                <td id='org_data'>{orgData.orgaddress}</td>
              </tr>
              <tr>
                <td id='org_data'>Contact :</td>
                <td id='org_data'>{orgData.orgcontact}</td>
              </tr>
              <tr>
                <td id='org_data'>Email :</td>
                <td id='org_data'>{orgData.orgemail}</td>
              </tr>
              <p>UPDATE INFO</p>
              <p>Delete Account</p>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <p>No data available</p>
          )}
        </div>
        <div className="org_selection">
          <div className="org_links">
            <li><button onClick={handleClick} value='inventory'>Inventory</button></li>
            <li><button onClick={handleClick} value='update'>Update</button></li>
            <li><button onClick={handleClick} value='requests'>Requests</button></li>
          </div>
          <div className="org_links_details">
            {links === 'inventory' && bloodStorageData.length > 0 ? (
              bloodStorageData.map((item) => (
                <div className="bloodtypes" key={item.storage_id}>
                  <p>O+ Plasma: {item['o+plasma']}</p>
                  <p>O+ Red Cell: {item['o+redcell']}</p>
                  <p>O- Plasma: {item['o-plasma']}</p>
                  <p>O- Red Cell: {item['o-redcell']}</p>
                  <p>A+ Plasma: {item['a+plasma']}</p>
                  <p>A+ Red Cell: {item['a+redcell']}</p>
                  <p>A- Plasma: {item['a-plasma']}</p>
                  <p>A- Red Cell: {item['a-redcell']}</p>
                  <p>B+ Plasma: {item['b+plasma']}</p>
                  <p>B+ Red Cell: {item['b+redcell']}</p>
                  <p>B- Plasma: {item['b-plasma']}</p>
                  <p>B- Red Cell: {item['b-redcell']}</p>
                  <p>AB+ Plasma: {item['ab+plasma']}</p>
                  <p>AB+ Red Cell: {item['ab+redcell']}</p>
                  <p>AB- Plasma: {item['ab-plasma']}</p>
                  <p>AB- Red Cell: {item['ab-redcell']}</p>
                </div>
              ))
            ) : (
              <p>.</p>
            )}
            {links === 'update' && (
              <form onSubmit={handleUpdateSubmit}>
                {['o+plasma', 'o+redcell', 'o-plasma', 'o-redcell', 'a+plasma', 'a+redcell', 'a-plasma', 'a-redcell', 'b+plasma', 'b+redcell', 'b-plasma', 'b-redcell', 'ab+plasma', 'ab+redcell', 'ab-plasma', 'ab-redcell'].map((type) => (
                  <div key={type} className="bloodtypes">
                    <label>{type}:</label>
                    <input
                      type="number"
                      name={type}
                      value={newBloodData[type] || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                ))}
                <button type="submit">Update Inventory</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgProfile;
