import { updateProfile } from "@/actions/accounts"
import styles from "@/styles/Profile.module.css"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { prevIcon } from "../../../public/svgs"

export default function Edit({ user, setEdit }) {
  const [username, setUsername] = useState()
  const [bio, setBio] = useState()
  const [image, setImage] = useState()

  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      setUsername(user?.username)
      setBio(user?.profile?.bio)
    }
  }, [])

  const handleSubmit = () => {
    const formData = new FormData()
    if (image) formData.append("avatar", image)
    if (username && username?.length > 0) formData.append("username", username)
    if (bio && bio?.length > 0) formData.append("bio", bio)

    dispatch(updateProfile(formData))
  }

  return (
    <div className={styles.editWrapper}>
      <div className="contained">
        <div className={styles.editHeader}>
          <div onClick={() => setEdit(false)}>{prevIcon}</div>
          <div className={styles.edit} onClick={handleSubmit}>
            Save changes
          </div>
        </div>

        <div className={styles.editContent}>
          <div className={styles.editGroup}>
            <div className={styles.profileAvatar}>
              <Image
                src={
                  image
                    ? URL.createObjectURL(image)
                    : user?.profile?.get_avatar.replace(/\s+/, "")
                }
                width={100}
                height={100}
                alt="profile picture"
              />
              <div className={styles.fileInput}>
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  accept="image/png, image/jpeg, image/webp"
                />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
                  <path d="M433.5 836q72.5 0 121.5-49t49-121.5q0-72.5-49-121T433.5 496q-72.5 0-121 48.5t-48.5 121q0 72.5 48.5 121.5t121 49ZM94 982q-24 0-42-18t-18-42V409q0-23 18-41.5T94 349h147l55-66q8-11 20-16t26-5h222q12.75 0 21.375 8.625T594 292v117H94v513h680V529h30q6 0 11.481 2.294t9.5 6.5Q829 542 831.5 547.543 834 553.087 834 559v363q0 24-18.5 42T774 982H94Zm680-633h-56q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T718 289h56v-57q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T834 232v57h57q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T891 349h-57v56q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625-12.825 0-21.325-8.625T774 405v-56ZM94 409v513-513Z" />
                </svg>
              </div>
            </div>
          </div>
          <div className={styles.editGroup}>
            <input
              type="text"
              placeholder={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={styles.editGroup}>
            <textarea
              placeholder={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
