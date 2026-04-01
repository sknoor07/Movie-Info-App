
import { useEffect, useState } from 'react';
import './App.css'
import Search from './components/Search'
import { api } from './api/api';
import { Spinner } from './components/Spinner';
import MovieCard from './components/moviecard';

const App=()=>{
  const[searchTerm, setSearchTerm]= useState("");
  const [errorMessage, setErrorMessage]= useState("");
  const [movieList, setMovieList]= useState([]);
  const [isloading, setIsLoading] = useState(false);
  useEffect(()=>{
    fecthMovies();
  },[])

  const fecthMovies=async ()=>{
    setIsLoading(true);
   try {
    const response = await api.get('/discover/movie');
    
    setMovieList((prev) => [...prev, ...response.data.results]);
    console.log(response.data);
  } catch (error) {
    setErrorMessage(
    error.response?.data?.Error || "Failed to get movies, Server Error"
  );
  setMovieList([]);
  }finally{
    setIsLoading(false);
  }
}

  return(
  <main>
    <div className='pattern' />
      <div className='wrapper'>
        <header>
          <img src='./hero.png' alt='Hero Banner'/>
          <h1> Find <span className='text-gradient'>Movies</span> you will Enjoy Without Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>
        <section className='all-movies'>
          <h2 className='mt-[40px]'>All Movies</h2>
          {isloading?
          (<div className='flex items-center gap-2 text-indigo-600'><p className='text-white'> Loading .... </p> <Spinner /></div>):
          errorMessage?
          (<p className='text-red-500'>{errorMessage}</p>):
          (<ul>
            {movieList.map((movie,index)=>{
              return (
                <MovieCard key={index} movie={movie}/>
              );
            })}
          </ul>)}
        </section>
      </div>
  </main>);
}

export default App
