import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { refresh_token } from '../../redux/actions/auth';
import { Navbar, Sidebar, Products, Categories, CompleteProfile } from "../../components/index";
import { ProductPage, CartPage, CreateProduct, Profile, EditProfile, Orders } from "../index"
import { Routes, Route } from "react-router-dom";

const MainRender = ({ active, setActive }) => (
  <main>
    <Sidebar active={active} setActive={setActive} />
    {active === "products" ? <Products /> : <Categories />}
  </main>
)

const Home = () => {
  const [active, setActive] = useState("products");
  const { user } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const auth = localStorage.getItem('auth');
  const sidebar = sessionStorage.getItem("sidebar");

  useEffect(() => {
    if (sidebar) setActive(sidebar);
    auth && dispatch(refresh_token());
  }, [auth, dispatch, sidebar]);
  return (
    <>
      {user && !user?.is_completed_profile && <CompleteProfile />}
      <Navbar active={active} setActive={setActive} />
      <Routes>
        <Route path="*" element={<MainRender active={active} setActive={setActive} />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/create_product" element={<CreateProduct />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/edit_profile/:id" element={<EditProfile user={user} />} />
        {user && <Route path="/orders" element={<Orders />} />}
      </Routes>

    </>
  )
}

export default Home