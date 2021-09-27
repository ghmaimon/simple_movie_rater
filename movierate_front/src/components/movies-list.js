import React from 'react';
var FontAwsom = require('react-fontawesome');

const MovieList = (props) =>{
    const movieClicked = movie => evt =>{
        props.movieClicked(movie);
    }
    const trashClicked = movie => evt =>{
        props.trashClicked(movie);
    }
    const editClicked = movie => evt =>{
        props.editClicked(movie);
    }
    const newMovie = evt =>{
        props.newMovie();
    }
    return (<div className="movie-list">
             <h1 className="top">title</h1>
            <ul>          
                <div>
                    ____________
                </div>
                {props.movies.map((movie) =>{
                    return (<li key={movie.id} className="it">
                        <div><h2 onClick = {movieClicked(movie)}  className="tit" >{movie.title}</h2></div>
                        <div className="movieops">
                             <FontAwsom onClick={editClicked(movie)} name="far fa-edit fa-2x"  />
                             <FontAwsom onClick={trashClicked(movie)}  name="fas fa-trash fa-2x" />
                        </div>
                       
                        </li>)
                })}
            </ul>
            <button className='btn-form' onClick = {newMovie}>new movie</button>
            </div>)
}
export default MovieList;