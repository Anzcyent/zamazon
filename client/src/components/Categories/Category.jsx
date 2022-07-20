import React from 'react'
import { useDispatch } from "react-redux"
import { get_products_by_category_name } from "../../redux/actions/product"
import { active_style, not_active_style } from "./styles"

const Category = ({ active, category, setActive }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    setActive(category.name);

    dispatch(get_products_by_category_name(category.name));

    sessionStorage.setItem("active_category", category.name);
  }

  return (
    <div onClick={handleClick} className={active === category.name ? active_style : not_active_style}>{category.name}</div>
  )
}

export default Category