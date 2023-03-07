import { useState, useEffect } from 'react';
import axios from 'axios';
import '@google/model-viewer';
import './app.css';

function App() {
  const [message, setMessage] = useState('');

  const handleClick = async () => {
    const response = await axios.get('/api');
    setMessage(response.data);
  };

  return (
    <body>
      <div className="parent">
        <div className="div1">
          <model-viewer
            className="model-viewer"
            src="/untitled.glb"
            alt="A 3D model"
            camera-controls
            exposure="0.6"
            shadow-intensity="1.5"
            orbit="45deg 55deg 4m"
          />
        </div>
        <div className="div2"></div>
        <div className="div3">
          <button onClick={handleClick}>Send message to server</button>
          <p>{message}</p>{' '}
        </div>
      </div>
    </body>
  );
}

export default App;
