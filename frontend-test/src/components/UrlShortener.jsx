import React, { useState } from 'react';
import { useUrlContext } from '../contextProvider/UrlContext';

const UrlShortener = () => {
  const { urls, addUrl } = useUrlContext();
  const [rows, setRows] = useState([{ originalUrl: '', validity: '', preferredShortcode: '' }]);
  const [results, setResults] = useState([]);

  const createShortcode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const code = Array.from({ length: 6 }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join('');
    return urls.some((u) => u.shortcode === code) ? createShortcode() : code;
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const addRow = () => {
    if (rows.length < 5) {
      setRows([...rows, { originalUrl: '', validity: '', preferredShortcode: '' }]);
    }
  };

  const removeRow = (index) => {
    if (rows.length > 1) {
      setRows(rows.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validRows = rows.filter((row) => row.originalUrl.trim() && isValidUrl(row.originalUrl));
    if (!validRows.length) return;

    const now = new Date();
    const newResults = validRows.map((row) => {
      const shortcode =
        row.preferredShortcode && !urls.some((u) => u.shortcode === row.preferredShortcode)
          ? row.preferredShortcode
          : createShortcode();

      const validity = row.validity ? Number(row.validity) : 30;
      const expiry = new Date(now.getTime() + validity * 60000);
      const shortUrl = `http://localhost:3000/${shortcode}`;

      const entry = {
        originalUrl: row.originalUrl,
        shortcode,
        shortUrl,
        creationTime: now,
        expiryTime: expiry,
        clicks: 0,
        clickDetails: []
      };

      addUrl(entry);
      return entry;
    });

    setResults(newResults);
    setRows([{ originalUrl: '', validity: '', preferredShortcode: '' }]);
  };

  return (
    <div className="url-shortener">
      <h2>Shorten URLs</h2>
      <form onSubmit={handleSubmit}>
        {rows.map((row, index) => (
          <div key={index} className="url-row">
            <div className="row-header">
              <h3>URL {index + 1}</h3>
              {rows.length > 1 && (
                <button type="button" onClick={() => removeRow(index)} className="remove-btn">
                  Remove
                </button>
              )}
            </div>

            <div className="input-group">
              <label>Original URL *</label>
              <input
                type="text"
                value={row.originalUrl}
                onChange={(e) => handleChange(index, 'originalUrl', e.target.value)}
                placeholder="https://example.com"
              />
            </div>

            <div className="input-group">
              <label>Validity (minutes)</label>
              <input
                type="number"
                value={row.validity}
                onChange={(e) => handleChange(index, 'validity', e.target.value)}
                placeholder="30 for 30minutes"
              />
            </div>

            <div className="input-group">
              <label>Preferred Shortcode</label>
              <input
                type="text"
                value={row.preferredShortcode}
                onChange={(e) => handleChange(index, 'preferredShortcode', e.target.value)}
                placeholder="e.g. mylink"
                maxLength={10}
              />
            </div>
          </div>
        ))}

        <div className="form-actions">
          {rows.length < 5 && (
            <button type="button" onClick={addRow} className="add-btn">
              Add Another
            </button>
          )}
          <button type="submit" className="submit-btn">Shorten URLs</button>
        </div>
      </form>

      {results.length > 0 && (
        <div className="results">
          <h3>Shortened Links</h3>
          <table>
            <thead>
              <tr>
                <th>Original</th>
                <th>Short URL</th>
                <th>Expires</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr key={i}>
                  <td>{r.originalUrl}</td>
                  <td>
                    <a href={r.shortUrl} target="_blank" rel="noreferrer">
                      {r.shortUrl}
                    </a>
                  </td>
                  <td>{r.expiryTime.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UrlShortener;
