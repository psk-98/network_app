import Nav from "../nav/Nav"

export default function PageWrapper({ children }) {
  return (
    <div className="containerWrapper">
      <Nav />
      <div className="container"> {children}</div>
    </div>
  )
}
