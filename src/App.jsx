import { useEffect, useState } from 'react'
import './App.css'
import Search from './components/search';
import Spinner from './components/spinner';
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
  const [isLoading,setisLoading] = useState(false)
  const fetchMovies= async()=>{
    setisLoading(true);
    seterrorMessage("");
    try{
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
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

    }
    catch(error){
      console.log(`eroor fecthing data ${error}`);
      seterrorMessage("Errore please try later");

    }
    finally{
      setisLoading(false);
    }
    
  }

  useEffect(()=>{
    fetchMovies();

  },[]);
  return (
    <>
  
    
    <header className="relative w-screen overflow-hidden py-20 px-4">
  <img
    src="/Container.png"
    alt="Banner"
    className="absolute inset-0 w-full h-full object-cover z-0"
  />
  <div className="absolute inset-0 bg-black/40 z-10" />
  <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-b from-transparent to-[#030014] z-20" />
  <div className="relative z-30 text-center max-w-4xl mx-auto">
    <h1 className="text-white text-4xl font-bold leading-tight">
      Discover Your Next Favorite Movie
    </h1>
    <p className="text-gray-300 mt-4 text-lg">
      No more endless scrolling — find something worth watching.
    </p>
    <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm} />
    <h1>{searchTerm}</h1>
  </div>
</header>
<section className='all-movies'>
  <h2 className='mt-[20px]'>All movies</h2>
  {
  isLoading? (
  <Spinner/>
 
  ):errorMessage?(
    <p className='text-red-500'>{errorMessage}</p>
  ):(
  <ul>
    {movies.map((movie)=>(
      <p key={movie.id} className='text-red-500'>{movie.title}</p>

    ))}
  </ul>)}

</section>
</>
  );
}

export default App
