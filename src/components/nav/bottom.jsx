import styles from "@/styles/Nav.module.css"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import {
  homeIcon,
  notificationActiveIcon,
  notificationIcon,
  searchIcon,
} from "public/svgs"
import { useSelector } from "react-redux"

export default function Bottom() {
  const { user, isAuthenticated } = useSelector((state) => state.accounts)
  const router = useRouter()

  return router.pathname.includes("thread") ||
    router.pathname.includes("login") ||
    router.pathname.includes("register") ? (
    <div className={styles.bottomWrapper}></div>
  ) : (
    <div className={styles.bottomWrapper}>
      <div className={styles.bottom}>
        <div className={styles.bottomLink}>
          <Link href="/">{homeIcon}</Link>
        </div>
        <div className={styles.bottomLink}>
          <Link href="/search">{searchIcon}</Link>
        </div>
        {/* <div className={styles.bottomLink}>
          <Link href="/messages">
            {user?.messages > 0 ? messagesActiveIcon : messagesIcon}
          </Link>
        </div> */}
        <div className={styles.bottomLink}>
          <Link href="/notifications">
            {user?.notifications > 0
              ? notificationActiveIcon
              : notificationIcon}
          </Link>
        </div>
        <div className={styles.bottomLink}>
          <Link
            href={`/profile/${user?.id}`}
            onClick={(e) => !isAuthenticated && e.preventDefault()}
          >
            {user?.profile?.get_avatar ? (
              <div className={styles.avatar}>
                {isAuthenticated && (
                  <Image
                    alt="profile picture"
                    src={user?.profile?.get_avatar.replace(/\s+/, "")}
                    width={100}
                    height={100}
                  />
                )}
              </div>
            ) : (
              <svg
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.47754 4.75C5.47754 2.95507 6.93261 1.5 8.72754 1.5C10.5225 1.5 11.9775 2.95507 11.9775 4.75C11.9775 6.54493 10.5225 8 8.72754 8C6.93261 8 5.47754 6.54493 5.47754 4.75ZM8.72754 0C6.10419 0 3.97754 2.12665 3.97754 4.75C3.97754 7.37335 6.10419 9.5 8.72754 9.5C11.3509 9.5 13.4775 7.37335 13.4775 4.75C13.4775 2.12665 11.3509 0 8.72754 0ZM8.72761 12C6.84773 12 5.00474 12.4643 3.48343 13.3398C1.96255 14.2151 0.820625 15.4705 0.293925 16.9448C0.154568 17.3348 0.357808 17.764 0.747875 17.9034C1.13794 18.0427 1.56713 17.8395 1.70648 17.4494C2.09138 16.3721 2.95819 15.3728 4.23162 14.6399C5.50461 13.9073 7.08534 13.5 8.72761 13.5C10.3699 13.5 11.9506 13.9073 13.2236 14.6399C14.497 15.3728 15.3638 16.3721 15.7487 17.4494C15.8881 17.8395 16.3173 18.0427 16.7073 17.9034C17.0974 17.764 17.3007 17.3348 17.1613 16.9448C16.6346 15.4705 15.4927 14.2151 13.9718 13.3398C12.4505 12.4643 10.6075 12 8.72761 12Z"
                />
              </svg>
            )}
          </Link>
        </div>
      </div>
    </div>
  )
}
