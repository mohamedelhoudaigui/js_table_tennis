import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./homepage.jsx";
import LocalPlay from "./localPlay.jsx";
// import OnlinePlay from "./onlinePlay.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/localplay" element={<LocalPlay />} />
        {/* <Route path="/onlineplay" element={<OnlinePlay />} /> */}
      </Routes>
    </Router>
  );
}

export default App;









//   const navigate = useNavigate()

//   const handleLocalclick = () => {
//     navigate('/local')
//   }

//   return (
//     <>
//       <h1>Welcome to the game</h1>
//       <div>
//         <button>localPlay</button>
//         <button>onliePlay</button>
//       </div>
//     </>
//   )