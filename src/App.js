import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

// styles
import './App.css';

// pages and components
import Dashboard from './pages/dashboard/Dashboard';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import Create from './pages/create/Create';
import Project from './pages/project/Project';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/create' element={<Create />} />
            <Route path='/project/:id' element={<Project />} />
            <Route path='*' element={<Dashboard />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
