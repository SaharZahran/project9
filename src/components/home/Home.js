import React, { useEffect, useState } from 'react'
import "./Home.css";
import Post from '../posts/Post'
import Helper from '../Helper';

function Home() {
  const [post, setPost] = useState('');
  const [allPosts, setAllPosts] = useState([]);
  const [checkOwner, setCheckOwner] = useState(JSON.parse(localStorage.getItem('current-user')).email)
  const [show, setShow] = useState(false)
  useEffect(() => {
    if (checkOwner.match('saharzahran@gmail.com')){
      setShow(true);
    }
    setAllPosts(() => {
      if (JSON.parse(localStorage.getItem('blog-owner'))){
        return JSON.parse(localStorage.getItem('blog-owner')).posts;
      }
    })
  }, [post, checkOwner])
  function savePost(e) {
    e.preventDefault();
    const currenDate = Helper.getCurrentDate();

    // localStorage.setItem('blog-owner', JSON.stringify({
    //   name: 'sahar',
    //   email: 'sahar.yous.zahran@gmail.com',
    //   password: 'Sahar2022@',
    //   posts: [{
    //     id: Math.ceil(Math.random() * 1000),
    //     text: "Why does it always rain in my life? and why don't I always have an umbrella!!",
    //     date:currenDate,
    //     likes: 5,
    //     disLikes: 0,
    //     comments: []
    //   }]
    // }))
    const user = JSON.parse(localStorage.getItem('blog-owner'));
    user.posts = [...user.posts, {
    id : Math.ceil(Math.random() * 1000),
      text: post,
      date: currenDate,
      likes: 0,
      disLikes: 0,
      comments: []
    }];
    localStorage.setItem('blog-owner', JSON.stringify(user));
    setPost('');
  }
  return (
    <>
      {show && 
      <form className='home__addPostForm' onSubmit={savePost}>
        <input type="text" onChange={(e) => setPost(e.target.value)} placeholder="What's new Sahar??" value={post} />
        <button>Add Post</button>
      </form>}
      
      {(allPosts)?
        allPosts.map((storedPost, index) => (
          <Post
            key={index}
            id={storedPost.id}
            text={storedPost.text}
            date={Helper.getCurrentDate()}
            likes={storedPost.likes}
            disLikes={storedPost.disLikes}
            comments={storedPost.comments}
          />
        ))  
    :'no posts'}
    </>
  )
}

export default Home

