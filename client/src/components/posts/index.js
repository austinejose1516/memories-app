import styles from './styles.module.css'
import { useSelector } from 'react-redux'
import { TbDotsVertical } from 'react-icons/tb'
import { FaRegTrashAlt, FaRegThumbsUp } from 'react-icons/fa'

import { useDispatch } from 'react-redux'
import { deletePost, likePost } from '../../actions/posts'

import { Grid } from  'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function Posts({ setCurrentId }) {
  const posts = useSelector((state) => state.posts)

  return <div className={styles.posts}>
    <h1 className={styles.heading}>Posts</h1>
    <div className={styles.postGrid}>
      {!posts.length ? <Grid color="rgba(255, 255, 255, 0.7)" height={80} width={80}/> : posts.map((post, index) => <Post key={index} item={post} setCurrentId={setCurrentId} />)}
    </div>
  </div>
}

export function Post({ item, setCurrentId }) {
  const dispatch = useDispatch()

  return <div className={styles.post}>
    <div className={styles.imageWrapper}>
      <img width={300} height={300} src={item.selectedFile} alt="Post Image" />
    </div>
    <div className={styles.content}>
      <h2>{item.title}</h2>
      <p>{item.message}</p>
      <span>Tags: {item.tags}</span>
      <span>Created By: {item.creator}</span>
  </div>
    <div className={styles.tags}>
      <div className={styles.likes}>
        <button onClick={() => dispatch(likePost(item._id))}>
          <FaRegThumbsUp /> {item.likeCount}
        </button>
      </div>
      <div className={styles.buttons}>
        <button onClick={() => {
          dispatch(deletePost(item._id))
          window.location.reload()
        }}>
          <FaRegTrashAlt />
        </button>
        <button onClick={() => setCurrentId(item._id)}>
          <TbDotsVertical />
        </button>
      </div>
    </div>
  </div>
}