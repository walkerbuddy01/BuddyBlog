import { Outlet } from "react-router-dom";
import { Container, Footer, Navbar } from "./Components";
import { useDispatch } from "react-redux";
import { login, logout } from "./Store/AuthSlice";
import { useEffect, useState } from "react";
import authservice from "./Backend/AuthService";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    setError("");

    authservice
      .CurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return loading ? (
    <Container classname="w-full h-screen bg-sky-400 flex items-center justify-center">
      <h1 className="text-white bg-red-600 font-semibold p-4 px-24 rounded-[8rem] text-[10vw]">
        Loading......
      </h1>
    </Container>
  ) : (
    <>
      <Container>
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </Container>
    </>
  );
}

export default App;
