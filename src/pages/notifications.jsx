import { getNotifications } from "@/actions/notifications"
import { PrivateRoute } from "@/components/common/privateRoutes"
import Loader from "@/components/layout/loader"
import PageWrapper from "@/components/layout/PageWrapper"
import Notification from "@/components/notifications/notification"
import { timePast } from "@/components/posts/helpers"
import styles from "@/styles/Notifications.module.css"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function Notifications() {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const { notifications, loading } = state.notifications

  const router = useRouter()

  useEffect(() => {
    if (state.accounts.isAuthenticated) dispatch(getNotifications())
  }, [state.accounts.isAuthenticated])

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
        <div className={styles.notificationsWrapper}>
          {notifications?.map((n) => {
            return (
              <div
                key={n.id}
                className={
                  n.user_has_seen ? styles.notification : styles.notificationA
                }
              >
                {n.notification_type === "LIKE" && n.post !== null ? (
                  <Notification
                    link={`post/${n.post}`}
                    text={" liked your post"}
                    from={n?.from_user}
                    id={n?.id}
                  />
                ) : n.notification_type === "LIKE" && n.comment !== null ? (
                  <Notification
                    link={`post/${n.post}`}
                    text={" liked your comment"}
                    from={n?.from_user}
                    id={n?.id}
                  />
                ) : n.notification_type === "COMMENT" ? (
                  <Notification
                    link={`post/${n.post}`}
                    text={" commented on your post"}
                    from={n?.from_user}
                    id={n?.id}
                  />
                ) : n.notification_type === "DM" ? (
                  <Notification
                    link={`thread/${n.post}`}
                    text={" sent you a message"}
                    from={n?.from_user}
                    id={n?.id}
                  />
                ) : (
                  <Notification
                    link={`profile/${n.from_user.id}`}
                    text={" followed you"}
                    from={n?.from_user}
                    id={n?.id}
                  />
                )}
                <span>{timePast(n.created)}</span>
              </div>
            )
          })}
        </div>
      </PageWrapper>
    </PrivateRoute>
  )
}
