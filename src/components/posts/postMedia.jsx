import styles from "@/styles/Posts.module.css"
import Image from "next/image"
import Link from "next/link"
import { prevIcon } from "public/svgs"
import { useState } from "react"

export default function PostMedia({ media, id }) {
  const [currentImage, setCurrentImage] = useState(0)

  const handleNextImage = () => {
    if (currentImage < media.length - 1) setCurrentImage(currentImage + 1)
  }
  const handlePrevImage = () => {
    if (currentImage !== 0) setCurrentImage(currentImage - 1)
  }

  return (
    <>
      <div className={styles.mediaWrapper}>
        <div className={styles.mediaControls}>
          <div className={styles.mediaPrev} onClick={handlePrevImage}>
            {currentImage !== 0 && prevIcon}
          </div>
          <div className={styles.mediaNext} onClick={handleNextImage}>
            {currentImage < media.length - 1 && prevIcon}
          </div>
        </div>
        <Link href={"/post/" + id}>
          <Image
            alt={currentImage}
            src={media[currentImage].get_media.replace(/\s+/, "")}
            width={800}
            height={800}
          />
        </Link>
      </div>
    </>
  )
}
