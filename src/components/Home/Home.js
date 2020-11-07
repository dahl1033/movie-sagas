import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import Grid from '@material-ui/core/Grid'
// import { CardContent, Divider, Tooltip, Typography } from '@material-ui/core';
// import Card from '@material-ui/core/Card';


class Home extends Component {
   // Calls getMovies on load
    componentDidMount() {
        this.getMovies();
    }
    // Starts FETCH_MOVIES saga to initiate database GET call for movie list
    getMovies = () => {
        this.props.dispatch({type: 'FETCH_MOVIES'})
    }

    render() {
        return(
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>
                                Movie
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.movies.map((movie) =>
                            <tr key={movie.id}>
                                <td>{movie.title}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => ({
    movies: reduxState.movies,
});

export default connect(mapStateToProps)(withRouter(Home));