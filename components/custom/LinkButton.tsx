import {FunctionComponent} from 'react'
import {Button, ButtonIcon, ButtonText} from '@/components/ui/button'
import {Link} from 'expo-router'
import {ArrowLeftIcon, ArrowRightIcon} from 'lucide-react-native'

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type Variant = 'solid' | 'outline' | 'link'

interface LinkButtonProps {
  page: string
  text: string
  hasIconLeft: boolean
  hasIconRight: boolean
  variant?: Variant
  size?: Size
}

const LinkButton: FunctionComponent<LinkButtonProps> = props => {
  const {page, text, hasIconLeft, hasIconRight, variant, size} = props

  return (
    <>
      {hasIconLeft && (
        <Button size={size ?? 'xl'} variant={variant ?? 'solid'} className="rounded-xl m-8">
          <ButtonIcon as={ArrowLeftIcon} />
          <ButtonText>
            <Link href={`../${page}`}>{text}</Link>
          </ButtonText>
        </Button>
      )}

      {hasIconRight && (
        <Button size={size ?? 'xl'} variant={variant ?? 'solid'} className="rounded-xl m-8">
          <ButtonText>
            <Link href={`./${page}`}>{text}</Link>
          </ButtonText>
          <ButtonIcon as={ArrowRightIcon} />
        </Button>
      )}
    </>
  )
}

export default LinkButton
