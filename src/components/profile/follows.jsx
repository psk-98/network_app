import { followUser, getFollowers, unfollowUser } from "@/actions/accounts"
import styles from "@/styles/Profile.module.css"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function Follows({ setFollows }) {
  const [isFollowersNav, setFollowersNav] = useState(false)

  const dispatch = useDispatch()
  const { user, isAuthenticated, followers, profile } = useSelector(
    (state) => state.accounts
  )

  useEffect(() => {
    dispatch(
      getFollowers({
        user_id: profile?.id,
        isFollowers: isFollowersNav ? 1 : 0,
      })
    )
  }, [isFollowersNav])

  return (
    <div className={styles.wrapper}>
      <div className={styles.followsHeader}>
        <div onClick={() => setFollows(false)}>Cancel</div>
        <div className={styles.navBtns}>
          <div
            className={`${styles.navBtn} ${
              isFollowersNav ? "" : styles.active
            } `}
            onClick={() => setFollowersNav(false)}
          >
            Following
          </div>
          <div
            className={`${styles.navBtn} ${
              isFollowersNav ? styles.active : ""
            } `}
            onClick={() => setFollowersNav(true)}
          >
            Followers
          </div>
        </div>
      </div>
      <div className={styles.usersWrappers}>
        {followers?.map((f, i) => {
          return (
            <Link
              href={`/profile/${f?.user?.id}`}
              className={styles.userWrapper}
              key={i}
            >
              <div className={styles.profile}>
                <div className={styles.profileAvatar}>
                  <Image
                    src={
                      isFollowersNav
                        ? f?.user?.profile.get_avatar.replace(/\s+/, "")
                        : f?.following?.profile.get_avatar.replace(/\s+/, "")
                    }
                    width={100}
                    height={100}
                    alt="profile picture"
                  />
                </div>
                <div>
                  {isFollowersNav ? f?.user?.username : f.following.username}
                </div>
              </div>
              {user?.following.some((user_obj) => {
                return isFollowersNav
                  ? user_obj.following.id === f.user.id
                  : user_obj.following.id === f.following.id
              }) ? (
                <div
                  className={styles.followBtn}
                  onClick={() => {
                    dispatch(
                      unfollowUser(isFollowersNav ? f.user.id : f.following.id)
                    )
                  }}
                >
                  Unfollow
                </div>
              ) : (
                <div
                  className={styles.followBtn}
                  onClick={() => {
                    isAuthenticated
                      ? dispatch(
                          followUser(
                            isFollowersNav ? f.user.id : f.following.id
                          )
                        )
                      : router.push("/login")
                  }}
                >
                  Follow
                </div>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
