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
        this.setState({user: event.target.value});
    }
    handleTextChange(event) {
        this.setState({body: event.target.value});
    }
    handleSubmit(event) {
        event.preventDefault();
        if (!user || !body) {
            return;
        }
        var user = this.state.user.trim();
        var body = this.state.body.trim();

        this.props.onCommentSubmit({user: user, body: body});
        this.setState({user: '', body: ''})
    }
    render(){

        return(
            <form className="comment-form">
                <div className="form-group">
                    <label htmlFor="user">Name:</label>
                    <input type="user" className="form-control" id="user" placeholder="Enter your user" user="user"
                           value={this.state.user}
                           onChange={this.handleAuthorChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="comment">Comment:</label>
                        <textarea className="form-control" rows="5" id="comment" placeholder="Say something..." user="body"
                                  value={this.state.body}
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