
import { log } from '../../Logging_Midddleware/logging.js'; 
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UrlProvider } from './contextProvider/UrlContext';
import Header from './components/Header';
import UrlShortener from './components/UrlShortener';
import Statistics from './components/Statistics';
import RedirectHandler from './components/RedirectHandler';
import NotFound from './components/NotFound';

function App() {
  const handleClick = () => {
    log("info", "component", "User clicked the Log button");
  };

  return (
    <>
    
    <UrlProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<UrlShortener />} />
              <Route path="/stats" element={<Statistics />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="/:shortcode" element={<RedirectHandler />} />
            </Routes>
          </main>
        </div>
      </Router>
    </UrlProvider>
    
    <div className='test-logger' >
      <p>Testing logger</p>
       <button onClick={handleClick}>Send Log</button>
     </div>
    </>
  );
}

export default App;
