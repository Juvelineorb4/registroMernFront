import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';

import Navigation from './components/navigation';
import  noteList from './components/NotesList';
import createNote from './components/createNote';
import createUser from './components/createUser';





function App() {
  return (
   <Router>
     <Navigation/>
      <div className="container pt-4">
          <Route path ='/' exact component = {noteList} />
        <Route path ='/edit/:id' component = {createNote} />
        <Route path ='/create' component = {createNote} />
        <Route path ='/user' component = {createUser} />
      </div>
     
   </Router>
  );
}

export default App;
