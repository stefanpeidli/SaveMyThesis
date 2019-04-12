import axios from 'axios'

const versionInstance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
});

export const postVersion = async (text) => {
  try {
    const response = await versionInstance.post('/version', { text })
    return response
  } catch (error) {
    console.error(error)
  }
}

export const fetchVersion = async (versionId) => {
  try {
    const response = await versionInstance.get(`/version/${versionId}`)
    return response
  } catch (error) {
    console.error(error)
  }
}
