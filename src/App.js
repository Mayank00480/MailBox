
import './App.css';
import Home from './component/Home/Home';
import Auth from './component/auth/Auth';
import { BrowserRouter as Router,Routes , Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Inbox from './component/Inbox/Inbox';
import SentBox from './component/Sent/SentBox';
function App() {
  const isAuth = useSelector(state => state.auth.isAuthenticated)
  console.log(isAuth)
  return (
    <div className="App">
      <Router>
        <Routes>
        {localStorage.getItem("boxEmail") != undefined && <Route exact path = "/" Component={Home} />}
        {localStorage.getItem("boxEmail") != undefined && <Route exact path = "/sent" Component={SentBox} />}
        {localStorage.getItem("boxEmail") != undefined && <Route exact path = "/inbox" Component={Inbox} />}
          <Route exact path ="/" Component={Auth}/>
        
        </Routes>
      </Router>
     
    </div>
  );
}

export default App;
