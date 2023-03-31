import Bottom from "./bottom"
import Top from "./top"

export default function Nav({ setCreate }) {
  return (
    <>
      <Top setCreate={setCreate} />
      <Bottom />
      {/* <Sidebar setToggle={setToggle} toggle={toggle} /> */}
    </>
  )
}
