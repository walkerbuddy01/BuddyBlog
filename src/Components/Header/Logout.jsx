import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../Store/AuthSlice";
import authservice from "../../Backend/AuthService";
import { useNavigate } from "react-router-dom";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    const logoutData = await authservice.Logout();
    if (logoutData) {
      navigate("/login");
      dispatch(logout());
    }
  };
  return (
    <button
      className="bg-red-600 p-2 px-5 rounded-3xl  text-white active:bg-red-800 active:border-white active:border-2 hover:bg-transparent border-2 border-red-600  transition-all ease-linear text-lg font-medium"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default Logout;
