import axios from 'axios'

const BASE_URL = 'https://baj-news.herokuapp.com/api/'

export const getAll = async (endpoint, query = '') => {
  const totalQuery = query ? `?topic=${query}` : "" ;
  const { data } = await axios.get(`${BASE_URL}${endpoint}${totalQuery}`);
  return data[endpoint]
}

export const getSingle = async (endpoint) => {
  const { data } = await axios.get(`${BASE_URL}articles/${endpoint}`);
  return [data.article]
}

export const getComments = async (endpoint) => {
  const { data } = await axios.get(`${BASE_URL}articles/${endpoint}/comments`);
  return data.comments
}