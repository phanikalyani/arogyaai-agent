import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: "",
    password: "",
    age: "",
    gender: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const handleSignup = async () => {
  try {
    await axios.post("http://localhost:8000/signup", {
      id: form.id,
      password: form.password,
      age: Number(form.age),   // ensure number
      gender: form.gender
    });

    alert("Signup successful!");
  } catch (err) {
    console.error(err);
    alert("Signup failed");
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h2>Signup</h2>

      <input name="id" placeholder="User ID" onChange={handleChange} /><br /><br />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} /><br /><br />
      <input name="age" placeholder="Age" onChange={handleChange} /><br /><br />
      <input name="gender" placeholder="Gender" onChange={handleChange} /><br /><br />

      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default Signup;