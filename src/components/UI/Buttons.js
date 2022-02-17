import { Button } from '@material-ui/core'
import { Send, CancelOutlined } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  main: {
    paddingTop: '10px',
    textAlign: 'center',
    margin: '10px 0'
  },
  btnText: {
    fontSize: 16
  },
  btnIcon: {
    fontSize: 20,
    paddingLeft: 5
  }
}))

export const CancelButton = ({ color, variant, text, type, onClick }) => {
  const styles = useStyles()
  return <div className={styles.main}>
    <Button color={color} variant={variant} type={type} className={styles.btn} onClick={onClick}>
      <span className={styles.btnText}>{text}</span> 
      <CancelOutlined className={styles.btnIcon} />
    </Button>
  </div>
}


export const SendButton = ({ color, variant, text, type }) => {
  const styles = useStyles()
  return <div className={styles.main}>
    <Button color={color} variant={variant} type={type} className={styles.btn}>
      <span className={styles.btnText}>{text}</span> 
      <Send className={styles.btnIcon} />
    </Button>
  </div>
}