// App.js
import React from 'react';
import { log } from '../../Logging_Midddleware/logging.js'; 

function App() {
  const handleClick = () => {
    log("info", "component", "User clicked the Log button");
  };

  return (
    <div >
      <p>Testing logger</p>
      <button onClick={handleClick}>Send Log</button>
    </div>
  );
}

export default App;
