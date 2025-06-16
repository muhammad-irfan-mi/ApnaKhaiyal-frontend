import Login from '../auth/Login';
import Register from '../auth/Register';
import axios from 'axios';
import Banner from '../Banner/Banner';

const AuthPage = () => {

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleLoginSubmit = async (data) => {
    try {

      const response = await axios.post(`${BASE_URL}/api/auth/login`, data, {
        withCredentials: true,
      });
      if (response.status === 200) {
        localStorage.setItem("KhaiyalAuth", response.data.accessToken);
        window.location.href = "/my-account/";
      }
    }
    catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Invalid credentials");
      }
      else if (error.response && error.response.status === 404) {
        alert("User not found");
      }
      else {
        console.log("Server error", error);
      }
    }
  };

  const handleRegister = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/signup`, data);
      console.log("Register response:", response.data);

      if (response.status === 201) {
        localStorage.setItem("KhaiyalAuth", response.data.accessToken);
        window.location.href = "/my-account/";
        alert("Registration successful!");
      }
    } catch (error) {
      if (error.status === 400) {
        alert("User already exists");
      }
      else {
        console.log("server error", error);
      }
    }
  };

  return (
    <>
      <Banner title="My Account" />
      <div className=" bg-gray-100 min-h-screen flex items-center justify-center px-4 lg:px-0">
        <div className="bg-white rounded p-6 flex flex-col lg:flex-row w-full max-w-7xl shadow-md mx-auto my-8">
          <Login onSubmit={handleLoginSubmit} />
          <Register onSubmit={handleRegister} />
        </div>
      </div>
    </>
  );
};

export default AuthPage;
