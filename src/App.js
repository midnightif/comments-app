import React, {Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import CommentContainer from './components/comments/CommentContainer'
import CommentForm from './components/form/CommentForm'
import './vendors/bootstrap/css/bootstrap.min.css'
import './vendors/bootstrap/css/bootstrap-theme.min.css'
import './App.css';

const comments_array = [
    {id: 1, author: "Dylan Cole", text: "Looks amazing and incredible :-)"},
    // {id: 2, author: "Seth Nelson", text: "Typography, button, atmosphere, animation – magical =)"},
    // {id: 3, author: "Eduardo Stewart", text: "Hugely thought out! I think clients would love this."},
    // {id: 4, author: "Connie Chapman", text: "Fresh work you have here."},
    // {id: 5, author: "Dale Washington", text: "Alluring. I admire the use of shade and background!"},
    // {id: 6, author: "Frances Richards", text: "Killer. So magnificent."},
    // {id: 7, author: "Daisy Herrera", text: "I think I'm crying. It's that nice."},
    // {id: 8, author: "Andrew Dunn", text: "TI want to learn this kind of playfulness! Teach me."},
    // {id: 9, author: "Ida Griffin", text: "Let me take a nap... great shot, anyway."},
    // {id: 10, author: "Kristina Anderson", text: "Mission accomplished. It's magical!"}
];


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

        axios.get('https://jsonplaceholder.typicode.com/comments?postId=2')
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
        let comments = this.state.data;
        comment.id = Date.now();
        let newComments  = comments.concat([comment])
        this.setState({data: newComments});
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
