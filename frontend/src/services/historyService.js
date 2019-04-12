import axios from 'axios'

const historyInstance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
});

export const fetchHistory = async () => {
  try {
    const response = await historyInstance.get('/history')
    return response
  } catch (error) {
    console.error(error)
  }
}
