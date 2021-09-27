import React, { Component } from 'react';

class MovieForm extends Component {
    state = { 
        movieEdited : this.props.movie,
        shouldUpdate:false
     }
     com
     cancelClicked = () =>{
         this.props.cancelClicked()
     }
     saveClicked = () =>{
        this.props.saveClicked(this.state.movieEdited)
    }
    updateClicked = () =>{
        this.props.updateClicked(this.state.movieEdited)
    }
    changed = evt =>{
        let movie = this.state.movieEdited;
        movie[evt.target.name] = evt.target.value;
        this.setState({movieEdited:movie});
        
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props){
            this.setState({movieEdited:this.props.movie})
        }
        if(prevState === this.state){
            this.Isdisabled = (this.props.movie.title.length===0 ||this.props.movie.description.length===0 )
        }else{
            this.Isdisabled = (this.state.movieEdited.title.length===0 ||this.state.movieEdited.description.length===0 )
        }
    }
    Isdisabled = (this.state.movieEdited.title.length===0 ||this.state.movieEdited.description.length===0 )
    render() { 
        return ( <div className='form'>
            {this.state.movieEdited.id?(<h1 className="top">Update Movie</h1>):(<h1 className="top">New Movie</h1>)}
            <div>
                    ____________
            </div>
            <span className='form-title'>Title</span><br/>
            <input name='title' value={this.state.movieEdited.title} onChange={this.changed} type='text'/><br/>
            <span className='form-title'>Description</span><br/>
            <textarea name='description' onChange={this.changed} value={this.state.movieEdited.description}/><br/>
            {this.state.movieEdited.id?<button className='btn-form' disabled={this.Isdisabled} onClick = {this.updateClicked}>Update</button>:<button className='btn-form' disabled={this.Isdisabled} onClick = {this.saveClicked}>save</button>} 
            <button className='btn-form' onClick = {this.cancelClicked}>Cancel</button>
        </div> );
    }
}
 
export default MovieForm;