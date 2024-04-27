import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const options = {
  include_adult: false,
  params: { language: "en-US" },
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MGI5M2E2NDE1MjJiN2JiOTg5NDYwMDI3M2IzNmQ5YiIsInN1YiI6IjY2MmE1ZTIzNTBmN2NhMDBiNGM4OTYwZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yW0nxIK1fl5pOtGEZyRC6m5eM2TphgFWmxUJx3JpiIY",
  },
};


export const trendingMovies = async () => {
    const response = await axios.get("/trending/movie/week?", options);
   
    return response.data.results;
};


export const detailsMovies = async (id) => {
    const response = await axios.get(`movie/${id}`, options);
    
    return response.data
};


export const searchMovies = async (query, page) => {
    const response = await axios.get(`/search/movie?page=${page}&query=${query}`, options);
    
  return response.data
  
};

export const castMovies = async (id) => {
    const response = await axios.get(`/movie/${id}/credits?`, options);
    
  return response.data
  
};

export const reviewsMovies = async (id) => {
    const response = await axios.get(`/movie/${id}/reviews?`, options);
    
  return response.data
  
};

