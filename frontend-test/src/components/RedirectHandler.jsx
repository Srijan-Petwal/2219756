import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useUrlContext } from '../contextProvider/UrlContext';

const RedirectHandler = () => {
  const { shortcode } = useParams();
  const { findByShortcode, updateUrl } = useUrlContext();
  
  useEffect(() => {
    if (!shortcode) {
      return;
    }
    
    const urlObject = findByShortcode(shortcode);
    
    if (!urlObject) {
      
      return;
    }
    

    if (new Date() > urlObject.expiryTime) {
      // URL expired, will redirect to 404
      return;
    }
    
    
    const locations = ['Mumbai, India', 'Delhi, India', 'Bangalore, India', 'Chennai, India', 'Kolkata, India'];
    const randomLocation = mockLocations[Math.floor(Math.random() * locations.length)];
    
    const newClickDetail = {
      timestamp: new Date(),
      source: 'Direct',
      location: randomLocation
    };
    
    const updatedClickDetails = [...urlObject.clickDetails, newClickDetail];
    
    updateUrl(shortcode, {
      clicks: urlObject.clicks + 1,
      clickDetails: updatedClickDetails
    });
    
    // Redirect to original URL
    window.location.href = urlObject.originalUrl;
  }, [shortcode, findByShortcode, updateUrl]);
  
  if (!shortcode) {
    return <Navigate to="/404" replace />;
  }
  
  const urlObject = findByShortcode(shortcode);
  
  if (!urlObject || new Date() > urlObject.expiryTime) {
    return <Navigate to="/404" replace />;
  }
  
  return (
    <div className="redirect-handler">
      <div className="redirect-message">
        <h2>Redirecting...</h2>
        <p>You will be redirected to: {urlObject.originalUrl}</p>
        <p>If you are not redirected automatically, <a href={urlObject.originalUrl}>click here</a>.</p>
      </div>
    </div>
  );
};

export default RedirectHandler;