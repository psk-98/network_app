import { NextSeo } from "next-seo"
import Nav from "../nav/Nav"

export default function PageWrapper({ children, title }) {
  return (
    <>
      <NextSeo title={title} />
      <div className="containerWrapper">
        <Nav />
        <div className="container"> {children}</div>
      </div>
    </>
  )
}
