import axios from "axios";

const API = axios.create({
  baseURL: "https://arogyaai-agent.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const sendMessage = async (text) => {
  const res = await API.post("/chat", {
    message: text,
  });

  return res.data;
};