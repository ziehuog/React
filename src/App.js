import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Navigation from './components/Navigation';
import Signup from './components/Register';
import StartScreen from './components/StartScreen';

function App() {

  

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Signup/>}/>
          <Route path="/home/*" element={<StartScreen />} />
          <Route path='/*' element={<Navigation/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
