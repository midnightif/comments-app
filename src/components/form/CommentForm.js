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
        this.setState({name: event.target.value});
    }
    handleTextChange(event) {
        this.setState({body: event.target.value});
    }
    handleSubmit(event) {
        event.preventDefault();
        var name = this.state.name.trim();
        var body = this.state.body.trim();
        this.props.onCommentSubmit({name: name, body: body});
        this.setState({name: '', body: ''})
    }
    render(){

        return(
            <form className="comment-form">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="name" className="form-control" id="name" placeholder="Enter your name" name="name"
                           value={this.state.name}
                           onChange={this.handleAuthorChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="comment">Comment:</label>
                        <textarea className="form-control" rows="5" id="comment" placeholder="Say something..." name="body"
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