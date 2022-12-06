import { Navigate, Route, Routes } from "react-router-dom"
import Panel from "./pages/Panel/Panel"
import Login from "./pages/Login/Login"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/panel/*" element={<Panel />}/>
        <Route path="*" element={<Navigate to={"/login"} />} />
      </Routes>
    </>
  )
}

export default App