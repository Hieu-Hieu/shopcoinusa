import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Login from "./pages/login/Login";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const handleTheme = () => {
    setTheme((pre) => (pre === "light" ? "dark" : "light"));
  };
  return (
    <BrowserRouter>
      <div className="app" data-theme={theme}>
        <Header theme={theme} changeTheme={handleTheme} />
        <Routes>
          <Route path="login" element={<Login />}></Route>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
