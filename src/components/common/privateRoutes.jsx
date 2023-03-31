import { useRouter } from "next/router"
import { useEffect } from "react"
import { useSelector } from "react-redux"

export function PrivateRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.accounts)
  const router = useRouter()
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated])

  return isAuthenticated && children
}
