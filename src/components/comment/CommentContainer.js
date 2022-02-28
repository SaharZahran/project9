import React, { useState } from 'react'
import './CommentContainer.css';
import Helper from '../Helper';

const CommentContainer = ({ post_id }) => {
    const [close, setClose] = useState(false);
    const [comment, setComment] = useState('');
    const user = JSON.parse(localStorage.getItem("current-user")).name;
    const owner = JSON.parse(localStorage.getItem("blog-owner"));
    
    const saveComment = (e) => {
        e.preventDefault();
        owner.posts.map(post=>((post.id === post_id)?post.comments.push(comment):()=>post))
        localStorage.setItem('blog-owner', JSON.stringify(owner));
        window.location.reload();
    };
    const closeForm = () => {
        setClose(() => true);
    };

    return (
        <div className='commentContainer'>
            <div className={close ? "comment__form--disappear" : "comment__form--show"}>
                <div className="comment__container">
                    <button
                        className="ui button addNewComment__button--close"
                        onClick={closeForm}
                    >
                        X
                    </button>
                    <form className="ui form " onSubmit={saveComment}>
                        <div className="field">
                            <input
                                type="text"
                                name="comment"
                                placeholder="Type your comment"
                                onChange={(e) => setComment(() => {
                                    return {
                                        username: user,
                                        text: e.target.value,
                                        postId: post_id,
                                        date: Helper.getCurrentDate()
                                    }
                                })}
                            />
                        </div>
                        <button
                            className="ui button addNewComment__button--primary"
                            type="submit"
                        >
                            Add Comment
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CommentContainer