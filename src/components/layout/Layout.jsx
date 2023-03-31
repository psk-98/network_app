import { loadUser } from "@/actions/accounts"
import { Source_Sans_Pro } from "@next/font/google"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const sourceSansPro = Source_Sans_Pro({
  weight: ["200", "300", "400", "600", "700", "900"],
  subsets: ["latin"],
})

export default function Layout({ children }) {
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem("token")) dispatch(loadUser())
  }, [router.pathname])

  return (
    <>
      <div className={sourceSansPro.className}>{children}</div>
    </>
  )
}
