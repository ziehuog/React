import { BrowserRouter } from 'react-router-dom';
import './App.css';
import SignUp from './components/SignUp';

function App() {
  return (
    <div>
      <BrowserRouter>
      <SignUp/>
      </BrowserRouter>
    </div>
  );
}

export default App;
