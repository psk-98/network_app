import { followUser, unfollowUser } from "@/actions/accounts"
import styles from "@/styles/Profile.module.css"
import Image from "next/image"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"

export default function UserList({ profiles }) {
  const dispatch = useDispatch()

  const { user, isAuthenticated } = useSelector((state) => state.accounts)

  return (
    <div className={styles.usersWrapper}>
      {profiles.map((profile) => {
        return (
          <Link
            href={`/profile/${profile?.id}`}
            className={styles.userWrapper}
            key={profile.id}
          >
            <div className={styles.profile}>
              <div className={styles.profileAvatar}>
                <Image
                  src={profile?.profile?.get_avatar.replace(/\s+/, "")}
                  width={100}
                  height={100}
                  alt="profile picture"
                />
              </div>
              <div>{profile?.username}</div>
            </div>
            {user?.following.some((user_obj) => {
              return user_obj.following.id === profile.id
            }) ? (
              <div
                className={styles.followBtn}
                onClick={() => {
                  dispatch(unfollowUser(profile.id))
                }}
              >
                Unfollow
              </div>
            ) : (
              <div
                className={styles.followBtn}
                onClick={() => {
                  isAuthenticated
                    ? dispatch(followUser(profile.id))
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
  )
}
