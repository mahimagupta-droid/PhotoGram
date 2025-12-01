import { RouterProvider } from "react-router-dom"
import Router from "./Routes"

type Props = {}

const App = (props: Props) => {
  return (
    <div className="app">
      <RouterProvider router={Router} />
    </div>
  )
}

export default App