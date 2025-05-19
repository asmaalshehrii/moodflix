import React from "react";

const Search = ({searchTerm,setsearchTerm})=>{
    return(
        <div className="search">
            <div>
                <img src="search.svg"/>
                <input type="text" placeholder="Serach for a movie" value={searchTerm} onChange={(event)=>setsearchTerm(event.target.value)}></input>
            </div>
            
        </div>
    );
}

export default Search