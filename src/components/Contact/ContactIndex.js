import { useState, useEffect } from 'react'
import { delete_contact, get_contacts } from '../../api/api'
import { useHistory } from 'react-router-dom'
import { Container, Table, TableContainer, TableBody, TableRow, TableHead, TableCell, IconButton } from '@material-ui/core'
import { Edit, Delete } from '@material-ui/icons'
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

export const ContactIndex = () => {
  const styles = useStyles()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true)
      const fetchedContacts = await get_contacts()
      setItems(fetchedContacts.data)
      setLoading(false)
    }
    fetchContacts()
  }, [])

  const deleteContactHandler = async id => {
    await delete_contact(id)
    const newContactList = items.filter(item => item._id !== id)
    setItems(newContactList)
  }

  const contactList = items ? items.map(item => (
    <TableRow className={styles.categoriesHolder} key={item._id}>
      <TableCell style={{ verticalAlign: 'middle', margin: 0 }}>
        <span className={styles.categoryTitle}>{item.title_ua}</span>
      </TableCell>
      <TableCell style={{ verticalAlign: 'middle', margin: 0, width: 200 }}>
        <img src={item.imgUrl} style={{ width: 20, verticalAlign: 'middle', height: 'auto', borderRadius: 3 }} />
      </TableCell>
      <TableCell style={{ verticalAlign: 'middle', margin: 0 }}>
        <span className={styles.categoryTitle}>
          {item.link.length > 70 ? item.link.substring(0, 70) + "..." : item.link}
        </span>
      </TableCell>
      <TableCell align="right">
        <IconButton 
          color="primary" 
          onClick={() => history.push(`/contacts/${(item._id)}`)}>
          <Edit />
        </IconButton>
        <IconButton color="primary" onClick={() => deleteContactHandler(item._id)}>
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  )) : null

  console.log(items)

  return loading ? <div>Loading...</div> : <Container>
    <PageTitle text="Contacts" />
    <TableContainer>
      <Table className={styles.table}>
        <TableHead>
          <TableRow>
            <TableCell className={styles.headCell}>Title</TableCell>  
            <TableCell className={styles.headCell}>Icon</TableCell>  
            <TableCell className={styles.headCell}>Link</TableCell>  
            <TableCell className={styles.headCell} align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { contactList }
        </TableBody>
      </Table>
    </TableContainer>
    <AddButton 
      text="Add contact" 
      variant="contained" 
      color="primary" 
      onClickBtn={() => history.push('/contacts/create')} 
    />
  </Container>
}