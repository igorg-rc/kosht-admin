import { useState, useEffect } from 'react'
import { delete_user, get_users } from '../../api/api'
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

export const SubscriberIndex = () => {
  const styles = useStyles()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      const fetchedUsers= await get_users()
      setItems(fetchedUsers.data)
      setLoading(false)
    }
    fetchUsers()
  }, [])

  const deleteUserHandler = async id => {
    await delete_user(id)
    const newUserList = items.filter(item => item._id !== id)
    setItems(newUserList)
  }

  const categoriesList = items.map(item => (
    <TableRow className={styles.categoriesHolder} key={item._id}>
      <TableCell style={{ verticalAlign: 'middle', margin: 0 }}>
        <span className={styles.categoryTitle}>{item.email}</span>
      </TableCell>
      <TableCell align="right">
        <IconButton 
          color="primary" 
          onClick={() => history.push(`/users/${(item._id)}`)}>
          <Edit />
        </IconButton>
        <IconButton color="primary" onClick={() => deleteUserHandler(item._id)}>
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  ))

  console.log(items)

  return loading ? <div>Loading...</div> : <>
  { items ? <Container>
    <PageTitle text="Subscribers" />
    <TableContainer>
      <Table className={styles.table}>
        <TableHead>
          <TableRow>
            <TableCell className={styles.headCell}>Email</TableCell>  
            <TableCell className={styles.headCell} align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { categoriesList }
        </TableBody>
      </Table>
    </TableContainer>
    <AddButton 
      text="Add category" 
      variant="contained" 
      color="primary" 
      onClickBtn={() => history.push('/categories/create')} 
    />
  </Container> : null } 
  </>
}