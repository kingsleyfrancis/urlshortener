import './App.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import ListPage from './pages/ListPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
    <div className='app'> 
    <div className='app-header'> 
      <div className='logo'>
        <h2>Url Shortener</h2>
      </div>
      <nav>
        <ul>
          <li>
            <Link to='/'>
              Home
            </Link>
          </li>
          <li>
            <Link to='/list'>
              List
            </Link>
          </li>
        </ul>
      </nav>
    </div>
      <div className='app-body'>          
          <div className='app-content'>
              <Route exact path='/list' component={ListPage} />
              <Route exact path='/' component={HomePage} />
          </div>
      </div>
    </div>

    </Router>)
}

export default App;
