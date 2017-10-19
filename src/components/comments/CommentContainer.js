import React, {Component } from 'react';
import Comment from './Comment';
import axios from 'axios';

class CommentContainer extends Component{
    constructor(props) {
        super(props);
        // this.handleCommentDelete = this.handleCommentDelete.bind(this);
    }

    handleCommentDelete(id) {

        axios.delete(
            'http://api.host-panel.net/comment/'+ id,
            { 'Content-Type': 'application/json',}
        ).then(function(response){
            console.log('deleted successfully')
        });
        this.getComments();
    }

    render() {
        var data = this.props.data;
        var commentTemplate;
        if (data.length > 0) {
            commentTemplate = data.map(function (item, index) {

                return (
                    <div key={index}>
                        <Comment data={item} callbackParent={(id) => this.handleDelete(id)}/>
                    </div>
                );
            })

        } else {
            commentTemplate = <p>There are no comments</p>
        }

        return (
            <div className="comments-container">
                {commentTemplate}
            </div>
        )

    }
}

export default CommentContainer;