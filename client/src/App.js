import {BrowserRouter as Router,  Route} from 'react-router-dom';
import PageRender from './PageRender';
import Login from './pages/login';
import Notify from './components/notify/Notify';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
function App() {
  return (
    <Router>
      <Notify />
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
          <Route exact path='/' component={Login} />
          <Route exact path='/:page' component={PageRender} />
          <Route exact path='/:page/:id' component={PageRender} />
        </div>
      </div>
    </Router>
  );
}

export default App;
