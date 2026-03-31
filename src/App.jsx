
import { useState } from 'react';
import './App.css'
import Search from './components/Search'


const App=()=>{
  const[searchTerm, setSearchTerm]= useState("");
  return(
  <main>
    <div className='pattern' />
      <div className='wrapper'>
        <header>
          <img src='./hero.png' alt='Hero Banner'/>
          <h1> Find <span className='text-gradient'>Movies</span> you will Enjoy Without Hassle</h1>
        </header>
        <Search/>
      </div>
  </main>);
}

export default App
