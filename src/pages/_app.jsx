import Layout from "@/components/layout/Layout"
import { wrapper } from "@/store/store"
import "@/styles/globals.css"
import { Provider } from "react-redux"

function App({ Component, router, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest)
  return (
    <Provider store={store}>
      <Layout>
        <Component {...props.pageProps} key={router.route} />
      </Layout>
    </Provider>
  )
}

export default App
