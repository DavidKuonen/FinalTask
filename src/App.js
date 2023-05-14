import './App.css';
import CustomerList from './components/CustomerList'
import TrainingList from './components/TrainingsList'
import Calender from './components/Calender'
import Statistics from './components/Statistics'
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
        <Link to="/Calender">Calender</Link>{' '}
        <Link to="/Statistics">Statistics</Link>{' '}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CustomerList" element={<CustomerList />} />
          <Route path="/TrainingsList" element={<TrainingList />} />
          <Route path="/Calender" element={<Calender />} />
          <Route path="/Statistics" element={<Statistics />} />
        </Routes>
      </BrowserRouter>

      
    
    </div>
  );
}

export default App;
