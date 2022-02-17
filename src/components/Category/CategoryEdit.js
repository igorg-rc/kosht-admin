import { useEffect, useState } from "react"
import { edit_category, get_category_by_id } from "../../api/api"
import { useHistory, useRouteMatch } from 'react-router-dom'
import { PageTitle } from "../UI/UiUnits"
import { CategoryForm } from "./CategoryForm"

export const CategoryEdit = () => {
  const [item, setItem] = useState({})
  const [titleUa, setTitleUa] = useState("")
  const [titleEn, setTitleEn] = useState("")
  const [imageMain, setImageMain] = useState(null)
  const [imageHover, setImageHover] = useState(null)
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const match = useRouteMatch()

  useEffect(() => {
    const getItem = async () => {
      const fetchedItem = await get_category_by_id(match.params.id)
      setItem(fetchedItem)
      setTitleUa(fetchedItem.title_ua)
      setTitleEn(fetchedItem.title_en)
    }
    getItem()
  }, [match.params.id])

  const onCategoryEdit = async e => {
    e.preventDefault()
    const formdata = new FormData()
    formdata.append('title_ua', titleUa)
    formdata.append('title_en', titleEn)
    formdata.append('img_main', imageMain)
    formdata.append('img_hover', imageHover)
    await edit_category(formdata, match.params.id)
    history.push('/categories')
  }

  console.log(item)

  return loading ? <div>Loading...</div> : <>
    <PageTitle label="Edit category" />
    <CategoryForm 
      onFormSubmit={onCategoryEdit} 
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