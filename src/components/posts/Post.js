import React, { useState, useEffect } from "react";
import avatar from "./avatar.png";
import "./Post.css";
import { FaRegThumbsUp, FaRegThumbsDown, FaSadCry } from "react-icons/fa";
import NewComment from "../newComment/NewComment";
import { useNavigate } from "react-router-dom";
import Helper from '../Helper';
import CommentContainer from "../comment/CommentContainer";
function Post({ id, text, date, likes, disLikes }) {
    let navigate = useNavigate();
    const [addComment, setAddComment] = useState(false);
    const [hide, setHide] = useState(true);
    const [allPosts, setAllPosts] = useState(JSON.parse(localStorage.getItem('blog-owner')).posts)
    const user = JSON.parse(localStorage.getItem('current-user'));

    const handleAddButton = () => {
        setAddComment(() => {
            setHide(true);
            if (user) {
                return true;
            } else {
                navigate("Login");
            }
        });
    };
    useEffect(() => {
        setHide(true);
        setAddComment(false);
        setAllPosts(JSON.parse(localStorage.getItem('blog-owner')).posts)
    }, []);
    return (
        <div>
            <div className="post__container">
                <div className="post__info">
                    <img src={avatar} alt="sad girl" className="post__image" />
                    <div>
                        <h2 className="post__writer">Sahar Zahran</h2>
                        <h3 className="post__date">{date}</h3>
                    </div>
                </div>
                <hr />
                <div className="post__content">
                    {text}
                    <FaSadCry style={{ color: "darkgray" }} />
                    <FaSadCry style={{ color: "darkgray" }} />
                </div>
                <hr />
                <FaRegThumbsUp className="post__button-like" />
                <span className="post__likes">{likes}</span>
                <FaRegThumbsDown
                    className="post__button-dislike"
                />
                <span className="post__dislikes">{disLikes}</span>
                {hide && (
                    <button className="post__button--comment" onClick={handleAddButton}>
                        Add Comment
                    </button>
                )}
                {addComment && <CommentContainer post_id={id} />}
                {/* comments section */}
                <br />
                {(allPosts !== null) ? allPosts.map((post) => ((post.id === id && post.comments !== []) ? (post.comments.map((comment, index) =>
                    <NewComment
                        key={index}
                        post_id={id}
                        name={comment.username}
                        text={comment.text}
                        currentDate={Helper.getCurrentDate()}
                    />)) : '')) : 'No comments yet!!'}

            </div>
        </div>
    );
}

export default Post;
