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

export const getUser = async username => {
  const {data} = await axios.get(`${BASE_URL}/users/${username}`)
  return data.user;
}

export const vote = async (inc_votes, id) => {
  const { data } = await axios.patch(`${BASE_URL}/articles/${id}`, inc_votes)
  return data.article
}