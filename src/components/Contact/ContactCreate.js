import { useState } from "react"
import { create_contact } from "../../api/api"
import { SimpleForm } from "../UI/SimpleForm"
import { PageTitle } from "../UI/PageTitle"
import { useHistory } from "react-router-dom"

export const ContactCreate = () => {
  const history = useHistory()
  const [titleUa, setTitleUa] = useState("")
  const [titleEn, setTitleEn] = useState("")
  const [link, setLink] = useState("")
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const onContactCreate = async e => {
    e.preventDefault()
    const formdata = new FormData()
    formdata.append('title_ua', titleUa)
    formdata.append('title_en', titleEn)
    formdata.append('link', link)
    formdata.append('image', file)
    await create_contact(formdata)
    history.push('/contacts')
  }

  return loading ? <div>Loading...</div> : <>
    <PageTitle text="Create new contact" />
    <SimpleForm 
      onTitleOneInputChange={e => setTitleUa(e.target.value)} 
      onTitleTwoInputChange={e => setTitleEn(e.target.value)} 
      onLinkInputChange={e => setLink(e.target.value)} 
      onFormSubmit={onContactCreate} 
      onFileInputChange={e => setFile(e.target.files[0])}
    />
  </>
}