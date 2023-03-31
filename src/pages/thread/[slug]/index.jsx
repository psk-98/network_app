import { getThread } from "@/actions/accounts"
import { sendMessage } from "@/actions/threads"
import { PrivateRoute } from "@/components/common/privateRoutes"
import Loader from "@/components/layout/loader"
import PageWrapper from "@/components/layout/PageWrapper"
import { whichUser } from "@/components/messages/helpers"
import { timePast } from "@/components/posts/helpers"
import styles from "@/styles/Messages.module.css"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { sendIcon } from "public/svgs"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function Thread() {
  const [message, setMessage] = useState()
  const [media, setMedia] = useState()

  const { thread, loading, user } = useSelector((state) => state.accounts)
  const dispatch = useDispatch()

  const router = useRouter()
  const { slug } = router.query

  useEffect(() => {
    dispatch(getThread({ thread_id: slug }))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("receiver", whichUser(user, thread)?.id)
    formData.append("thread_id", slug)

    console.log(formData.get("media"))
    message
      ? formData.append("message", message)
      : formData.append("image", media)

    dispatch(sendMessage(formData))
  }

  return loading ? (
    <Loader loading={loading} />
  ) : (
    <PrivateRoute>
      <PageWrapper
        key={loading}
        title="Home"
        path={router.asPath}
        desc="This is the home page of FootPrints a mock online store"
      >
        <div className={styles.threadHeader}>
          <Link
            href={`/profile/${whichUser(user, thread)?.id}`}
            className={styles.receiver}
          >
            {console.log(whichUser(user, thread))}
            <Image
              src={whichUser(user, thread)?.profile?.get_avatar.replace(
                /\s+/,
                ""
              )}
              alt={`profile pic`}
              width={100}
              height={100}
            />
            <span>{whichUser(user, thread)?.username}</span>
          </Link>
        </div>
        <div className="contained">
          <div className={styles.threadWrapper}>
            {thread?.messages?.map((message, i) => {
              return (
                <div
                  className={
                    message.sender_user === user.id
                      ? styles.ownerMessage
                      : styles.otherMessage
                  }
                  key={i}
                >
                  <span>{message.body} </span>
                  <span>{timePast(message.created)} ago</span>
                </div>
              )
            })}
          </div>
          <div className={styles.messageForm}>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className={styles.fileInput}>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={(e) => setMedia(e.target.files[0])}
                />
                {message ? (
                  <input
                    type="file"
                    disabled
                    accept="image/png, image/jpeg, image/webp"
                    onChange={(e) => setMedia(e.target.files[0])}
                  />
                ) : (
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    onChange={(e) => setMedia(e.target.files[0])}
                  />
                )}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
                  <path d="M433.5 836q72.5 0 121.5-49t49-121.5q0-72.5-49-121T433.5 496q-72.5 0-121 48.5t-48.5 121q0 72.5 48.5 121.5t121 49ZM94 982q-24 0-42-18t-18-42V409q0-23 18-41.5T94 349h147l55-66q8-11 20-16t26-5h222q12.75 0 21.375 8.625T594 292v117H94v513h680V529h30q6 0 11.481 2.294t9.5 6.5Q829 542 831.5 547.543 834 553.087 834 559v363q0 24-18.5 42T774 982H94Zm680-633h-56q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T718 289h56v-57q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T834 232v57h57q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T891 349h-57v56q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625-12.825 0-21.325-8.625T774 405v-56ZM94 409v513-513Z" />
                </svg>
              </div>
              <div className={styles.inputGroup}>
                {media ? (
                  <div className={styles.preview}>
                    <Image
                      src={URL.createObjectURL(media)}
                      width={100}
                      height={100}
                      alt="preview of a image"
                    />
                  </div>
                ) : (
                  <textarea
                    placeholder="Send message..."
                    onChange={(e) => setMessage(e.target.value)}
                  />
                )}
              </div>
              <div onClick={(e) => handleSubmit(e)}>{sendIcon}</div>
            </form>
          </div>
        </div>
      </PageWrapper>
    </PrivateRoute>
  )
}
