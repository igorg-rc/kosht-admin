import { useState, useEffect } from 'react'
import { delete_banner, get_banners } from '../../api/api'
import { useHistory } from 'react-router-dom'
import { Container, Table, TableContainer, TableBody, TableRow, TableHead, TableCell, IconButton, Checkbox } from '@material-ui/core'
import { Edit, Delete, Visibility, VisibilityOff } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import { AddButton } from '../UI/AddButton'
import { PageTitle } from '../UI/PageTitle'

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  categoriesHolder: {
    padding: 0,
    margin: 0,
    '&:last-child td': {  // !!! Remove border-bottom of the last row !!!
      borderBottom: 0
    }
  },
  headCell: {
    fontWeight: '800',
    fontSize: 16
  },
  titlesCell: {
    verticalAlign: 'middle'
  },
  categoryTitle: {
    fontSize: 16
  }
}))

export const BannerIndex = () => {
  const styles = useStyles()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])

  useEffect(() => {
    const fetchBanners = async () => {
      setLoading(true)
      const fetchedBanners = await get_banners()
      setItems(fetchedBanners.data)
      setLoading(false)
    }
    fetchBanners()
  }, [])

  const onVisibleChange = async id => {
    
  }

  const deleteBannerHandler = async id => {
    await delete_banner(id)
    const newBannerList = items.filter(item => item._id !== id)
    setItems(newBannerList)
  }

  const bannersList = items.map((item, index) => (
    <TableRow className={styles.categoriesHolder} key={item._id}>
      <TableCell style={{ minWidth: 100, margin: 0 }}>
        <span className={styles.categoryTitle}>{item.title}</span>
      </TableCell>
      <TableCell style={{ verticalAlign: 'middle', margin: 0 }}>
        <img src={item.imgUrl} style={{ width: 55, verticalAlign: 'middle', height: 'auto', borderRadius: 3 }} />
      </TableCell>
      <TableCell style={{ verticalAlign: 'middle', margin: 0, minWidth: 300 }}>
        <span className={styles.categoryTitle}>{item.link.length > 40 ? item.link.substring(0, 40) + "..." : item.link}</span>          
      </TableCell>
      <TableCell style={{ verticalAlign: 'middle', margin: 0 }}>
        <span className={styles.categoryTitle}>{item.clicks}</span>
      </TableCell>
      <TableCell style={{ verticalAlign: 'middle', margin: 0 }}>
        <span className={styles.categoryTitle}>{item.owner}</span>
      </TableCell>
      <TableCell style={{ verticalAlign: 'middle', margin: 0 }}>
        <span className={styles.categoryTitle}>
          {item.visible ? <Visibility color="primary" /> :  <VisibilityOff color="secondary" />}
        </span>
      </TableCell>
      <TableCell align="right">
        <IconButton 
          color="primary" 
          onClick={() => history.push(`/banners/${(item._id)}`)}>
          <Edit />
        </IconButton>
        <IconButton color="primary" onClick={() => deleteBannerHandler(item._id)}>
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  ))

  console.log(items)

  return loading ? <div>Loading...</div> : <Container>
    <PageTitle text="Banners" />
    <TableContainer>
      <Table className={styles.table}>
        <TableHead>
          <TableRow>
            <TableCell className={styles.headCell}>Title</TableCell>  
            <TableCell className={styles.headCell}>Image</TableCell>  
            <TableCell className={styles.headCell}>Link</TableCell>  
            <TableCell className={styles.headCell}>Clicks</TableCell>  
            <TableCell className={styles.headCell}>Owner</TableCell>  
            <TableCell className={styles.headCell}>Visible</TableCell>  
            <TableCell className={styles.headCell} align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { items ? bannersList : null }
        </TableBody>
      </Table>
    </TableContainer>
    <AddButton 
      text="Add banner" 
      variant="contained" 
      color="primary" 
      onClickBtn={() => history.push('/banners/create')} 
    />
  </Container>
}