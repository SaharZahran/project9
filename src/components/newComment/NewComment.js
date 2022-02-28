import React, { useState } from 'react'
import faker from '@faker-js/faker';
import './NewComment.css';
import Helper from '../Helper';


function NewComment(props) {
  const [editedComment, setEditedComment] = useState('');
  const [showEditForm, setShowEditForm] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem('current-user'));
  const newOwner = JSON.parse(localStorage.getItem('blog-owner'));

  const getAllComments = () => {
    let arr;
    const allComments = newOwner.posts.map(post => (post.id === props.post_id) ? post.comments : '');
    allComments.forEach(arrOfComments => {
      if (typeof (arrOfComments) === 'object') {
        arr = arrOfComments;
      }
    });
    return arr;
  }
  const deleteComment = () => {
    let updatedArr = [];
    getAllComments().map(comment => (comment.username === currentUser.name) ? '' : updatedArr.push(comment));
    newOwner.posts.map(post => (post.id === props.post_id) ? post.comments = updatedArr : post.comments);
    localStorage.setItem('blog-owner', JSON.stringify(newOwner));
    window.location.reload();

  }


  const editComment = () => {
    setShowEditForm(true);
  }

  const updateComment = (e) => {
    e.preventDefault();
    let editedArr = [];
    getAllComments().map(comment => (comment.username === currentUser.name) ? editedArr.push({
      username: currentUser.name,
      text: editedComment,
      postId: props.post_id,
      date: Helper.getCurrentDate()
    }) : editedArr.push(comment));
    newOwner.posts.map(post => (post.id === props.post_id) ? post.comments = editedArr : post.comments);
    localStorage.setItem('blog-owner', JSON.stringify(newOwner));
    window.location.reload();
  }

  return (
    <div className="ui comments newcomment">
      <div className="comment">
        <a className="avatar" href="/">
          <img src={faker.image.avatar()} alt='user' />
        </a>
        <div className="content">
          <a className="author" href="/">{props.name}</a>
          <div className="metadata">
            <span className="date">{props.currentDate}</span>
          </div>
          <div className="text">{props.text}</div>
          {showEditForm && <form onSubmit={updateComment}>
            <input type="text" placeholder='Edit your comment' onChange={(e) => setEditedComment(e.target.value)} />
            <button type='submit'>Save</button>
          </form>}
          <div className='controls'>
            <button className="comment__delete" onClick={deleteComment}>Delete</button>
            <button className="comment__update" onClick={editComment}>Update</button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default NewComment;
