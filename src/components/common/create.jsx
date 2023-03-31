import { createComment, createPost } from "@/actions/posts"
import {
  previewItemVariants,
  previewWrapperVariants,
} from "@/animations/common"
import styles from "@/styles/Create.module.css"
import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function CreateModal({ setCreate, isComment, postId }) {
  const [body, setBody] = useState()
  const [images, setImages] = useState([])

  const dispatch = useDispatch()

  const postState = useSelector((state) => state.posts)

  useEffect(() => {
    if (postState.created) setCreate(false)
  }, [postState.created, setCreate])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (body || images.length > 0) {
      const formData = new FormData()
      formData.append("body", body)
      formData.append("post", postId)

      for (let i = 0; i < images.length; i++) {
        formData.append("media", images[i])
      }
      isComment
        ? dispatch(createComment(formData))
        : dispatch(createPost(formData))
    }
  }

  return (
    <div className={styles.formWrapper}>
      <div className="contained">
        <div className={styles.header}>
          <div onClick={() => setCreate(false)}>Cancel</div>
          <div onClick={(e) => handleSubmit(e)}>
            {isComment ? "Comment" : "Post"}
          </div>
        </div>
        <div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={styles.textInput}>
              <textarea
                type="text"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="What's on your mind?"
              />
            </div>
            <motion.div
              className={styles.filePreview}
              initial="hidden"
              animate="visible"
              variants={previewWrapperVariants}
            >
              {images &&
                images.length > 0 &&
                Array.from(images).map((image, i) => {
                  return (
                    <motion.div variants={previewItemVariants} key={i}>
                      <Image
                        src={URL.createObjectURL(image)}
                        width={100}
                        height={100}
                        alt="preview of a image"
                      />
                    </motion.div>
                  )
                })}
            </motion.div>

            {!isComment && (
              <div className={styles.fileInput}>
                <input
                  type="file"
                  // multiple * uncomment once you fixed multiple photo navigation
                  onChange={(e) => setImages(e.target.files)}
                  accept="image/png, image/jpeg, image/webp"
                />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
                  <path d="M433.5 836q72.5 0 121.5-49t49-121.5q0-72.5-49-121T433.5 496q-72.5 0-121 48.5t-48.5 121q0 72.5 48.5 121.5t121 49ZM94 982q-24 0-42-18t-18-42V409q0-23 18-41.5T94 349h147l55-66q8-11 20-16t26-5h222q12.75 0 21.375 8.625T594 292v117H94v513h680V529h30q6 0 11.481 2.294t9.5 6.5Q829 542 831.5 547.543 834 553.087 834 559v363q0 24-18.5 42T774 982H94Zm680-633h-56q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T718 289h56v-57q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T834 232v57h57q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T891 349h-57v56q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625-12.825 0-21.325-8.625T774 405v-56ZM94 409v513-513Z" />
                </svg>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
