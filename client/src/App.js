import {useEffect} from 'react';
import {BrowserRouter as Router,  Route} from 'react-router-dom';
import PageRender from './PageRender';
import Login from './pages/login';
import Home from './pages/home';
import Alert from './components/alert/Alert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useSelector, useDispatch} from 'react-redux';
import {refreshToken} from './redux/actions/authAction';

toast.configure();
function App() {
  const {auth} = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshToken());
  },[dispatch])
  return (
    <Router>
      <Alert />
      <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
          />
      <input type="checkbox" id="theme" />
      <div className="App">
        <div className="main">
          <Route exact path='/' component={auth.token ? Home :Login} />
          <Route exact path='/:page' component={PageRender} />
          <Route exact path='/:page/:id' component={PageRender} />
        </div>
      </div>
    </Router>
  );
}

export default App;
