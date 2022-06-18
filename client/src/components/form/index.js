import { useState, useEffect } from 'react'
import FileBase from 'react-file-base64'
import { useDispatch } from 'react-redux'
import { createPost, updatePost } from "../../actions/posts"
import { useSelector } from 'react-redux'
import styles from './styles.module.css'

export default function Form({ currentId, setCurrentId }) {
  const [postData, setPostData] = useState({
    creator: '', title: '', message: '', tags: '', selectedFile: ''
  })
  const post = useSelector((state) => currentId ? state.posts.find((message) => message._id === currentId) : null)
  const dispatch = useDispatch()

  useEffect(() => {
    if(post) setPostData(post)
  }, [post])


  const clear = () => {
    setCurrentId(0)
    setPostData({creator: '', title: '', message: '', tags: '', selectedFile: ''})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(currentId) {
      dispatch(updatePost(currentId, postData))
      clear()
    } else {
      dispatch(createPost(postData))
      clear()
    }
  }

  return <div className={styles.form}>
    <form autoComplete="off">
      <h6>{currentId ? 'Edit' : 'Create'} your Memory Here</h6>
      <hr />
      <label>Creator:</label>
      <input
        required
        name="creator"
        value={postData.creator}
        onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
      />
      <label>Title:</label>
      <input
        required
        name="title"
        value={postData.title}
        onChange={(e) => setPostData({ ...postData, title: e.target.value })}
      />
      <label>Message:</label>
      <input
        required
        name="message"
        value={postData.message}
        onChange={(e) => setPostData({ ...postData, message: e.target.value })}
      />
      <label>Tags:</label>
      <input
        required
        name="tags"
        value={postData.tags}
        onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
      />
      <div className={styles.fileInput}>
        <FileBase
          type="file"
          multiple={false}
          onDone={({base64}) => setPostData({ ...postData, selectedFile: base64})}
        />
      </div>
      <button className={styles.submit} type="submit" onClick={handleSubmit}>Submit {currentId ? "Changes" : null}</button>
      <button className={styles.clear} onClick={clear}>Clear</button>
    </form>
  </div>
}