import { useState } from "react";
import { signInWithGooglePopup, signInWithEmail, Register } from "../Firebase";
import { useNavigate } from "react-router-dom";
const Login = ({ handleSetUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const CLICKS = {
    LOGIN: () => signInWithGooglePopup(),
    REGISTER: () => Register(email, password),
    EMAIL: () => signInWithEmail(email, password),
  };
  const handleClick = async (name) => {
    try {
      const response = await CLICKS[name]();
      const { _tokenResponse } = response;
      handleSetUser(_tokenResponse);
      navigate("/");
    } catch (err) {
      alert("Please Check Your Credentials");
    }
  };
  return (
    <div className="grid  text-2xl grid-cols-1 items-center w-1/3 m-auto mt-10 border border-green-400 p-5 rounded shadow-lg shadow-green-400">
      <div className="text-center">
        <input
          placeholder="Email Address"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className=" mt-5 block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-black rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
        />
      </div>
      <div className="text-center">
        <input
          placeholder="Enter Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className=" mt-5 block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-black rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
        />
      </div>

      <button
        className="bg-green-400 text-black mt-5 rounded border border-black"
        onClick={() => handleClick("EMAIL")}
      >
        SIGN IN WITH EMAIL
      </button>
      <button
        className="bg-green-400 text-black mt-5 rounded border border-black"
        onClick={() => handleClick("REGISTER")}
      >
        REGISTER
      </button>
      <button
        className="bg-green-400 text-black mt-5 border border-black rounded"
        onClick={() => handleClick("LOGIN")}
      >
        SIGN IN WITH GOOGLE
      </button>
    </div>
  );
};
export default Login;
