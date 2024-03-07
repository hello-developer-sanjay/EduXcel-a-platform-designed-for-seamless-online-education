import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/CourseList.css';
import courseImage1 from '../assets/full2.webp';
import courseImage2 from '../assets/binary2.webp';

function CareerList() {
  const [careers, setCareers] = useState([]);
  const { vision } = useParams();

  useEffect(() => {
    async function fetchCareers() {
      try {
        let response;
        if (!vision || vision === 'all') {
          response = await axios.get('https://personal-dzjh.onrender.com/api/careers/vision/all');
        } else {
          response = await axios.get(`https://personal-dzjh.onrender.com/api/careers/vision/${vision}`);
        }
        if (!response) {
          response = await axios.get('https://personal-dzjh.onrender.com/api/careers/vision');
        }
        setCareers(response.data);
      } catch (error) {
        console.error('Error fetching careers:', error);
      }
    }

    fetchCareers();
  }, [vision]);

  const uniqueCategories = Array.from(new Set(careers.map(career => career.vision)));

 


 
  return (
    <div className="course-list">
      <div className="course-cards">
        {uniqueCategories.map((vision, index) => {
          const career = careers.find(career => career.vision === vision);
          const image = getImageForVision(vision);
          return (
            <div
              className="course-card"
              key={index} // Use index as key since vision itself is not unique
            
            >
              <Link to={`/career/${vision}`}>
                <div
                  className="course-image"
                  style={{
                    backgroundImage: `url(${image})`,
                  }}
                ></div>
                <div className="course-info">
                  <h3>{vision}</h3>
                  <p>{career.description}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
  
    </div>
  );
}

// Function to get the image URL for each category
function getImageForVision(vision) {
  // You can modify this function based on your logic to map categories to images
  switch (vision) {
    case 'frontend_development_careers':
      return courseImage1;
    case 'backend_development_careers':
      return courseImage2;
 
    default:
      return ''; 
  }
}

export default CareerList;