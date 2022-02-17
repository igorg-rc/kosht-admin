import { useState, useEffect } from "react"
import { useHistory, useRouteMatch } from "react-router"
import { edit_banner } from "../../api/api"
import { BannerForm } from "./BannerForm"
import { PageTitle } from "../UI/PageTitle"
import { get_banner_by_id, get_visible_banners } from "../../api/api"


export const BannerEdit = () => {
  const history = useHistory()
  const match = useRouteMatch()
  const [visibleBanners, setVisibleBanners] = useState([])
  const [loading, setLoading] = useState(false)
  const [banner, setBanner] = useState({})
  const [titleInput, setTitleInput] = useState("")
  const [ownerInput, setOwnerInput] = useState("")
  const [linkInput, setLinkInput] = useState("")
  const [fileInput, setFileInput] = useState()
  const [visibleInput, setVisibleInput] = useState(false)
  const [title, setTitle] = useState("")
  
  useEffect(() => {
    const setContent = async () => {
      const fetchedBanner = await get_banner_by_id(match.params.id)
      const fetchVisitedBanners = await get_visible_banners() 
      setVisibleBanners(fetchVisitedBanners)
      setBanner(fetchedBanner.data)
      setTitleInput(fetchedBanner.data.title)
      setLinkInput(fetchedBanner.data.link)
      setOwnerInput(fetchedBanner.data.owner)
      setVisibleInput(fetchedBanner.data.visible)
    }
    setContent()
  }, [match.params.id])

  const visibleChangeHandler = () => {
    if (visibleBanners.length > 0 && !banner.visible) {
      alert("One of your banners is already active! Turn off its visibility and try again.")
      return;
    }
    setVisibleInput(!visibleInput)
  }

  const formSubmitHandler = async () => {
    const bannerData = new FormData()
    bannerData.append("title", titleInput)
    bannerData.append("owner", ownerInput)
    bannerData.append("link", linkInput)
    bannerData.append("banner-img", fileInput)
    bannerData.append("visible", visibleInput)
    setLoading(true)
    await edit_banner(bannerData, match.params.id)
    setLoading(false)
    history.push('/banners')
  }

  console.log(visibleBanners)

  return loading ? <div>Loading...</div> : <> 
    <PageTitle text={`Edit banner`} />
    <BannerForm   
      title={titleInput}
      owner={ownerInput} 
      link={linkInput}
      onTitleInputChange={e => setTitleInput(e.target.value)}
      onOwnerInputChange={e => setOwnerInput(e.target.value)}
      onLinkInputChange={e => setLinkInput(e.target.value)}
      onFileInputChange={e => setFileInput(e.target.files[0])}
      onCheckChange={visibleChangeHandler}
      checked={visibleInput}
      onFormSubmit={formSubmitHandler}
    />
  </>
}