import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// styles
import './App.css';

// pages and components
import Dashboard from './pages/dashboard/Dashboard';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import Create from './pages/create/Create';
import Project from './pages/project/Project';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import OnlineUsers from './components/OnlineUsers';

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <div className='App'>
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar />}
          <div className='container'>
            <Navbar />
            <Routes>
              <Route path='/' element={user ? <Dashboard /> : <Navigate replace to='/login' />} />
              <Route path='/signup' element={!user ? <Signup /> : <Navigate replace to='/' />} />
              <Route path='/login' element={!user ? <Login /> : <Navigate replace to='/' />} />
              <Route
                path='/create'
                element={user ? <Create /> : <Navigate replace to='/login' />}
              />
              <Route
                path='/projects/:id'
                element={user ? <Project /> : <Navigate replace to='/login' />}
              />
              <Route path='*' element={user ? <Dashboard /> : <Navigate replace to='/login' />} />
            </Routes>
          </div>
          {user && <OnlineUsers />}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
