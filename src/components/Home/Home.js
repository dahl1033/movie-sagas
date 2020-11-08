import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid, Card, Typography } from '@material-ui/core'
import './Home.css';



class Home extends Component {
    // on page load run these functions
    componentDidMount() {
        this.getMovies();
        this.getGenres();
    }
    // dispatch request to grab movie list from DB
    getMovies = () => {
        this.props.dispatch({type: 'FETCH_MOVIES'})
    }
    // dispatch request to grab genre list from DB with related movies
    getGenres = () => {
        this.props.dispatch({type: 'FETCH_GENRES'})
    }

    routeToDetails = (value) => {
        // dispatch call to get movie information from DB for selected movie
        this.props.dispatch({ type: 'FETCH_MOVIE_ID', payload: value})
        // dispatch call to get genres of selected movie
        this.props.dispatch({type: 'FETCH_SPECIFIC_GENRES', payload: value})
        // routes user to details view
        this.props.history.push(`/details`)
    }

    render() {
        return(
            <div>
                <Grid container justify="flex-start" alignItems="center">
                    <Typography variant="h2" className="allMoviesHeading">All Movies</Typography>
                        <Grid container justify="flex-start" spacing={2} >
                            {this.props.movies.map((movie) =>
                            <>
                            <Card className="movieCard" key={movie.id}>
                                    <img onClick={() => this.routeToDetails(movie.id)} src={movie.poster} alt={movie.title}/>
                            </Card>
                            </>
                            )}
                        </Grid>  
                </Grid>
                <br/>
                {/* <div>
                    
                        {this.props.genres.map((genre) => 
                        <ul>
                           <li>{genre.name}</li>
                            <ul>
                                {genre["array_agg"].map((elem) =>
                                            <li>{elem}</li>
                                )}
                            </ul>
                        </ul>
                        )}
                    
                </div> */}
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => ({
    movies: reduxState.movies,
    genres: reduxState.genres
});

export default connect(mapStateToProps)(withRouter(Home));