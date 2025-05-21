import { useEffect, useState } from 'react'
import {useDebounce} from 'react-use'
import { updateSerchCount,getTrendingMovies } from './appwrite.js';
import './App.css'
import Search from './components/search';
import Spinner from './components/spinner';
import Card from './components/cards';


const API_BASE_URL= 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMBD_KEY;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

function App() {
  const [searchTerm, setsearchTerm] = useState("");
  const [errorMessage,seterrorMessage]= useState("");
  const [movies,setmovies] = useState([]);
  const [isLoading,setisLoading] = useState(false);
  const [debounceSerch, setdebounceSerch] = useState('');
  const [trendingMovies,settrendingMovies] = useState([]);
  
  useDebounce(()=>setdebounceSerch(searchTerm),500,[searchTerm]);
  
  const fetchMovies= async(query="")=>{
    setisLoading(true);
    seterrorMessage("");
    try{
      // const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const endpoint = query ?
        `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const responce = await fetch(endpoint,options);
      if(!responce.ok){
        throw new Error("faild to fitch");
      }
      const data = await responce.json();
      if(data.Response==='False'){
        setmovies([]);
        return;
      }

      setmovies(data.results || []);
      if(query&&data.results.length >0){
        await updateSerchCount(query,data.results[0]);
      }

    }
    catch(error){
      console.log(`eroor fecthing data ${error}`);
      seterrorMessage("Errore please try later");

    }
    finally{
      setisLoading(false);
    }
    
  }

  const loadTrindingMovies = async ()=>{
    try{
      const moviees =  await getTrendingMovies();
      settrendingMovies(moviees);


    } catch(error){
      console.error(error)

    }

  }

  useEffect(()=>{
    fetchMovies(debounceSerch);

  },[debounceSerch]);

  useEffect(()=>{
    loadTrindingMovies();

  },[]);

  return (
    <>
      <header className="relative w-screen h-[500px] overflow-hidden">
        <img
          src="/Container.png"
          alt="Banner"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-[#030014] backdrop-blur-[1px] z-10" />
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-b from-transparent to-[#030014] z-20" />

        <div className="relative z-30 text-center max-w-3xl mx-auto flex flex-col items-center justify-center h-full px-4">
          <h1 className="text-white text-5xl font-extrabold leading-tight drop-shadow-md">
            Discover Your Next Favorite Movie
          </h1>
          <p className="text-gray-300 mt-4 text-lg drop-shadow-sm">
            No more endless scrolling — find something worth watching.
          </p>
          <div className="mt-8 w-full max-w-xl">
            <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm} />
          </div>
        </div>
      </header>
      <h2 className="text-white text-3xl font-bold mb-8 border-b border-gray-700 pb-2">🔥 Trending Movies</h2>
      {trendingMovies.length >0 && (<section className="trending ">
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {trendingMovies.map((movie,index) => (
              <li key={movie.$id} className="bg-dark-100 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition duration-200">
                <p >{index +1}</p>
                <img src ={movie.poster_url} className="w-full h-[320px] object-cover"/>
                
              </li>
              
            ))}
          </ul>
        

</section>)}
      

      <section className="all-movies">
        <h2 className="text-white text-3xl font-bold mb-8 border-b border-gray-700 pb-2">
          {searchTerm ? `Results for "${searchTerm}"` : '🎥  All Movies'}
        </h2>

        {isLoading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : errorMessage ? (
          <p className="text-red-500 text-center">{errorMessage}</p>
        ) : movies.length === 0 ? (
          <p className="text-gray-400 text-center">No movies found.</p>
        ) : (
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <Card key={movie.id} movie={movie} />
            ))}
          </ul>
        )}
      </section>
     
    </>
  );
}

export default App
