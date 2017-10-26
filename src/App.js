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
    }
    componentDidMount () {
        this.getComments();
    };
    updateComment = (comment) => {
        let comments = this.state.data;
        let index = comments.findIndex(x => x._id === comment._id);
        comments.splice(index, 1, comment);

        this.setState({data: comments});

    };
    deleteComment = (_id) =>{
        let comments = this.state.data;
        let index = comments.findIndex(x => x._id === _id);
        comments.splice(index, 1);

        this.setState({data: comments});

    };
    getComments = () => {
        axios.get('http://api.host-panel.net/comments')
            .then( data => {
                this.setState({data: data.data });
            })
            .catch(function(data) {
                if(data instanceof Error) {
                    console.log(data);
                } else {
                    console.log(data);
                }
            });

    };
    handleCommentSubmit = (comment) => {
        let comments = this.state.data;
        comments.push(comment);
        this.setState({data: comments});

    };

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
                    <CommentContainer updateComment={this.updateComment} deleteComment={this.deleteComment} data={this.state.data}/>
                </div>
            </div>
        );
    }
}

export default App;
