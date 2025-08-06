import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'fyrb2qru',
  dataset: 'production',
  useCdn: true, // Enable CDN for faster, cached responses
  apiVersion: '2024-01-01', // Use current date for API version
})
