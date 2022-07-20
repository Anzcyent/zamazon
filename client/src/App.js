import React from 'react'
import { useSelector } from "react-redux"
import { Routes, Route } from "react-router-dom"

import { Home, Register } from "./containers/index"
import { Loading, Toast } from "./components/index";

const App = () => {
  const { error, success, pageLoading } = useSelector(state => state.alert);

  return (
    <>
      {pageLoading && <Loading />}
      {(error || success) && <Toast msg={error || success} error={error} success={success} />}
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </>

  )
}

export default App