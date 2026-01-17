import {FunctionComponent} from 'react'
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from '@/components/ui/select'
import {AlertCircleIcon, ChevronDownIcon} from '@/components/ui/icon'
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control'
import {ScrollView} from 'react-native'

interface SelectWrapperProps {
  categoryName: string
  categoryOptions: string[]
  placeholder?: string
  isRequired: boolean
  value?: string
  onChange: (newValue: string) => void
}

const SelectWrapper: FunctionComponent<SelectWrapperProps> = props => {
  const {categoryName, categoryOptions, placeholder, isRequired, value, onChange} = props

  return (
    <FormControl isRequired={isRequired} className="my-2">
      <FormControlLabel>
        <FormControlLabelText>{categoryName}</FormControlLabelText>
      </FormControlLabel>
      <Select isRequired={isRequired} selectedValue={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectInput placeholder={placeholder ?? ''} className="flex-1" />
          <SelectIcon className="mr-3" as={ChevronDownIcon} />
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <ScrollView>
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              {!isRequired && <SelectItem label="" value="" />}
              {categoryOptions
                .sort((a: string, b: string) => a.localeCompare(b))
                .map(co => (
                  <SelectItem key={co} label={co} value={co} />
                ))}
            </SelectContent>
          </ScrollView>
        </SelectPortal>
      </Select>
      {isRequired && (
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>Mandatory field</FormControlErrorText>
        </FormControlError>
      )}
    </FormControl>
  )
}

export default SelectWrapper
