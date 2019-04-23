import axios from 'axios'

const BASE_URL = 'https://baj-news.herokuapp.com/api/'

export const getAll = async (path) => {
  const { data } = await axios.get(`${BASE_URL}${path}`)
  return data[path]
}