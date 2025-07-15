import React, { createContext, useContext, useState } from 'react';

const UrlContext = createContext(undefined);

export const useUrlContext = () => {
  const context = useContext(UrlContext);
  if (!context) {
    throw new Error('useUrlContext must be used within a UrlProvider');
  }
  return context;
};

export const UrlProvider = ({ children }) => {
  const [urls, setUrls] = useState([]);

  const addUrl = (url) => {
    setUrls(prev => [...prev, url]);
  };

  const updateUrl = (shortcode, updates) => {
    setUrls(prev => prev.map(url => 
      url.shortcode === shortcode ? { ...url, ...updates } : url
    ));
  };

  const findByShortcode = (shortcode) => {
    return urls.find(url => url.shortcode === shortcode);
  };

  return (
    <UrlContext.Provider value={{ urls, addUrl, updateUrl, findByShortcode }}>
      {children}
    </UrlContext.Provider>
  );
};