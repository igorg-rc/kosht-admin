import { makeStyles } from "@material-ui/styles"
import { Close } from "@material-ui/icons"
import { useState } from "react"
import {
  Button,
  Checkbox,
  TextField,
  FormControlLabel,
} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  btn: {
    margin: 3,
    textAlign: "left",
  },
}));

export const InnerItem = (props) => {
  const styles = useStyles()
  const {
    onItemInputChange,
    onAddItem,
    onRemoveItem,
    itemValue,
    items,
    placeholder,
    handleCheck,
    checked,
  } = props

  return (
    <>
      <h2>
        Post {placeholder}: (remove excessive {placeholder} instances from the
        list by clicking them):
      </h2>
      <div className="items-input">
        <ul>
          {items &&
            items.map((item, index) => (
              <Button
                key={item._id}
                variant="contained"
                color="secondary"
                className={styles.btn}
                onClick={(id) => onRemoveItem(item._id)}
              >
                <span>{item.title_ua}</span>
                <Close />
              </Button>
              // <FormControlLabel
              //   key={index}
              //   label={item.title_en}
              //   control={<Checkbox checked={checked} onChange={handleCheck} />}
              // />
            ))}
        </ul>
      </div>
      <form onSubmit={onAddItem}>
        <TextField
          fullWidth
          placeholder={`Type new ${placeholder} title and press 'ENTER' to create a new ${placeholder}`}
          label={`Create new ${placeholder}`}
          value={itemValue}
          variant="outlined"
          onChange={onItemInputChange}
        />
      </form>
    </>
  );
};
