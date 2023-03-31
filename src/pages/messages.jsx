import { getThreads } from "@/actions/accounts"
import { updateSeen } from "@/actions/threads"
import { PrivateRoute } from "@/components/common/privateRoutes"
import Loader from "@/components/layout/loader"
import PageWrapper from "@/components/layout/PageWrapper"
import { whichUser } from "@/components/messages/helpers"
import styles from "@/styles/Messages.module.css"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function Message() {
  const { threads, loading, user } = useSelector((state) => state.accounts)
  const dispatch = useDispatch()

  const router = useRouter()

  useEffect(() => {
    dispatch(getThreads("something"))
  }, [])

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
        {threads?.map((thread) => {
          return (
            <Link
              href={`thread/${thread.id}`}
              key={thread.id}
              onClick={() =>
                user?.id === thread.latest_message.receiver_user &&
                !thread.latest_message.is_read &&
                dispatch(updateSeen(thread.latest_message.id))
              }
            >
              <div
                className={
                  user?.id === thread.latest_message.receiver_user &&
                  !thread.latest_message.is_read
                    ? styles.messageWrapperActive
                    : styles.messageWrapper
                }
              >
                <Link href={`profile/${whichUser(user, thread).id}`}>
                  <Image
                    src={whichUser(user, thread).profile.get_avatar.replace(
                      /\s+/,
                      ""
                    )}
                    width={100}
                    height={100}
                    alt={"profile pic"}
                  />
                </Link>
                <div className={styles.messageContent}>
                  {whichUser(user, thread).username}
                  <div className={styles.message}>
                    {thread.latest_message.body}
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </PageWrapper>
    </PrivateRoute>
  )
}
