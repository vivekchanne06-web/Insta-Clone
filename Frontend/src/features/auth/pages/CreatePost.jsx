import React, { useRef, useState } from 'react'
import "../style/create.scss"
import { usePost } from '../hooks/usePost';
import { useNavigate } from 'react-router';
const CreatePost = () => {

    const [caption, setCaption] = useState([])

        const navigate = useNavigate()
        const postImageRef = useRef(null)
        const { loading,handleCreatePost } = usePost()
    

        async function handleSubmit(e){
            e.preventDefault()
            const file = postImageRef.current.files[0]

            await handleCreatePost(file, caption)
            navigate("/feed")
        }

        if(loading){
            return(
                <h1>Creating Post...</h1>
            )
        }

  return (
    <main className='create-post-page'>
        <div className='from-container'>
            <h1>Create Post</h1>

            <form onSubmit={handleSubmit}> 
                <label className='post-img-label' htmlFor="postImage">Upload Image</label>
                <input ref={postImageRef} hidden id='postImage' type="file" placeholder='Upload Image' />
                <input value={caption} onChange={(e)=>setCaption(e.target.value)} type="text" placeholder='Caption' name='caption' />
                <button className='button primary-button'>Create Post</button>
            </form>
        </div>
    </main>
  )
}

export default CreatePost
