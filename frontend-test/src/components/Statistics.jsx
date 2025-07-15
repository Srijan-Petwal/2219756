import React, { useState } from 'react';
import { useUrlContext } from '../contextProvider/UrlContext';

const Statistics = () => {
  const { urls } = useUrlContext();
  const [expandedRows, setExpandedRows] = useState(new Set());

  const toggleRow = (shortcode) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(shortcode)) {
      newExpanded.delete(shortcode);
    } else {
      newExpanded.add(shortcode);
    }
    setExpandedRows(newExpanded);
  };

  if (urls.length === 0) {
    return (
      <div className="statistics">
        <h2>URL Statistics</h2>
        <p className="no-data">Nothing here! .</p>
      </div>
    );
  }

  return (
    <div className="statistics">
      <h2>URL Statistics</h2>
      <p className="stats-summary">Total URLs shortened: {urls.length}</p>
      
      <div className="stats-table">
        <table>
          <thead>
            <tr>
              <th>Original URL</th>
              <th>Shortened URL</th>
              <th>Creation Time</th>
              <th>Expiry Time</th>
              <th>Total Clicks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url) => (
              <React.Fragment key={url.shortcode}>
                <tr className="main-row">
                  <td className="original-url">{url.originalUrl}</td>
                  <td>
                    <a href={url.shortUrl} target="_blank" rel="noopener noreferrer">
                      {url.shortUrl}
                    </a>
                  </td>
                  <td>{url.creationTime.toLocaleString()}</td>
                  <td className={new Date() > url.expiryTime ? 'expired' : ''}>
                    {url.expiryTime.toLocaleString()}
                    {new Date() > url.expiryTime && <span className="expired-badge">Expired</span>}
                  </td>
                  <td>{url.clicks}</td>
                  <td>
                    <button
                      onClick={() => toggleRow(url.shortcode)}
                      className="expand-btn"
                    >
                      {expandedRows.has(url.shortcode) ? 'Hide Details' : 'Show Details'}
                    </button>
                  </td>
                </tr>
                
                {expandedRows.has(url.shortcode) && (
                  <tr className="expanded-row">
                    <td colSpan={6}>
                      <div className="click-details">
                        <h4>Detailed Click Data</h4>
                        {url.clickDetails.length === 0 ? (
                          <p className="no-clicks">No clicks recorded yet.</p>
                        ) : (
                          <table className="click-details-table">
                            <thead>
                              <tr>
                                <th>Timestamp</th>
                                <th>Source</th>
                                <th>Location</th>
                              </tr>
                            </thead>
                            <tbody>
                              {url.clickDetails.map((click, index) => (
                                <tr key={index}>
                                  <td>{click.timestamp.toLocaleString()}</td>
                                  <td>{click.source}</td>
                                  <td>{click.location}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Statistics;