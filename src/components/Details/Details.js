import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


class Details extends Component {
    // route user to home view
    homePage = () => {
        this.props.history.push('/')
    }

    render() {
        console.log(`Redux Store: Genres:${this.props.specificGenres} Movie: ${this.props.specificMovie}`)
        return(
            <div>
                <div>
                    <h1>{this.props.title}</h1>
                    {this.props.specificGenres.map((genre) =>
                        <h3>{genre.name}</h3>
                    )}
                    <img src={this.props.poster} alt={this.props.title} />
                    <p>{this.props.description}</p>
                    <button onClick={() => this.homePage()}>Back</button>
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