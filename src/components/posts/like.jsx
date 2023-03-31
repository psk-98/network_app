import { likePost, unlikePost } from "@/actions/posts"
import styles from "@/styles/Posts.module.css"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { isLiked } from "./helpers"

export default function Like({ post, notComments }) {
  const accounts = useSelector((state) => state.accounts)
  const dispatch = useDispatch()
  const [addLike, setAdd] = useState(0)

  const handleClick = () => {
    if (isLiked(post.id, !notComments, accounts?.user?.likes)) {
      dispatch(
        unlikePost({
          id: post.id,
          isComment: !notComments,
        })
      )
      setAdd(0)
    } else {
      dispatch(
        likePost({
          id: post.id,
          isComment: !notComments,
        })
      )
      setAdd(1)
    }
  }

  return (
    <div className={styles.likes} onClick={() => handleClick()}>
      {post?.num_likes + addLike}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
        <path
          d="m22.05 38.95-2.3-2.15q-6-5.5-10.375-10.5T5 15.95q0-4.1 2.775-6.875Q10.55 6.3 14.65 6.3q2.3 0 4.775 1.175Q21.9 8.65 24 11.8q2.25-3.15 4.625-4.325Q31 6.3 33.35 6.3q4.1 0 6.875 2.775Q43 11.85 43 15.95q0 5.4-4.475 10.425T28.25 36.8l-2.3 2.1q-.85.75-1.95.75t-1.95-.7Zm.95-24.6q-1.55-2.8-3.75-4.3t-4.6-1.5q-3.25 0-5.325 2.1t-2.075 5.3q0 2.65 1.625 5.45 1.625 2.8 4.075 5.575 2.45 2.775 5.3 5.4Q21.1 35 23.6 37.25q.15.15.4.15t.4-.15q2.5-2.2 5.35-4.85 2.85-2.65 5.3-5.425 2.45-2.775 4.075-5.6 1.625-2.825 1.625-5.425 0-3.2-2.1-5.3-2.1-2.1-5.3-2.1-2.45 0-4.625 1.475T24.95 14.35q-.2.3-.45.45-.25.15-.55.15-.3 0-.55-.15-.25-.15-.4-.45ZM24 23Z"
          fill={
            isLiked(post?.id, !notComments, accounts?.user?.likes)
              ? "#ff0000"
              : "#050505"
          }
        />
      </svg>
    </div>
  )
}
