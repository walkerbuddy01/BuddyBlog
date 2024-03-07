import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthLayout({children, authentication = true }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const login = useSelector((state) => state.auth.login);
  const userData = useSelector((state) => state.auth.userData);
  useEffect(() => {
    if (authentication && login !== authentication) {
      navigate("/login");
    } else if (!authentication && login !== authentication) {
      navigate("/");
    }
    setLoading(false);
  }, [login, authentication, navigate]);

  return loading ? <h1>loading....</h1> : <>{ children }</>;
}

export default AuthLayout;
