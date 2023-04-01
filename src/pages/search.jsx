import { searchNetwork } from "@/actions/search"
import { PrivateRoute } from "@/components/common/privateRoutes"
import UserList from "@/components/common/userList"
import PageWrapper from "@/components/layout/PageWrapper"
import Posts from "@/components/posts/posts"
import { clearResults } from "@/reducers/search"
import styles from "@/styles/Search.module.css"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function Search() {
  const [isPost, setPost] = useState(true)
  const [search, setSearch] = useState()
  const dispatch = useDispatch()
  const state = useSelector((state) => state)

  useEffect(() => {
    dispatch(clearResults())
  }, [])

  useEffect(() => {
    if (search?.length > 1 && search)
      dispatch(searchNetwork({ isPost: isPost ? 1 : 0, search }))
  }, [isPost, search])

  return (
    <PrivateRoute>
      <PageWrapper title={"Network | Explore"}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className={styles.navBtns}>
              <div
                className={`${styles.navBtn} ${isPost ? styles.active : ""}`}
                onClick={() => setPost(true)}
              >
                Posts
              </div>
              <div
                className={`${styles.navBtn} ${isPost ? "" : styles.active}`}
                onClick={() => setPost(false)}
              >
                Accounts
              </div>
            </div>
          </div>
          <div className={styles.content}>
            {isPost
              ? state.search?.results?.length > 0 && (
                  <Posts posts={state?.search?.results} notComments={true} />
                )
              : state.search?.results?.length > 0 && (
                  <UserList profiles={state.search?.results} />
                )}
            {state.search?.results?.length === 0 && isPost && (
              <div className={styles.empty}>No results</div>
            )}
            {state.search?.results?.length === 0 && !isPost && (
              <div className={styles.empty}>{"User doesn't exist"}</div>
            )}
          </div>
        </div>
      </PageWrapper>
    </PrivateRoute>
  )
}
