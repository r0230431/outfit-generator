import {FunctionComponent} from 'react'
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control'
import {Input, InputField} from '@/components/ui/input'
import {AlertCircleIcon} from '@/components/ui/icon'

interface FormInputProps {
  label: string
  placeholder?: string
  value?: string
  onChange: (newValue: string) => void
  isRequired: boolean
  isInvalid?: boolean
  errorMessage?: string
}

const FormInput: FunctionComponent<FormInputProps> = props => {
  const {label, placeholder, value, isRequired, onChange, isInvalid, errorMessage} = props

  return (
    <FormControl isRequired={isRequired} isInvalid={isInvalid} className="my-2">
      <FormControlLabel>
        <FormControlLabelText>{label}</FormControlLabelText>
      </FormControlLabel>
      <Input variant="outline" size="md">
        <InputField placeholder={placeholder ?? ''} defaultValue={value} onChangeText={onChange} />
      </Input>
      {isInvalid && errorMessage && (
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>{errorMessage}</FormControlErrorText>
        </FormControlError>
      )}
    </FormControl>
  )
}

export default FormInput
