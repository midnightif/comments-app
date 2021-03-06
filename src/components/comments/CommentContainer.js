import React, {Component } from 'react';
import Comment from './Comment';

class CommentContainer extends Component{

    render() {
        var data = this.props.data;
        var commentTemplate;
        if (data.length > 0) {
            commentTemplate = data.map(function (item, index) {
                return (
                    <div key={index}>
                        <Comment data={item}/>
                    </div>
                );
            })

        } else {
            commentTemplate = <p>There are no news</p>
        }

        return (
            <div className="comments-container">
                {commentTemplate}
            </div>
        )

    }
}

export default CommentContainer;