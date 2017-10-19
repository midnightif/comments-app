import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

class Comment extends Component{
    /* TODO write prop Types */
    // static propTypes = {
    //
    //     data: PropTypes.shape({
    //         id: PropTypes.number.isRequired,
    //         // user: PropTypes.object.isRequired,
    //         body: PropTypes.string.isRequired
    // })
    // }
    constructor(props) {
        super(props);
        this.state = {_id: ''};
        // this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(id) {
        this.props.callbackParent(id);
    }

    render() {
        var name = this.props.data.name;
        var text = this.props.data.text;
        var id = this.props.data._id;
        var date = this.props.data.date;

        return(
            <div className="comment-box">
                <div className="title">
                    {name} <span className="text-muted">commented <Moment fromNow>{date}</Moment></span>
                    <div role="toolbar" className="btn-toolbar right">
                        <button id="{id}" type="button" onClick={() => this.handleDelete(id)} className="btn btn-danger btn-xs"><i className="fa fa-times" aria-hidden="true"></i></button>
                        <button id="{id}" type="button" className="btn btn-default btn-xs"><i className="fa fa-pencil" aria-hidden="true"></i></button>
                    </div>
                </div>

                {text}
            </div>
        );
    }
}

export default Comment;