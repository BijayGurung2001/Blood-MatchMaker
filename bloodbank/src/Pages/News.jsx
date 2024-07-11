// src/NewsPage.js
import React, { useEffect, useState } from 'react';
import '../css/N.css'
import NavBar from '../Components/NavBar'
const NewsPage = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Mock data for the latest news from various blood bank organizations in Nepal
    const latestNews = [
      {
        id: 1,
        title: "Nepal Red Cross Society Launches New Blood Donation Campaign",
        date: "2024-07-10",
        content: "The Nepal Red Cross Society has launched a new blood donation campaign to increase awareness and encourage more donations.",
      },
      {
        id: 2,
        title: "Kathmandu Blood Bank Hosts Blood Donation Drive",
        date: "2024-07-08",
        content: "Kathmandu Blood Bank organized a successful blood donation drive, collecting over 500 units of blood.",
      },
      {
        id: 3,
        title: "Pokhara Blood Bank Expands Services",
        date: "2024-07-07",
        content: "Pokhara Blood Bank has expanded its services to include 24/7 emergency blood delivery.",
      },
    ];
    setNews(latestNews);
  }, []);

  return (
    <>
    <NavBar/>
    <div className="news-page">
      <h1>Latest News from Blood Banks in Nepal</h1>
      {news.map((item) => (
        <div key={item.id} className="news-item">
          <h2>{item.title}</h2>
          <p className="news-date">{item.date}</p>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
    </>
  );
};

export default NewsPage;
