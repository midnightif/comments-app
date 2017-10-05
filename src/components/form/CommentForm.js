import React, {Component} from 'react';

class CommentForm extends Component{
    constructor(props) {
        super(props);
        this.state = {author: '', text: ''};
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleAuthorChange(event) {
        this.setState({author: event.target.value});
    }
    handleTextChange(event) {
        this.setState({text: event.target.value});
    }
    handleSubmit(event) {
        alert('Author is: ' + this.state.author + '\n' + 'Text is: ' + this.state.text
        )
    }
    render(){

        return(
            <form className="comment-form">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="name" className="form-control" id="name" placeholder="Enter your name" name="name"
                           value={this.state.author}
                           onChange={this.handleAuthorChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="comment">Comment:</label>
                        <textarea className="form-control" rows="5" id="comment" placeholder="Say something..." name="comment"
                                  value={this.state.text}
                                  onChange={this.handleTextChange}/>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-default" onClick={this.handleSubmit}>Submit</button>
                </div>
            </form>
        )
    }
}

export default CommentForm;