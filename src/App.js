import './App.css';
import CustomerList from './components/CustomerList'
import TrainingList from './components/TrainingsList'
import Home from './components/Home'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Route, Routes, BrowserRouter, Link } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <AppBar position='static'>
        <Toolbar>
            <Typography varient='h6'> My Final Task </Typography>
        </Toolbar>
      </AppBar>

      <BrowserRouter>
        <Link to="/">Home</Link>{' '}
        <Link to="/CustomerList">Customers</Link>{' '}
        <Link to="/TrainingsList">Trainings</Link>{' '}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CustomerList" element={<CustomerList />} />
          <Route path="/TrainingsList" element={<TrainingList />} />
        </Routes>
      </BrowserRouter>

      
    
    </div>
  );
}

export default App;
