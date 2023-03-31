import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
import relativeTime from "dayjs/plugin/relativeTime"
import updateLocale from "dayjs/plugin/updateLocale"

export const isLiked = (id, isComment, user_likes) => {
  return user_likes?.some((like) => {
    return (
      (isComment && like.comment === id) || (!isComment && like.post === id)
    )
  })
}

export const timePast = (time) => {
  dayjs.extend(updateLocale)

  dayjs.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s",
      s: "%ds",
      m: "1m",
      mm: "%dm",
      h: "1h",
      hh: "%dh",
      d: "1d",
      dd: "%dd",
      M: "1m",
      MM: "%dm",
      y: "1y",
      yy: "%dy",
    },
  })

  dayjs.extend(relativeTime)
  return dayjs(time).fromNow()
}

export const created = (time) => {
  dayjs.extend(customParseFormat)

  return (
    <>
      <span>{dayjs(time, "HH:mm")}</span>
      <span>{dayjs(time, "DD-MM-YYYY")}</span>
    </>
  )
}
