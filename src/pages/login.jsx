import { login } from "@/actions/accounts"
import PageWrapper from "@/components/layout/PageWrapper"
import styles from "@/styles/Form.module.css"
import Link from "next/link"
import { useRouter } from "next/router"
import { continueIcon, hidePassword, showPassword } from "public/svgs"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"

export default function Login({ prevRoute }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const [isShow, setShow] = useState(false)
  const { isAuthenticated, error } = useSelector((state) => state.accounts)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (isAuthenticated) router.push("/")
  }, [isAuthenticated, router])

  return (
    <PageWrapper title={"Network | Login"}>
      <div className="contained">
        <div className={styles.header}>Welcome back</div>
        <form
          className={styles.form}
          onSubmit={handleSubmit((data) => {
            const { username, password } = data
            dispatch(login({ username, password }))
          })}
        >
          <div className={styles.inputGroup}>
            <div>
              <input
                {...register("username", { required: true })}
                placeholder="Username"
              />
            </div>
            {errors?.username && (
              <span className={styles.alert}>Username is required</span>
            )}
          </div>
          <div className={styles.inputGroup}>
            <div>
              <input
                type={isShow ? "text" : "password"}
                {...register("password", { required: true })}
                placeholder="Password"
              />
              {isShow ? (
                <span
                  className={styles.passwordVis}
                  onClick={() => setShow(!isShow)}
                >
                  {hidePassword}
                </span>
              ) : (
                <span
                  className={styles.passwordVis}
                  onClick={() => setShow(!isShow)}
                >
                  {showPassword}
                </span>
              )}
            </div>
            {errors?.password && (
              <span className={styles.alert}>Password is required</span>
            )}
            {error && <span className={styles.alert}>{error}</span>}
          </div>

          <div
            className={styles.btnGroup}
            onClick={handleSubmit((data) => {
              const { username, password } = data
              dispatch(login({ username, password }))
            })}
          >
            <input type={"submit"} value="Login" className="btn light" />
            {continueIcon}
          </div>
          <div className={styles.formLinks}>
            {"Don't have an account?"}
            <Link href="/register">Create an account.</Link>
          </div>
        </form>
      </div>
    </PageWrapper>
  )
}
