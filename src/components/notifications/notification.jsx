import { updateSeen } from "@/actions/notifications"
import styles from "@/styles/Notifications.module.css"
import Image from "next/image"
import Link from "next/link"
import { useDispatch } from "react-redux"

export default function Notification({ link, text, from, id }) {
  const dispatch = useDispatch()

  return (
    <Link href={link} onClick={() => dispatch(updateSeen(id))}>
      <div className={styles.profileWrapper}>
        <Link href={`profile/${from.id}`}>
          <Image
            src={from.profile.get_avatar.replace(/\s+/, "")}
            width={100}
            height={100}
            alt={from.username}
          />
          {from.username}
        </Link>
      </div>
      {text}
    </Link>
  )
}
