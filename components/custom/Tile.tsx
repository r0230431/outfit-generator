import {FunctionComponent, PropsWithChildren} from 'react'
import {Box} from '@/components/ui/box'
import {Center} from '@/components/ui/center'
import {Text} from '@/components/ui/text'
import LinkButton from '@/components/custom/LinkButton'

interface TileProps extends PropsWithChildren {
  text: string
  linkUrl: string
  linkBtnText: string
}

const Tile: FunctionComponent<TileProps> = props => {
  const {text, linkUrl, linkBtnText, children} = props

  return (
    <Box className="m-10">
      <Center>{children}</Center>
      <Text className="text-center text-xl my-5">{text}</Text>
      <LinkButton page={linkUrl} text={linkBtnText} hasIconLeft={false} hasIconRight={true} />
    </Box>
  )
}

export default Tile
