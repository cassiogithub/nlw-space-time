import axios from 'axios'
import { cookies } from 'next/headers'

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: cookies().get('token')?.value,
  },
})
