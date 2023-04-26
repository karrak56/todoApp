import MainFirstPage from './components/firstPage/mainFirstPage';
import MainSecondPage from './components/secondPage/mainSecondPage';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'


function Main() {
  return (
    <Router> 
      <Routes>
        <Route path='/' element={<MainFirstPage/>}/>
        <Route path='/:id' element={<MainSecondPage/>}/>
      </Routes>
    </Router>
  );
}

export default Main;




