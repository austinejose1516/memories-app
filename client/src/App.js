import React, { useState } from 'react'
import Posts from '../src/components/posts/index'
import Form from '../src/components/form/index'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getPosts, deletePost } from './actions/posts'
import './styles.css'

export default function App () {
  const [currentId, setCurrentId] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPosts())
  }, [currentId, dispatch])

  return <div className="background">
    <video src="/pexels-mikhail-nilov-7677119.mp4" type="video/mp4" autoPlay={true} muted={true} loop={true} />
    <div className="overlay">
    </div>
    <div className="container">
      <h1>Memories Project | Full Stack Development</h1>
      <hr />
      <div className="grid">
        <Posts setCurrentId={setCurrentId} />
        <Form currentId={currentId} setCurrentId={setCurrentId} />
      </div>
    </div>
  </div>

}