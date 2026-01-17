import {FunctionComponent, PropsWithChildren} from 'react'
import {Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader} from '@/components/ui/modal'
import {Heading} from '@/components/ui/heading'
import {CloseIcon, Icon} from '@/components/ui/icon'
import {Button, ButtonText} from '@/components/ui/button'

interface ModalWrapperProps extends PropsWithChildren {
  isOpen: boolean
  onClose: () => void
  onOk: () => void
  heading: string
  okBtnText?: string
}

const ModalWrapper: FunctionComponent<ModalWrapperProps> = props => {
  const {isOpen, onClose, heading, children, okBtnText, onOk} = props

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose()
      }}
      size="md">
      <ModalContent>
        <ModalHeader>
          <Heading size="md" className="text-typography-950">
            {heading}
          </Heading>
          <ModalCloseButton>
            <Icon
              as={CloseIcon}
              size="md"
              className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
            />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            action="secondary"
            onPress={() => {
              onClose()
            }}>
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button
            onPress={() => {
              onOk()
            }}>
            <ButtonText>{okBtnText ?? 'Ok'}</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalWrapper
