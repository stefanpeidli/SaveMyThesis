import axios from 'axios'

const historyInstance = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 1000,
});

export const fetchHistory = async () => {
  try {
    const response = await historyInstance.get('/history')
    return response.data
  } catch (error) {
    console.error(error)
  }
}
