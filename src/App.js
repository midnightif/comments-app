import React, {Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import CommentContainer from './components/comments/CommentContainer'
import CommentForm from './components/form/CommentForm'
import './vendors/bootstrap/css/bootstrap.min.css'
import './vendors/bootstrap/css/bootstrap-theme.min.css'
import './App.css';

class App extends Component {
    static  propTypes = {
        data: PropTypes.array
    };
    constructor(props) {
        super(props);
        this.state = {data: [] };
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    }
    componentDidMount (){
        this.getComments();
    }
    getComments(){

        axios.get('http://api.host-panel.net/comment')
            .then(data =>{
                this.setState({data: data.data});
            })
            .catch(function(data) {
                if(data instanceof Error) {
                    console.log(data);
                } else {
                    console.log(data);
                }
            });
    }
    handleCommentSubmit(comment) {

        comment._id = Date.now();
        comment.date = new Date();

        axios.post(
            'http://api.host-panel.net/comment',
            comment,
            { 'Content-Type': 'application/json',}
        ).then(function(response){
            console.log('saved successfully')
        });
        this.getComments();
    }

    render() {
        return (
            <div className="container">

                <div className="row">
                    <h1>Comments</h1>
                </div>
                <div className="row">
                    <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
                </div>
                <div className="row">
                    <CommentContainer data={this.state.data}/>
                </div>

            </div>
        );
    }
}

export default App;
