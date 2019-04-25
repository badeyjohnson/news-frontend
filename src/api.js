import axios from "axios";

const BASE_URL = "https://baj-news.herokuapp.com/api/";

export const getAll = async (endpoint, query = "") => {
  const totalQuery = query ? `?topic=${query}` : "";
  const { data } = await axios.get(`${BASE_URL}${endpoint}${totalQuery}`);
  return data[endpoint];
};

export const getSingle = async endpoint => {
  const { data } = await axios.get(`${BASE_URL}articles/${endpoint}`);
  return data.article;
};

export const getComments = async endpoint => {
  const { data } = await axios.get(`${BASE_URL}articles/${endpoint}/comments`);
  return data.comments;
};

export const postComment = async (endpoint, newComment) => {
  const { data } = await axios.post(`${BASE_URL}articles/${endpoint}/comments`, newComment);
  return data.comment;
};

export const deleteComment = endpoint => {
  axios.delete(`${BASE_URL}comments/${endpoint}`);
};

export const getUser = async username => {
  const { data } = await axios.get(`${BASE_URL}/users/${username}`);
  return data.user;
};

export const vote = async (location, inc_votes, id) => {
  const { data } = await axios.patch(`${BASE_URL}/${location}s/${id}`, {
    inc_votes
  });
  return data[location];
};
