import { useHistory } from "react-router-dom"
import {
  FormLayout,
  FileInputField,
  TextInputField,
  Form,
  FormButtonsHolder,
  CancelButton,
  SendButton,
} from "../UI/UiUnits"

export const ContactForm = props => {
  const history = useHistory()
  const { 
    onFormSubmit, 
    onTitleUaInputChange,
    onTitleEnInputChange, 
    onImageHoverChange, 
    onImageMainChange, 
    titleUa, 
    titleEn,
    imageMain, 
    imageHover
  } = props

  return <FormLayout>
    <form encType="multipart/form-data" onSubmit={onFormSubmit}>
      <TextInputField
        variant="outlined"
        fullWidth
        value={titleUa}
        onChange={onTitleUaInputChange}
        label="Title in Ukrainian"
        name="title_ua"
      />
      <TextInputField
        variant="outlined"
        value={titleEn}
        onChange={onTitleEnInputChange}
        label="Title in English"
        name="title_en"
      />
      <FileInputField 
        label="Primary image" 
        name="img_main"
        value={imageMain}
        onChange={onImageMainChange}
      />
      <FileInputField 
        label="Hover image" 
        name="img_hover"
        value={imageHover}
        onChange={onImageHoverChange}
      />
      <FormButtonsHolder>
        <CancelButton 
          color="secondary"
          variant="contained"
          text="Cancel" 
          onClick={e => history.push("/categories")}
        />
        <SendButton 
          color="primary"
          variant="contained"
          text="Send" 
          type="submit"
        />
      </FormButtonsHolder>
    </form>
  </FormLayout>