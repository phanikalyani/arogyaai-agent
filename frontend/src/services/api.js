import axios from "axios";

export const sendMessage = async (message) => {
  const user_id = localStorage.getItem("user_id");

  const res = await axios.post("http://localhost:8000/chat", {
    message,
    user_id,
  });

  return res.data;
};