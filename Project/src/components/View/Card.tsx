import {
  Box,
  Center,
  Text,
  Button,
  useColorModeValue,
} from '@chakra-ui/react'

interface TypeCard {
  label: string,
  onClick: () => void,

}

export default function Card({ label, onClick }: TypeCard) {
  return (
    <Center py={6}
    cursor={'pointer'}
    mx={5}
    >
      <Box
        maxW={'330px'}
        w={'300px'}
        bg={useColorModeValue('white', 'gray.800')}
        borderWidth={1}
        display={'flex'}
        justifyContent={'center'}
        borderColor={'black'}
        rounded={'md'}
        overflow={'hidden'}>
        <Box w={'full'}  display={'flex'}
        justifyContent={'center'} bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10} onClick={onClick} >
          <Text fontWeight={'bold'} >{label}</Text>
        </Box>
      </Box>
      
    </Center>
  )
}