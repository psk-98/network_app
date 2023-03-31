export const whichUser = (user, thread) => {
  if (user?.id === thread?.receiver?.id) return thread?.user
  else return thread?.receiver
}
