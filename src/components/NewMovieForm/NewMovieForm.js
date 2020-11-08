import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


class NewMovieForm extends Component {
    // local state to track user input
    state = {
        title: undefined,
        poster: undefined,
        description: undefined,
        genre: undefined
    }
    // generic event handler that dynamically updates local state to user inputs
    handleChange = (event, type) => {
        this.setState({
            ...this.state,
            [type]: event.target.value
        })
    }
    // dynamically updates local state to what user selects in dropdown menu
    onChangeGenre = (event) => {
        console.log('genres', event.target.value)
        this.setState({
            ...this.state,
            genre: parseInt(event.target.value)
        })
    }
    // handles save functionality when user saves a new movie
    onClickSave = () => {
        console.log('save form button works', this.state)
        // conditional check to ensure user has inputted all fields before submittion
        if(this.state.title !== undefined && 
            this.state.poster !== undefined &&
            this.state.description !== undefined &&
            this.state.genre !== undefined
            ) {
        // dispatch request to index.js for creating new movie with user input values
        this.props.dispatch({type: 'CREATE_MOVIES', payload: this.state})
        // sends user back to home view after new movie is created
        this.props.history.push('/')
        } else {
            alert('You must fill out all input fields to save a movie')
        }
    }

    // cancels new movie form and returns to home page
    onClickCancel = () => {
        this.setState(
        {
            title: undefined,
            poster: undefined,
            description: undefined,
            genre: undefined
        })
        // sends user back to home page
        this.props.history.push('/')
    }

    render() {
        
        return(
            <div>
                <h1 variant="h2">Add New Movie</h1>
                <input placeholder="Title" type="text" onChange={(event) => this.handleChange(event, 'title')} />
                <input placeholder="Movie Poster link" type="text" onChange={(event) => this.handleChange(event, 'poster')} />
                <input placeholder="Movie Description" type="text" onChange={(event) => this.handleChange(event, 'description')} />
                <select name="genre" onChange={this.onChangeGenre} value={this.state.genre}>
                    <option value={undefined}>Genre</option>
                    <option value="1">Adventure</option>
                    <option value="2">Animated</option>
                    <option value="3">Biographical</option>
                    <option value="4">Comedy</option>
                    <option value="5">Disaster</option>
                    <option value="6">Drama</option>
                    <option value="7">Epic</option>
                    <option value="8">Fantasy</option>
                    <option value="9">Musical</option>
                    <option value="10">Romantic</option>
                    <option value="11">Science Fiction</option>
                    <option value="12">Space-Opera</option>
                    <option value="13">Superhero</option>
                </select>
                <div>
                    <button  onClick={() => this.onClickSave()}>Save</button>
                    <button  onClick={() => this.onClickCancel()}>Cancel</button>
                </div>
            </div>
        )
    }
}


export default connect()(withRouter(NewMovieForm));