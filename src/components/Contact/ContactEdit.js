import { useEffect,  useState} from "react"
import { useHistory, useRouteMatch } from "react-router-dom"
import { get_contact_by_id, edit_contact } from "../../api/api"
import { PageTitle } from "../UI/PageTitle"
import { SimpleForm } from "../UI/SimpleForm"

export const ContactEdit = () => {
  const [loading, setLoading] = useState(false)
  const [titleUa, setTitleUa] = useState("")
  const [titleEn, setTitleEn] = useState("")
  const [link, setLink] = useState("")
  const [file, setFile] = useState(null)
  const match = useRouteMatch()
  const history = useHistory()

  useEffect(() => {
    const fetchContact = async () => {
      setLoading(true)
      const fetchedContact = await get_contact_by_id(match.params.id)
      const contact = fetchedContact.data
      setTitleUa(contact.title_ua)
      setTitleEn(contact.title_en)
      setLink(contact.link)
      setLoading(false)
    } 
    fetchContact()
  }, [match.params.id])

  console.log('title_ua: ', titleUa)
  console.log('title_en: ', titleEn)
  console.log('link: ', link)
  console.log('image : ', file)


  const onContactEdit = async e => {
    e.preventDefault()
    const formdata = new FormData()
    formdata.append('title_ua', titleUa)
    formdata.append('title_en', titleEn)
    formdata.append('link', link)
    formdata.append('image', file)
    await edit_contact(formdata, match.params.id)
    history.push('/contacts')
  }

  return loading ? <div>loading...</div> : <>
    <PageTitle text="Edit contact" />
    <SimpleForm 
      title_ua={titleUa}
      title_en={titleEn} 
      link={link}
      onTitleOneInputChange={e => setTitleUa(e.target.value)} 
      onTitleTwoInputChange={e => setTitleEn(e.target.value)} 
      onLinkInputChange={e => setLink(e.target.value)} 
      onFileInputChange={e => setFile(e.target.files[0])}
      onFormSubmit={onContactEdit} 
    />
  </>
}