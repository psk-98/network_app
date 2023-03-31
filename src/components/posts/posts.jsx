import styles from "@/styles/Posts.module.css"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { commentIcon } from "public/svgs"
import { timePast } from "./helpers"
import Like from "./like"
import PostMedia from "./postMedia"

export default function Posts({ posts, notComments }) {
  const router = useRouter()

  return (
    <div className={styles.postsWrapper}>
      {posts?.map((post) => {
        return (
          <>
            <div className={styles.post} key={post.id}>
              <div className="contained">
                <div className={styles.postHeader}>
                  <div className={styles.postAuthor}>
                    <Link href={"/profile/" + post?.author?.id}>
                      <div className={styles.postAuthorImg}>
                        <Image
                          src={post?.author?.profile?.get_avatar.replace(
                            /\s+/,
                            ""
                          )}
                          width={100}
                          height={100}
                          alt={post.author?.username}
                        />
                      </div>
                      {post.author?.username}
                    </Link>
                  </div>
                  <div className={styles.postOptions}>
                    {timePast(post.created)}
                  </div>
                </div>
                <Link
                  href={"/post/" + post.id}
                  onClick={(e) =>
                    router.pathname.includes("post") && e.preventDefault()
                  }
                >
                  <div className={styles.postContent}>
                    {post.body}
                    {post.post_media?.length > 0 && (
                      <PostMedia media={post.post_media} id={post.id} />
                    )}
                  </div>
                </Link>
                <div className={styles.postFooter}>
                  <Like post={post} notComments={notComments} />
                  {notComments && (
                    <div className={styles.coms}>
                      {post.num_comments}
                      {commentIcon}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )
      })}
    </div>
  )
}
