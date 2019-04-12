import axios from 'axios'

const versionInstance = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 1000,
});

export const postVersion = async (text, author) => {
  try {
    const response = await versionInstance.post('/version', { text, author })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const fetchVersion = async (versionId) => {
  try {
    const response = await versionInstance.get(`/version/${versionId}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}
