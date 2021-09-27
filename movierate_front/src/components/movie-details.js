import React, { Component } from 'react';
var FontAwsom = require('react-fontawesome')

class MovieDetails extends Component {
    state = { 
        hightlighted:-1,
        rated : false
     }
     highlightrate = high => evt =>{
         this.setState({hightlighted:high})
     }
     rateMovie = stars => evt =>{
         if(!this.state.rated){
            fetch(`${process.env.REACT_APP_API_URL}/api/movies/${this.props.movie.id}/rate_movie/`,{
            method:"POST",
            headers:{
                'Authorization':`Token ${this.props.token}`,
                'Content-Type' : "application/JSON",
            },
            body:JSON.stringify({stars:stars})
          }).then((res)=>{
              res.json()
          }).then(res =>{
            this.getDetails()
          }).catch(error => console.log(error))
         }
     }
     getDetails = ()=>{
        fetch(`${process.env.REACT_APP_API_URL}/api/movies/${this.props.movie.id}/`,{
      method:"GET",
      headers:{
        'Authorization':`Token ${this.props.token}`
      }
    }).then(resp =>resp.json())
    .then(res => this.props.updatemovie(res))
    .catch(error =>{console.log(error)});
     }
         
    render() { 
        return ( <div className="movie-list">
            <h1 className="top">description</h1>
                <div>
                    ____________
                </div>
            {this.props.movie ? (
                <div>
                <h2>{this.props.movie.title}</h2>
                <FontAwsom className={this.props.movie.avrRating >0?"redstar":"whitestar"} name="far fa-star fa-2x" />
                <FontAwsom className={this.props.movie.avrRating >1?"redstar":"whitestar"} name="far fa-star fa-2x" />
                <FontAwsom className={this.props.movie.avrRating >2?"redstar":"whitestar"} name="far fa-star fa-2x" />
                <FontAwsom className={this.props.movie.avrRating >3?"redstar":"whitestar"} name="far fa-star fa-2x" />
                <FontAwsom className={this.props.movie.avrRating >4?"redstar":"whitestar"} name="far fa-star fa-2x" />
                <h2 style={{
                    display:'inline'
                }}>     {"  ("+this.props.movie.numberOfRatinfs})</h2>
                <h2>{this.props.movie.description}</h2>
                
                <div className="rate-container">
                    <h2>Rate it!!!</h2>
                    {[...Array(5)].map((e,i)=>{
                     return <FontAwsom  key={i} className={this.state.hightlighted>i-1?"purplestar":"whitestar"} name="far fa-star fa-3x" 
                     onMouseEnter = {this.highlightrate(i) } onMouseLeave = {this.highlightrate(-1)} onClick = {this.rateMovie(i+1)}/>
                })}
                </div>
              
                </div>
            ):null}


        </div> );
    }
}
 
export default MovieDetails;