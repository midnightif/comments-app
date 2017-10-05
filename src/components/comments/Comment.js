import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Comment extends Component{
    static propTypes = {
        data: PropTypes.shape({
            id: PropTypes.number.isRequired,
            author: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired
    })
    }

    render() {
        var author = this.props.data.author;
        var text = this.props.data.text;

        return(
            <div className="comment-box">
                <h4 className="title">{author}</h4>
                {text}
            </div>
        );
    }
}

export default Comment;