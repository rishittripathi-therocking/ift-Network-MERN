import {useEffect} from 'react';
import {BrowserRouter as Router,  Route, Switch} from 'react-router-dom';
import PageRender from './customRouter/PageRender';
import PrivateRouter from './customRouter/privateRouter';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import Alert from './components/alert/Alert';
import Header from './components/alert/header';
import StatusModal from './components/StatusModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useSelector, useDispatch} from 'react-redux';
import {refreshToken} from './redux/actions/authAction';
import {getPosts} from './redux/actions/postAction';

toast.configure();
function App() {
  const {auth, status,modal} = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshToken());
  },[dispatch]);

  useEffect(() => {
    if (auth.token) dispatch(getPosts(auth.token));
  },[dispatch, auth.token]);

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
      <div className={`App ${(status || modal) && 'mode'}`}>
        <div className="main">
          {auth.token && <Header />}
          {status && <StatusModal />}
          <Switch>
            <Route exact path='/' component={auth.token ? Home : Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <PrivateRouter exact path='/:page' component={PageRender} />
            <PrivateRouter exact path='/:page/:id' component={PageRender} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
