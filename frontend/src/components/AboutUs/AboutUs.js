import React from 'react';
import './AboutUs.css';

const aboutUsData = [
  {
    title: 'Our Vision',
    description: 'At Scholar\'s Library, our vision is to be a leading and innovative library that empowers the community by providing access to a diverse range of knowledge resources. We strive to create an environment that fosters a love for reading and learning, and promotes intellectual curiosity among our patrons.',
  },
  {
    title: 'Our Mission',
    description: 'Our mission is to facilitate lifelong learning and personal growth by offering a comprehensive collection of books, digital resources, and educational materials. We are dedicated to providing excellent library services that meet the diverse needs of our users, including students, faculty, researchers, and the general public.',
  },
  {
    title: 'Library Services',
    description: 'Scholar\'s Library offers a wide range of services to enhance the library experience for our users. From borrowing physical books and accessing digital resources to research assistance. Our aim is to support the academic and intellectual pursuits of our patrons.',
  },
  {
    title: 'Community Engagement',
    description: 'We believe in actively engaging with the community we serve. Through book clubs, workshops we seek to create a sense of belonging and promote a culture of reading and learning in the local community.',
  },
];

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h1 className="about-us-heading">About Scholar's Library</h1>
      <div className="about-us-sections">
        {aboutUsData.map((section, index) => (
          <div key={index} className="about-us-section">
            <h3 className="section-title">{section.title}</h3>
            <p className="section-description">{section.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
