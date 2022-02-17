import { useState, useEffect, useRef } from "react"
import { add_post_to_list, delete_post, get_lists, get_posts } from "../../api/api"
import { useHistory } from "react-router-dom"
import { Edit, Delete } from "@material-ui/icons"
import { makeStyles } from "@material-ui/styles"
import { AddButton } from "../UI/AddButton"
import { PageTitle } from "../UI/PageTitle"
import moment from "moment"
import axios from "axios"
import {
  Container,
  IconButton,
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TablePagination,
  FormControlLabel,
  Checkbox
} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  title: {
    fontSize: 14
  },
  categoriesHolder: {
    padding: 0,
    margin: 0,
    "&:last-child td": {
      // !!! Remove border-bottom of the last row !!!
      borderBottom: 0,
    },
  },
  headCell: {
    fontWeight: "800",
    fontSize: 16,
  },
  titlesCell: {
    verticalAlign: "middle",
  },
  categoryTitle: {
    fontSize: 16,
  },
}));

export const PostIndex = () => {
  const checkInputRef = useRef()
  const styles = useStyles()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])
  const [lists, setLists] = useState([])
  const [checkedInput, setCheckedInput] = useState()
  const [error, setError] = useState(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(20)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const fetchedPosts = await get_posts();
      setItems(fetchedPosts.data);
      setLists(await get_lists())
      // setCheckedInput()
      
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const deletePostHandler = async (id) => {
    await delete_post(id);
    const newPostList = items.filter((item) => item._id !== id);
    setItems(newPostList);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const togglePostToList = async (listId, itemId) => {
    setLoading(true)
    await add_post_to_list(listId, itemId)
    history.push('/')
    history.push('/posts')
    setLoading(false)
  }

  console.log(items)

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, items.length - page * rowsPerPage)
    
  const postList = items ?
    items
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map(item => (
        <TableRow className={styles.categoriesHolder} key={item._id}>
          <TableCell
            style={{ verticalAlign: "middle", margin: 0, width: 700 }}
          >
            <span className={styles.title}>
              {item.title.length > 90 ? item.title.substring(0, 90) + "..." : item.title}
            </span>
          </TableCell>
            { lists ? lists.map(list => (
              <TableCell className={styles.categoryTitle} key={list._id}>
                <FormControlLabel 
                  control={
                    <Checkbox 
                      color="primary" 
                      checked={list.posts.includes(item._id)} 
                      onChange={e => togglePostToList(list._id, item._id)} 
                    />
                  }
                />
              </TableCell>
            )) : null }
          <TableCell style={{ verticalAlign: "middle", margin: 0 }}>
            <span className={styles.categoryTitle} style={{ fontSize: 14 }}>
              {moment(item.createdAt).format("DD MMM YYYY, HH:mm")}
            </span>
          </TableCell>
          <TableCell align="right">
            <IconButton
              color="primary"
              onClick={() => history.push(`/posts/${item._id}`)}
            >
              <Edit />
            </IconButton>
            <IconButton
              color="primary"
              onClick={() => deletePostHandler(item._id)}
            >
              <Delete />
            </IconButton>
          </TableCell>
        </TableRow>
      )) : null

  console.log(lists)
      
  return loading ? (
    <div>Loading...</div>
  ) : (
    <Container>
      <PageTitle text="Posts" />

      <TableContainer>
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell className={styles.headCell}>Title</TableCell>
              <TableCell className={styles.headCell}>Main news</TableCell>
              <TableCell className={styles.headCell}>Editor choice</TableCell>
              <TableCell className={styles.headCell}>Timestamp</TableCell>
              <TableCell className={styles.headCell} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {postList}
            {items && emptyRows > 0 ? (
              <TableRow
                className="empty-rows"
                style={{ height: 53 * emptyRows }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
        <div>
          <TablePagination
            className="posts-pagination"
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={items.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </div>
      </TableContainer>
      <AddButton
        text="Add post"
        variant="contained"
        color="primary"
        onClickBtn={() => history.push("/posts/create")}
      />
    </Container>
  )
}