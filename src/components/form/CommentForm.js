import React, {Component} from 'react';
import axios from 'axios';

class CommentForm extends Component{
    constructor(props) {
        super(props);
        this.state = {name: '', text: ''};
    }
    handleFieldChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    };
    handleAuthorChange = (event) => {
        this.setState({name: event.target.value});
    };
    handleTextChange = (event) => {
        this.setState({text: event.target.value});
    };
    handleSubmit = (event) => {
        event.preventDefault();

        let name = this.state.name.trim();
        let text = this.state.text.trim();

        if (!name || !text) {
            return;
        }

        let _id = Date.now();
        let date = new Date();
        let comment = { _id: _id, name: name, text: text, date: date }

        axios.post(
            'http://api.host-panel.net/comments',
            comment,
            { 'Content-Type': 'application/json',}
        ).then(function(){
            console.log('saved successfully')
        });

        this.props.onCommentSubmit(comment);
        this.setState({name: '', text: ''})
    }
    render(){

        return(
            <form className="comment-form">
                <div className="form-group">
                    <label htmlFor="user">Name:</label>
                    <input type="user" className="form-control" id="user" placeholder="Enter your name" name="name"
                           value={this.state.name}
                           onChange={this.handleFieldChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="comment">Comment:</label>
                        <textarea className="form-control" rows="5" id="comment" placeholder="Say something..." name="text"
                                  value={this.state.text}
                                  onChange={this.handleFieldChange}/>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-default" onClick={this.handleSubmit}>Submit</button>
                </div>
            </form>
        )
    }
}

export default CommentForm;