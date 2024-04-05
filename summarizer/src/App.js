import './App.css';
import Summary from './components/Summary.js';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import GenerateSummary from './components/GenerateSummary.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route index exact path='/' element={<Summary />}></Route>
            <Route exact path='/generate' element={<GenerateSummary />}></Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
