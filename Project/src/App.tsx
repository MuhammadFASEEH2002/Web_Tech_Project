import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";
import Login from "./screens/LoginScreen";
import Home from "./screens/HomeScreen";

function App() {
  const [cookies] = useCookies();
  if (!cookies?.token) {
    return (
      <>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </Router>
      </>
    );
  } else {
    return (
      <>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </>
    );
  }
}

export default App;