import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./screens/LoginScreen";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route  path="/" element={<Login />} />
          {/* <Route path="/admin-login" element={<Adminlogin />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;