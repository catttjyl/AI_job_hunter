import client from './client'
import mockData from '../utils/mockData'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function uploadResume(file) {
  if (USE_MOCK) {
    await delay(1500)
    return mockData
  }

  const formData = new FormData()
  formData.append('resume', file)

  const { data } = await client.post('webhook-test/fb05106d-3b3f-4b7e-9c2b-b11242176f77', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  console.log('data', data)
  return data
}
