import { followUser, getProfile, unfollowUser } from "@/actions/accounts"
import { getUserPosts } from "@/actions/posts"
import PageWrapper from "@/components/layout/PageWrapper"
import Posts from "@/components/posts/posts"
import Edit from "@/components/profile/edit"
import Follows from "@/components/profile/follows"
import styles from "@/styles/Profile.module.css"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function Profile() {
  const [isLikes, setLikes] = useState(false)
  const [isFollows, setFollows] = useState(false)
  const [isEdit, setEdit] = useState(false)

  const state = useSelector((state) => state)

  const { profile, user, isAuthenticated } = state.accounts
  const { userPosts } = state.posts

  const router = useRouter()
  const dispatch = useDispatch()

  const { slug } = router.query

  useEffect(() => {
    if (slug) dispatch(getUserPosts({ user_id: slug, isLikes }))
  }, [isLikes, dispatch, slug])

  useEffect(() => {
    if (slug) dispatch(getProfile(slug))
  }, [slug, dispatch])

  return (
    profile && (
      <PageWrapper title={`Network | ${profile?.username}`}>
        {isEdit && <Edit user={user} setEdit={setEdit} />}
        {isFollows && <Follows setFollows={setFollows} />}
        <div className={styles.profileWrapper}>
          <div className="contained">
            <div className={styles.profileHeader}>
              <div className={styles.profileOwner}>
                <div className={styles.profileAvatar}>
                  <Image
                    src={profile?.profile.get_avatar.replace(/\s+/, "")}
                    width={100}
                    height={100}
                    alt="profile picture"
                  />
                </div>
                {profile?.username}
              </div>
              {user?.id === profile?.id ? (
                <div className={styles.edit} onClick={() => setEdit(true)}>
                  Edit profile
                </div>
              ) : user?.following?.some((user_obj) => {
                  return user_obj?.following?.id == profile.id
                }) ? (
                <div
                  className={styles.followBtn}
                  onClick={() => {
                    dispatch(unfollowUser(profile?.id))
                  }}
                >
                  Unfollow
                </div>
              ) : (
                <div
                  className={styles.followBtn}
                  onClick={() => {
                    isAuthenticated
                      ? dispatch(followUser(profile?.id))
                      : router.push("/login")
                  }}
                >
                  Follow
                </div>
              )}
            </div>
            <div className={styles.profileContent}>
              <div className={styles.bio}>{profile?.profile.bio}</div>
              <div className={styles.details}>
                <div className={styles.detail} onClick={() => setFollows(true)}>
                  <span className="bold">{profile.followers?.length}</span>
                  <span className={styles.detText}>Followers</span>
                </div>
                <div className={styles.detail} onClick={() => setFollows(true)}>
                  <span className="bold">{profile.following?.length}</span>
                  <span className={styles.detText}>Following</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.profileFooter}>
            <div
              onClick={() => setLikes(false)}
              className={`${!isLikes ? styles.active : ""}`}
            >
              Posts
            </div>
            <div
              onClick={() => setLikes(true)}
              className={`${!isLikes ? "" : styles.active}`}
            >
              Likes
            </div>
          </div>
        </div>

        {userPosts?.length > 0 ? (
          <Posts posts={userPosts} notComments={true} />
        ) : (
          <div className={styles.empty}>
            {isLikes
              ? `${profile.username} has not liked any posts`
              : `${profile.username} has no posts`}
          </div>
        )}
      </PageWrapper>
    )
  )
}
