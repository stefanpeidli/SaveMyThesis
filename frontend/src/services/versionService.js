import axios from 'axios'

import { secToMs } from '../utils/timestamp'

const versionInstance = axios.create({
  baseURL: 'http://savemythesis.westeurope.cloudapp.azure.com:5000',
  timeout: 1000,
});

export const fetchHistory = async () => {
  try {
    const response = await versionInstance.get('/history')
    const history = response.data.map(item => secToMs(item))
    return history
  } catch (error) {
    console.error(error)
  }
}

export const postVersion = async (text, author) => {
  try {
    const response = await versionInstance.post('/version', { text, author })
    const postedVersion = secToMs(response.data)
    return postedVersion
  } catch (error) {
    console.error(error)
  }
}

export const fetchVersion = async (versionId) => {
  try {
    const response = await versionInstance.get(`/version/${versionId}`)
    const fetchedVersion = secToMs(response.data)
    return fetchedVersion
  } catch (error) {
    console.error(error)
  }
}
