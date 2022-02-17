import { useState } from "react"
import { create_category } from "../../api/api"
import { useHistory } from 'react-router-dom'
import { SimpleForm } from "../UI/SimpleForm"
import { PageTitle } from "../UI/UiUnits"
import { CategoryForm } from "./CategoryForm"

export const CategoryCreate = () => {
  const [titleUa, setTitleUa] = useState("")
  const [titleEn, setTitleEn] = useState("")
  const [imageMain, setImageMain] = useState(null)
  const [imageHover, setImageHover] = useState(null)
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const onCategoryCreate = async e => {
    e.preventDefault()
    const formdata = new FormData()
    formdata.append('title_ua', titleUa)
    formdata.append('title_en', titleEn)
    formdata.append('img_main', imageMain)
    formdata.append('img_hover', imageHover)
    await create_category(formdata)
    history.push('/categories')
  }


  return loading ? <div>Loading...</div> : <>
    <PageTitle label="Create new category" />
    <CategoryForm 
      onFormSubmit={onCategoryCreate} 
      onTitleUaInputChange={e => setTitleUa(e.target.value)}
      onTitleEnInputChange={e => setTitleEn(e.target.value)}
      onImageMainChange={e => setImageMain(e.target.files[0])}
      onImageHoverChange={e => setImageHover(e.target.files[0])}
      titleUa={titleUa} 
      titleEn={titleEn}
      imageMain={imageMain} 
      imageHover={imageHover}
    />
  </>
}