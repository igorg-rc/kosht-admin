import { TextField, Container, Button, Checkbox, FormControlLabel, Grid } from "@material-ui/core"
import { makeStyles } from '@material-ui/styles'
import { useHistory, useLocation } from "react-router"
import { CancelButton, SendButton } from "../UI/Buttons"


const useStyles = makeStyles(theme => ({
  form: {
    padding: '10px 0'
  },
  fileInput: {
    margin: '10px 0'
  },
  textInput: {
    marginBottom: 10
  }
}))


export const BannerForm = props => {
  const history = useHistory()
  const location = useLocation()
  const { 
    title, 
    owner, 
    image, 
    link,
    onTitleInputChange, 
    onOwnerInputChange,
    onLinkInputChange,
    onFileInputChange,
    checked,
    onCheckChange,
    onFormSubmit
  } = props

  const styles = useStyles()

  return <>
    <Container>
      <Grid container>
        <Grid item xs={false} md={3}></Grid>
        <Grid item xs={12} md={6}>
        <form 
          className={styles.form} 
          onSubmit={onFormSubmit} 
          encType="multipart/form-data"
        >
          <TextField 
            variant="outlined"
            fullWidth
            value={title}
            onChange={onTitleInputChange} 
            label="Title"
            className={styles.textInput}
          />
          <TextField 
            variant="outlined"
            fullWidth
            value={owner}
            onChange={onOwnerInputChange} 
            label="Owner"
            className={styles.textInput}
          />
          <TextField 
            variant="outlined"
            fullWidth
            value={link}
            onChange={onLinkInputChange} 
            label="Link"
            className={styles.textInput}
          />
          <Button
          fullWidth
            variant="contained"
            component="label"
            className={styles.fileInput}
          >Choose File
            <input 
              type="file" 
              name="banner-image" 
              hidden 
              onChange={onFileInputChange} 
              defaultValue={image} />
          </Button>
          <div style={{ textAlign: 'left', marginRight: 'auto' }}> 
            <FormControlLabel
              label="Visible"
              labelPlacement="end"
              control={
                <Checkbox 
                  onChange={onCheckChange}
                  checked={checked}
                  color="primary"
                />
              }
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
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
        </Grid>
       <Grid item xs={false} md={3}></Grid>
       </Grid>
    </Container>
  </>
}