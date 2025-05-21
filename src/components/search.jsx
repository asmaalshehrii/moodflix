// import React from "react";

// const Search = ({searchTerm,setsearchTerm})=>{
//     return(
//         <div className="search">
//             <div>
//                 <img src="search.svg"/>
//                 <input type="text" placeholder="Serach for a movie" value={searchTerm} onChange={(event)=>setsearchTerm(event.target.value)}></input>
//             </div>
            
//         </div>
//     );
// }

// export default Search

import React from "react";

const Search = ({ searchTerm, setsearchTerm }) => {
  return (
    <div className="search">
      <div className="relative w-full">
        <img
          src="search.svg"
          alt="search icon"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search for a movie"
          value={searchTerm}
          onChange={(event) => setsearchTerm(event.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 text-lg focus:outline-none focus:ring-2 focus:ring-light-100"
        />
      </div>
    </div>
  );
};

export default Search;
