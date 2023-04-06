import axios from 'axios';

export async function sendMessageToServer(
  setServerMessage: React.Dispatch<React.SetStateAction<string>>
) {
  try {
    const response = await axios.get('/api');
    setServerMessage(response.data);
  } catch (error) {
    console.log('Error fetching message:', error);
  }
}
