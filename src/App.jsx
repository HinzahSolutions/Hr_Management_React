import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Navbarmain } from './pages';
import AppRoutes from './routes/AppRoutes';
import { Provider } from 'react-redux';
import { store } from './app/store';


function App() {

  return (
    <Provider store={store}>
      <Router>
        <Navbarmain />
        <AppRoutes />
      </Router>
    </Provider>
  )
}

export default App
