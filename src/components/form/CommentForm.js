import React, {Component} from 'react';

class CommentForm extends Component{
    constructor(props) {
        super(props);
        this.state = {name: '', text: ''};
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleAuthorChange(event) {
        this.setState({name: event.target.value});
    }
    handleTextChange(event) {
        this.setState({text: event.target.value});
    }
    handleSubmit(event) {
        event.preventDefault();

        var name = this.state.name.trim();
        var text = this.state.text.trim();

        if (!name || !text) {
            return;
        }

        this.props.onCommentSubmit({name: name, text: text});
        this.setState({name: '', text: ''})
    }
    render(){

        return(
            <form className="comment-form">
                <div className="form-group">
                    <label htmlFor="user">Name:</label>
                    <input type="user" className="form-control" id="user" placeholder="Enter your name" name="user"
                           value={this.state.name}
                           onChange={this.handleAuthorChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="comment">Comment:</label>
                        <textarea className="form-control" rows="5" id="comment" placeholder="Say something..." name="text"
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