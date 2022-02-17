import {
  TextField,
  Container,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Send, CancelOutlined } from "@material-ui/icons";
// import { CancelButton, SendButton } from "../UI/Buttons"
// import { useLocation, useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  fileInput: { padding: "10px 0", margin: 0 },
}));

const useTitleStyles = makeStyles((theme) => ({
  main: { padding: "20px 0" },
  text: { fontFamily: "Play" },
}));

const fileInputStyles = makeStyles((theme) => ({
  fileInput: { padding: "10px 0", marginBottom: 10 },
}));

const textInputStyles = makeStyles((theme) => ({
  textInput: { marginBottom: 10 },
}));

const useButtonStyles = makeStyles((theme) => ({
  main: {
    paddingTop: "10px",
    textAlign: "center",
    margin: "10px 0",
  },
  btnText: {
    fontSize: 16,
  },
  btnIcon: {
    fontSize: 20,
    paddingLeft: 5,
  },
}));


export const CancelButton = (props) => {
  const { color, variant, text, type, onClick } = props;
  const styles = useButtonStyles();
  return (
    <div className={styles.main}>
      <Button
        color={color}
        variant={variant}
        type={type}
        className={styles.btn}
        onClick={onClick}
      >
        <span className={styles.btnText}>{text}</span>
        <CancelOutlined className={styles.btnIcon} />
      </Button>
    </div>
  )
}

export const SendButton = ({ color, variant, text, type }) => {
  const styles = useButtonStyles()
  return (
    <div className={styles.main}>
      <Button
        color={color}
        variant={variant}
        type={type}
        className={styles.btn}
      >
        <span className={styles.btnText}>{text}</span>
        <Send className={styles.btnIcon} />
      </Button>
    </div>
  )
}

export const PageTitle = ({ label }) => {
  const styles = useTitleStyles()
  return (
    <div className={styles.main}>
      <Typography variant="h4" className={styles.text}>
        {label}
      </Typography>
    </div>
  )
}

export const PageSubtitle = (props) => {
  return <></>
}

export const TextInputField = (props) => {
  const { variant, value, onChange, label } = props
  const styles = textInputStyles()

  return (
    <TextField
      fullWidth
      variant={variant}
      value={value}
      onChange={onChange}
      label={label}
      className={styles.textInput}
    />
  )
}

export const FileInputField = (props) => {
  const { label, image, name, onChange } = props
  const styles = fileInputStyles()

  return (
    <Button
      fullWidth
      variant="contained"
      component="label"
      className={styles.fileInput}
    >
      {label}
      <input
        hidden
        type="file"
        name={name}
        onChange={onChange}
        defaultValue={image}
      />
    </Button>
  )
}

export const Form = ({ encType, children, onSubmit }) => {
  return (
    <form 
      onSubmit={onSubmit} 
      encType={encType}>
      {children}
    </form>
  )
}

export const PrimaryLoader = (props) => {
  return <></>
}

export const SecondaryLoader = (props) => {
  return <></>
}

export const FormButtonsHolder = ({ children }) => {
  return <div style={{ display: "flex", justifyContent: "space-between" }}>
    { children }
  </div>
}

export const FormLayout = ({ children }) => {
  return <Grid container>
    <Grid item xs={false} sm={2} md={3}></Grid>
    <Grid item xs={12} sm={8} md={6}>{children}</Grid>
    <Grid item xs={false} sm={2} md={3}></Grid>
  </Grid>
}

// export const UiUnits = props => {
//   const styles = useStyles()
//   const location = useLocation()
//   const history = useHistory()
//   const {
//     title_ua,
//     title_en,
//     image,
//     onTitleOneInputChange,
//     onTitleTwoInputChange,
//     onLinkInputChange,
//     onFileInputChange,
//     onFormSubmit
//   } = props

//   return <>
//     <Container>
//         <Grid container>
//           <Grid item xs={false} md={3}></Grid>
//           <Grid item xs={12} md={6}>
//             <div>
//             <form
//               style={{ textAlign: 'center', margin: '0 auto' }}
//               className={styles.form}
//               onSubmit={onFormSubmit}
//               encType={
//                 (location.pathname).includes('tags') ?
//                 "application/x-www-form-urlencoded"  : "multipart/form-data"
//               }
//             >
//               <TextField
//                 variant="outlined"
//                 fullWidth
//                 value={title_ua}
//                 onChange={onTitleOneInputChange}
//                 label="Title (Ukrainian)"
//                 className={styles.textInput}
//               />
//               <TextField
//                 variant="outlined"
//                 fullWidth
//                 value={title_en}
//                 onChange={onTitleTwoInputChange}
//                 label="Title (English)"
//                 className={styles.textInput}
//               />
//               <TextField
//                 variant="outlined"
//                 fullWidth
//                 value={title_en}
//                 onChange={onLinkInputChange}
//                 label="Link"
//                 className={styles.textInput}
//                 style={{
//                   display: (location.pathname).includes("contacts")  ?
//                   "inline-block"  : "none"
//                 }}
//               />
//               <Button
//                 fullWidth
//                 variant="contained"
//                 component="label"
//                 className={styles.fileInput}
//                 style={{
//                   padding: '10px 0',
//                   display: (location.pathname).includes("tags")  ?
//                   "none"  : "inline-block"
//                 }}
//               >Choose File
//                 <input
//                   type="file"
//                   name="image"
//                   hidden
//                   onChange={onFileInputChange}
//                   defaultValue={image}
//                 />
//               </Button>
//               <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <CancelButton
//                   text="Cancel"
//                   variant="contained"
//                   color="secondary"
//                   onClick={e => history.push(`/${location.pathname.split("/").slice(1,2).toString()}`)}
//                 />
//                 <SendButton
//                   text="Submit"
//                   type="submit"
//                   color="primary"
//                   variant="contained"
//                 />
//               </div>
//             </form>
//             </div>
//           </Grid>
//           <Grid item xs={false} md={3}></Grid>
//         </Grid>
//     </Container>
//   </>
// }
