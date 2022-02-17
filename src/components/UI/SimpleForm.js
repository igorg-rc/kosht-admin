import { TextField, Container, Button, Grid } from "@material-ui/core"
import { makeStyles } from '@material-ui/styles'
import { CancelButton, SendButton } from "../UI/Buttons"
import { useLocation, useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  form: {
  },
  fileInput: {
    padding: 0, 
    margin: 0
  },
  textInput: {
    marginBottom: 10
  }
}))

export const SimpleForm = props => {
  const styles = useStyles()
  const location = useLocation()
  const history = useHistory()
  const { 
    title_ua, 
    title_en, 
    link,
    image, 
    onTitleOneInputChange, 
    onTitleTwoInputChange,
    onLinkInputChange,
    onFileInputChange,
    onFormSubmit
  } = props

  return <>
    <Container>
        <Grid container>
          <Grid item xs={false} md={3}></Grid>
          <Grid item xs={12} md={6}>
            <div>
            <form 
              style={{ textAlign: 'center', margin: '0 auto' }}
              className={styles.form} 
              onSubmit={onFormSubmit} 
              encType={ 
                (location.pathname).includes('tags') ? 
                "application/x-www-form-urlencoded"  : "multipart/form-data"  
              }
            >
              <TextField 
                variant="outlined"
                fullWidth
                value={title_ua}
                onChange={onTitleOneInputChange} 
                label="Title (Ukrainian)"
                className={styles.textInput}
              />
              <TextField 
                variant="outlined"
                fullWidth
                value={title_en}
                onChange={onTitleTwoInputChange} 
                label="Title (English)"
                className={styles.textInput}
              />
              <TextField 
                variant="outlined"
                fullWidth
                value={link}
                onChange={onLinkInputChange} 
                label="Link"
                className={styles.textInput}
                style={{
                  display: (location.pathname).includes("contacts")  ?
                  "inline-block"  : "none"
                }}
              />
              <Button
                fullWidth
                variant="contained"
                component="label"
                className={styles.fileInput}
                style={{ 
                  padding: '10px 0', 
                  display: (location.pathname).includes("tags")  ?
                  "none"  : "inline-block" 
                }}
              >Choose File
                <input 
                  type="file" 
                  name="image" 
                  hidden 
                  onChange={onFileInputChange} 
                  defaultValue={image} 
                />
              </Button>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <CancelButton 
                  text="Cancel"
                  variant="contained"
                  color="secondary"
                  onClick={e => history.push(`/${location.pathname.split("/").slice(1,2).toString()}`)}
                />
                <SendButton 
                  text="Submit" 
                  type="submit" 
                  color="primary" 
                  variant="contained" 
                />
              </div>
            </form>
            </div>
          </Grid>
          <Grid item xs={false} md={3}></Grid>
        </Grid>
    </Container>
  </>
}