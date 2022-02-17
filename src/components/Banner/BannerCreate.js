import { BannerForm } from "./BannerForm"
import { useEffect, useState } from "react"
import { create_banner, get_visible_banners } from "../../api/api"
import { useHistory } from "react-router"
import { PageTitle } from "../UI/PageTitle"


export const BannerCreate = () => {
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [visibleBanners, setVisibleBanners] = useState([])
  const [titleInput, setTitleInput] = useState("")
  const [ownerInput, setOwnerInput] = useState("")
  const [linkInput, setLinkInput] = useState("")
  const [fileInput, setFileInput] = useState()
  const [visibleInput, setVisibleInput] = useState(false)

  useEffect(() => {
    const fetchVisibleBanners = async () => {
      const fetchVisitedBanners = await get_visible_banners()
      setVisibleBanners(fetchVisitedBanners)
    }
    fetchVisibleBanners()
  }, [])

  const visibleChangeHandler = () => {
    if (visibleBanners.length > 0) {
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
    await create_banner(bannerData)
    setLoading(false)
    history.push('/banners')
  }


  return loading ? <div>Loading...</div> : <> 
    <PageTitle text="Create new banner" />
    <BannerForm     
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