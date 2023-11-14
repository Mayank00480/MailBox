
import './App.css';
import Home from './component/Home/Home';
import Auth from './component/auth/Auth';
import { BrowserRouter as Router,Routes , Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
function App() {
  const isAuth = useSelector(state => state.auth.isAuthenticated)
  console.log(isAuth)
  return (
    <div className="App">
      <Router>
        <Routes>
        {isAuth && <Route exact path = "/" Component={Home} />}
          <Route exact path ="/" Component={Auth}/>
        
        </Routes>
      </Router>
     
    </div>
  );
}

export default App;
