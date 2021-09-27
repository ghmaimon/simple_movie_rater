import React,{Component} from 'react';
import './css/App.css';
import MovieList from './components/movies-list'
import MovieDetails from './components/movie-details'
import MovieForm from './components/movie-form'
import {withCookies} from "react-cookie";
var FontAwsom = require('react-fontawesome')
class App extends Component {
  
  state = {
    movies:[],
    selectedMovie:null,
    movieEdited:null,
    token: this.props.cookies.get('mr-token')
  }
  deleteMovie = (movie) =>{
    fetch(`${process.env.REACT_APP_API_URL}/api/movies/${movie.id}/`,{
      method:"DELETE",
      headers:{
        'Authorization':`Token ${this.state.token}`
      }
    })
    .catch(error =>{console.log(error)})
    .finally(()=>this.updateList());
    this.setState({selectedMovie:null})
  }
  movieClicked = (movie) =>{
    this.setState({selectedMovie:movie,movieEdited:null})
  }
  componentDidMount(){
    if(this.state.token!=='undefined'){
        this.updateList()
    }else{
        window.location.href = '/'
    }
  }
  updateList(){
    fetch(`${process.env.REACT_APP_API_URL}/api/movies/`,{
      method:"GET",
      headers:{
        'Authorization':`Token ${this.state.token}`
      }
    }).then(resp =>resp.json())
    .then(res => this.setState({movies : res}))
    .catch(error =>{console.log(error)})
  }
  editMovie = movie =>{
    this.setState({movieEdited: movie})
  }
  newMovie = () =>{
    this.setState({movieEdited: {title: "",description:""}})
  }
  cancelForm = () =>{
    this.setState({movieEdited: null})
  }
  updateMovie = movie => {
    fetch(`${process.env.REACT_APP_API_URL}/api/movies/${movie.id}/`,{
      method:"PUT",
      headers:{
          'Authorization':`Token ${this.state.token}`,
          'Content-Type' : "application/JSON",
      },
      body:JSON.stringify({title:movie.title,description:movie.description})
    }).then(
      ()=>this.updateList()
    ).catch(error => console.log(error))}
  saveMovie = movie =>{
    fetch(`${process.env.REACT_APP_API_URL}/api/movies/`,{
      method:"POST",
      headers:{
          'Authorization':`Token ${this.state.token}`,
          'Content-Type' : "application/JSON",
      },
      body:JSON.stringify({title:movie.title,description:movie.description})
    }).then(
      ()=>this.updateList()
    ).catch(error => console.log(error))
    this.cancelForm()
  }

  render(){
    return (
      <div >
        <header className="header">
          <div className="text-box">
          <h1>
            <span>Movie Rate</span>
            <FontAwsom  name="far fa-film fa-2x" />
          </h1> 
          <a href="#rate" className = "btn btn-white">Rate Now</a>
          </div>
        </header>
        <h2 style= {{
            textAlign:'center',
            color: 'black',
            fontFamily: 'cursive',
            fontSize:"60px",
            
        }}>Movie list</h2>
        <div id = 'rate' className='layout'>
              {this.state.token !=='undefined'?<MovieList newMovie = {this.newMovie} movies = {this.state.movies} movieClicked = {this.movieClicked} 
              trashClicked = {this.deleteMovie} editClicked = {this.editMovie}/>:null}
              {!this.state.movieEdited ? <MovieDetails token = {this.state.token} movie = {this.state.selectedMovie} updatemovie = {this.movieClicked}/> :
              <MovieForm saveClicked={this.saveMovie} updateClicked = {this.updateMovie} cancelClicked={this.cancelForm} movie = {this.state.movieEdited}/>}
        </div>
      </div>);
      
  }
}

export default withCookies(App);
