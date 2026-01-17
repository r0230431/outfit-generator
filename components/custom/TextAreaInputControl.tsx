import {FunctionComponent} from 'react'
import {FormControl, FormControlLabel, FormControlLabelText} from '@/components/ui/form-control'
import {Textarea, TextareaInput} from '@/components/ui/textarea'

interface TextAreaInputProps {
  label: string
  placeholder?: string
  value?: string
  onChange: (newValue: string) => void
}

const TextAreaInputControl: FunctionComponent<TextAreaInputProps> = props => {
  const {label, placeholder, value, onChange} = props

  return (
    <FormControl className="my-2">
      <FormControlLabel>
        <FormControlLabelText>{label}</FormControlLabelText>
      </FormControlLabel>
      <Textarea size="sm" className="max-w-84 flex align-top">
        <TextareaInput
          placeholder={placeholder ?? ''}
          defaultValue={value}
          onChangeText={onChange}
          style={{textAlignVertical: 'top'}}
        />
      </Textarea>
    </FormControl>
  )
}

export default TextAreaInputControl
