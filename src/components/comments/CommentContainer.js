import React, {Component } from 'react';
import Comment from './Comment';

class CommentContainer extends Component{

    render() {
        let data = this.props.data;
        let commentTemplate;

        if (data.length > 0) {
            commentTemplate = data.map((item, index) => {

                return (
                    <div key={index}>
                        <Comment updateComment={this.props.updateComment} deleteComment={this.props.deleteComment} data={item} />
                    </div>
                );
            })

        } else {
            commentTemplate = <p>There are no comments</p>
        }

        return (
            <div className='comments-container'>
                {commentTemplate}
            </div>
        )

    }
}

export default CommentContainer;