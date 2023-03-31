import { getPost } from "@/actions/posts"
import CreateModal from "@/components/common/create"
import Loader from "@/components/layout/loader"
import PageWrapper from "@/components/layout/PageWrapper"
import Like from "@/components/posts/like"
import PostMedia from "@/components/posts/postMedia"
import Posts from "@/components/posts/posts"
import styles from "@/styles/Posts.module.css"
import dayjs from "dayjs"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { commentIcon } from "public/svgs"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function Post() {
  const [isCreate, setCreate] = useState(false)
  const state = useSelector((state) => state)
  const { post, loading } = state.posts
  const router = useRouter()
  const dispatch = useDispatch()

  const { slug } = router.query

  useEffect(() => {
    dispatch(getPost(slug))
  }, [slug])

  return loading ? (
    <Loader loading={loading} />
  ) : (
    <PageWrapper
      key={loading}
      title="Home"
      path={router.asPath}
      desc="This is the home page of FootPrints a mock online store"
    >
      {isCreate && (
        <CreateModal setCreate={setCreate} isComment={true} postId={post?.id} />
      )}
      <div className={styles.post} key={post?.id}>
        <div className="contained">
          <div className={styles.postHeader}>
            <div className={styles.postAuthor}>
              <Link href={"/profile/" + post?.author.id}>
                <div className={styles.postAuthorImg}>
                  <Image
                    src={post?.author.profile?.get_avatar.replace(/\s+/, "")}
                    width={400}
                    height={400}
                    alt={post?.author.name}
                  />
                </div>
                {post?.author.username}
              </Link>
            </div>
            <div className={styles.postOptions}></div>
          </div>
          <div className={styles.postContent}>
            {post?.body}
            {post?.post_media?.length > 0 && (
              <PostMedia media={post?.post_media} id={post?.id} />
            )}
          </div>
          <div className={styles.postFooter}>
            <Like post={post} notComments={true} />
            <div className={styles.coms} onClick={() => setCreate(true)}>
              {post?.comments?.length}
              {commentIcon}
            </div>
          </div>
          <div class={styles.postCreated}>
            <span>{dayjs(post?.created).format("HH:mm")}</span>
            <span className={styles.day}>
              {dayjs(post?.created).format("DD-MM-YYYY")}
            </span>
          </div>
        </div>
      </div>
      <Posts posts={post?.comments} notComments={false} />
    </PageWrapper>
  )
}
