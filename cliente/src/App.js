import './App.css';
import {Routes, Route, useLocation} from 'react-router-dom'
import NavBar from './components/Navbar';
import Home from './components/Home';
import MenuRecetas from './components/MenuRecetas';
import ErrorLoad from './components/ErrorLoad';
import AddReceta from './screens/AddReceta';
import ShowRecetas from './screens/ShowRecetas';
import Login from './components/Login';
import ShowUserRecetas from './screens/ShowUserRecetas'
import FooterWeb from './components/Footer';



function App() {
  const location = useLocation()

  return (
    <div className='global d-flex flex-column'>
      {location.pathname === '/' ? null : <NavBar />}
    <div className="general">
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/account" element={<ShowUserRecetas/>}/>
        <Route path="/recipes" element={<MenuRecetas/>}/>
        <Route path="/addrecipes" element={<AddReceta/>}/>
        <Route path="/showrecipes" element={<ShowRecetas/>}/>
        <Route path="*" element={<ErrorLoad/>}/>
      </Routes>
    </div>
    <div className='footer' >
    <FooterWeb/>
    </div>
    </div>
  );
}

export default App;
