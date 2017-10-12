import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Comment extends Component{
    static propTypes = {
        data: PropTypes.shape({
            id: PropTypes.number.isRequired,
            // user: PropTypes.object.isRequired,
            body: PropTypes.string.isRequired
    })
    }

    render() {
        var user = this.props.data.user;
        var body = this.props.data.body;

        return(
            <div className="comment-box">
                <h4 className="title">{user}</h4>
                {body}
            </div>
        );
    }
}

export default Comment;