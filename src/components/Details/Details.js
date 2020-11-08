import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid, Card, Typography } from '@material-ui/core'


class Details extends Component {
    // route user to home view
    homePage = () => {
        this.props.history.push('/')
    }

    render() {
        console.log(`Redux Store: Genres:${this.props.specificGenres} Movie: ${this.props.specificMovie}`)
        return(
            <div>
                <Grid container justify="flex-start" alignItems="center"> 
                        <Grid container justify="center" spacing={8} >
                            <Typography variant="h2" className="allMoviesHeading">{this.props.title}</Typography>
                            <>
                            <Card className="movieCard">
                                <img src={this.props.poster} alt={this.props.title} />
                                <Grid className="genreList">
                                    <Typography variant="h6">Genres:</Typography>
                                {this.props.specificGenres.map((genre) =>
                                    <Typography variant="subtitle1" className="allMoviesHeading">{genre.name}</Typography>
                                )}
                                </Grid>
                                <Typography variant="subtitle1" className="allMoviesHeading">{this.props.description}</Typography>
                                <button onClick={() => this.homePage()}>Back</button>
                            </Card>
                            </>
                        </Grid>  
                </Grid>
                <div>

                    
                    
                    
                    
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => ({
    poster: reduxState.specificMovie.poster,
    title: reduxState.specificMovie.title,
    description: reduxState.specificMovie.description,
    specificGenres: reduxState.specificGenres,
    specificMovie: reduxState.specificMovie
})

export default connect(mapStateToProps)(withRouter(Details));