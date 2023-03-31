import styles from "@/styles/Nav.module.css"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { addIcon, prevIcon } from "../../../public/svgs"

export default function Top({ setCreate }) {
  const dispatch = useDispatch()
  const router = useRouter()

  return router.pathname.includes("post") ? (
    <div className={styles.nav}>
      <div onClick={() => router.back()}>{prevIcon}</div>
      <div>Post</div>
      <div></div>
    </div>
  ) : router.pathname.includes("profile") ? (
    backNav(router)
  ) : router.pathname.includes("notifications") ? (
    <div className={styles.nav}>
      <div className={styles.notifications}> Notifications</div>
    </div>
  ) : router.pathname.includes("thread") ? (
    backNav(router)
  ) : router.pathname.includes("search") ||
    router.pathname.includes("login") ||
    router.pathname.includes("register") ? (
    <div className={styles.nav}></div>
  ) : (
    <div className={styles.nav}>
      <div className={styles.logo}> Network</div>
      <div onClick={() => setCreate(true)}>{addIcon}</div>
    </div>
  )
}

const backNav = (router) => {
  return (
    <div className={styles.nav}>
      <div onClick={() => router.back()}>{prevIcon}</div>
    </div>
  )
}
