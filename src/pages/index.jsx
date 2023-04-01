import { getAllPosts } from "@/actions/posts"
import CreateModal from "@/components/common/create"
import { PrivateRoute } from "@/components/common/privateRoutes"
import PageWrapper from "@/components/layout/PageWrapper"
import Nav from "@/components/nav/Nav"
import Posts from "@/components/posts/posts"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function Home() {
  const [isCreate, setCreate] = useState(false)

  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const { posts } = state.posts

  useEffect(() => {
    if (state.accounts?.isAuthenticated) dispatch(getAllPosts())
  }, [])

  return (
    <PrivateRoute>
      <PageWrapper title={"Network | Feed"}>
        {isCreate && <CreateModal setCreate={setCreate} isComment={false} />}
        <Nav setCreate={setCreate} />
        <Posts posts={posts} notComments={true} />
      </PageWrapper>
    </PrivateRoute>
  )
}
