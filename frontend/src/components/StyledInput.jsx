import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

const TextInput = styled(TextField)(
  ({ height, width, textColor, inputColor, fontSize, focusColor }) => ({
    '& label.Mui-focused': {
      marginTop: "2px",
      color: focusColor ? focusColor : '#A0AAB4',
      paddingLeft: '1px'
    },
    '& label': {
      marginTop: '-5px',
      fontSize: fontSize ? fontSize : '16px',
      color: inputColor ? inputColor : '#A0AAB4'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#B2BAC2',
    },
    '& .MuiOutlinedInput-root': {
      color: textColor ? textColor : '#A0AAB4',
      width: width ? width : '180px',
      height: height ? height : '45px',
      fontSize: fontSize ? fontSize : '18px',
      '& fieldset': {
        borderColor: inputColor ? `1px solid ${inputColor}` : '1px solid #a0a0a0',
      },
      // '&:hover fieldset': {
      //   borderColor: '#B2BAC2',
      // },
      '&.Mui-focused fieldset': {
        borderColor: focusColor ? focusColor : '#6F7E8C',
      },
    },
  })
)
export default TextInput;