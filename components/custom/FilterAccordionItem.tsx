import {FunctionComponent, useState} from 'react'
import {CheckIcon, ChevronDownIcon, ChevronUpIcon} from 'lucide-react-native'
import {Checkbox, CheckboxGroup, CheckboxIcon, CheckboxIndicator, CheckboxLabel} from '@/components/ui/checkbox'
import {Button, ButtonIcon, ButtonText} from '@/components/ui/button'

interface FilterAccordionItemProps {
  title: string
  filterValues: string[]
  setFilterValues: (values: string[]) => void
  list: string[]
}

const FilterAccordionItem: FunctionComponent<FilterAccordionItemProps> = props => {
  const {title, list, filterValues, setFilterValues} = props
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <CheckboxGroup value={filterValues} onChange={setFilterValues} className="border-b border-outline-300 ms-5 pb-3">
      <Button variant="outline" onPress={() => setIsOpen(x => !x)} className="border-0 justify-between">
        <ButtonText className="align-start">{title}</ButtonText>
        <ButtonIcon as={isOpen ? ChevronUpIcon : ChevronDownIcon} />
      </Button>

      {isOpen &&
        list.map(item => (
          <Checkbox size="md" className="my-2" key={item} value={item}>
            <CheckboxIndicator>
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
            <CheckboxLabel>{item}</CheckboxLabel>
          </Checkbox>
        ))}
    </CheckboxGroup>
  )
}

export default FilterAccordionItem
