import {BrowserRouter as Router , Routes, Route} from 'react-router-dom'
import Home from "./Components/Home";
import Write from "./Components/Write";
import Post from "./Components/Post";
import Land from "./Components/Land"
import Login from './Components/Login';
import Register from './Components/Register';
import LoginDetails from './Components/LoginDetails';
import ScrollToTop from './Components/ScrollToTop';

function App() {

  

  return (
    <Router>
      <ScrollToTop />
      <LoginDetails>
        <div className="App font-disp">
          <Routes>
            <Route path="/" element={<Land/>}/>
            <Route path="/:user" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/write" element={<Write />}/>
            <Route path="/posts/:id" element={<Post/>}/>
          </Routes>
        </div>
      </LoginDetails>
    </Router>
  );
}

export default App;
