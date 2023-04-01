import { isUsed, login } from "@/actions/accounts"
import PageWrapper from "@/components/layout/PageWrapper"
import { clearIsUsed } from "@/reducers/accounts"
import styles from "@/styles/Form.module.css"
import Link from "next/link"
import { useRouter } from "next/router"
import { continueIcon, hidePassword, showPassword } from "public/svgs"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"

export default function Register() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [isShow, setShow] = useState(false)
  const { isAuthenticated, isUsedData } = useSelector((state) => state.accounts)
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm()

  const handleSuggestion = (r) => {
    setValue("username", r)
    clearErrors("username")
  }

  useEffect(() => {
    if (isUsedData?.recommendations) {
      if (isUsedData?.recommendations.length > 0)
        setError("username", { type: "taken" })
      else clearErrors("username")
    }
  }, [isUsedData?.recommendations, dispatch])

  useEffect(() => {
    clearErrors()
    dispatch(clearIsUsed())
  }, [])

  useEffect(() => {
    if (isUsedData?.isEmailTaken == 1) setError("email", { type: "taken" })
    else if (isUsedData?.isEmailTaken == 0) clearErrors("email")
  }, [isUsedData?.isEmailTaken])

  useEffect(() => {
    if (isAuthenticated) router.push("/")
  }, [isAuthenticated, router])

  return (
    <PageWrapper title={"Network | Create account"}>
      <div className="contained">
        {console.log(errors.username)}
        <div className={styles.header}>Welcome</div>
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
                placeholder="Username*"
                onBlur={(e) =>
                  e.target.value &&
                  e.target.value?.length > 2 &&
                  dispatch(isUsed({ username: e.target.value }))
                }
              />
            </div>
            {errors?.username?.type === "required" && (
              <span className={styles.alert}>Username is required</span>
            )}
            {errors?.username?.type === "taken" && (
              <span className={styles.alert}>
                Username already taken, here are some suggestions
              </span>
            )}
            {errors?.username?.type === "taken" && (
              <span className={styles.alert}>
                {isUsedData?.recommendations?.map((r, i) => {
                  return (
                    <>
                      <span onClick={() => handleSuggestion(r)} key={i}>
                        {r}
                        {i < 2 && ", "}
                      </span>
                    </>
                  )
                })}
              </span>
            )}
          </div>
          <div className={styles.inputGroup}>
            <div>
              <input
                {...register("email", {
                  pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                })}
                placeholder="Email address"
                onBlur={(e) =>
                  e.target.value &&
                  e.target.value.match(
                    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                  ) &&
                  dispatch(isUsed({ email: e.target.value }))
                }
              />
            </div>
            {errors?.email?.type === "pattern" && (
              <span className={styles.alert}>Enter a valid email address</span>
            )}
            {errors?.email?.type === "taken" && (
              <span className={styles.alert}>
                Email already in use, use another one or{" "}
                <Link href="/login">{" login"}</Link>
              </span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <div>
              <input
                type={isShow ? "text" : "password"}
                {...register("password", { required: true })}
                placeholder="Password*"
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
          </div>
          <div className={styles.inputGroup}>
            <div>
              <input
                type={isShow ? "text" : "password"}
                {...register("password2", {
                  required: true,
                  validate: (value) => value === watch("password", " "),
                })}
                onChange={(e) =>
                  e.target.value !== watch("password", "")
                    ? setError("password2", { type: "validate" })
                    : clearErrors("password2")
                }
                placeholder="Confirm password*"
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
            {errors?.password2?.type === "validate" && (
              <span className={styles.alert}>{`Passwords don't match`}</span>
            )}
            {errors?.password2?.type === "required" && (
              <span className={styles.alert}>
                Confirmation password is required
              </span>
            )}
          </div>

          <div
            className={styles.btnGroup}
            onClick={handleSubmit((data) => {
              const { username, password } = data
              dispatch(login({ username, password }))
            })}
          >
            <input
              type={"submit"}
              value="Create Account"
              className="btn light"
            />
            {continueIcon}
          </div>
          <div className={styles.formLinks}>
            {"Already have an account? "} <Link href="/login">Login</Link>
          </div>
        </form>
      </div>
    </PageWrapper>
  )
}
