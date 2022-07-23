import logo from './logo.svg';
import './App.css';
import ContainerModule from './components/ContainerModule';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
      <ContainerModule/>
      </BrowserRouter>
    </div>
  );
}

export default App;
