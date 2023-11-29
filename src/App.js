import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/home';
import EditTask from './pages/editTask';

function App() {
  return (
    <Router>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/edit/:id" element={<EditTask/>} />
      </Routes>
    
    </Router>
  );
}

export default App;
