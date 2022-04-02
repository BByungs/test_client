import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Join from './pages/Join';
import Kakao from './pages/Kakao';
import Main from './pages/Main';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="/join" element={<Join />} />
        <Route path="/auth/kakao" element={<Kakao />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
