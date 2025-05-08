import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Navbarmain } from './pages';
import AppRoutes from './routes/AppRoutes';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { ToastContainer } from 'react-toastify';


function App() {

  return (
    <Provider store={store}>
      <Router>
        <Navbarmain />
        <AppRoutes />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />
      </Router>
    </Provider>
  )
}

export default App
