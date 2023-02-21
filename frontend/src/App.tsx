import { useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  const handleClick = async () => {
    const response = await axios.get('/api');
    setMessage(response.data);
  };

  return (
    <div>
      <button onClick={handleClick}>Send message to server</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
