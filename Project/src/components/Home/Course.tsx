import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  useColorModeValue,
} from '@chakra-ui/react'


interface TypeCourse {
  _id: string,
  course: string,
  code: string,
  section: string,
  semester: number
}

export default function Course({ course }: { course: TypeCourse }) {
  return (
    <Center py={6}
    >
      <Box
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}>

        <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>
          <Text fontWeight={'bold'} > {course.course}</Text>
          <Text color={'gray'} >CODE : {course.code}</Text>
          <Text color={'gray'} >SEMESTER : {course.semester}</Text>
          <Text fontWeight={'bold'} >SECTION : {course.section}</Text>
          <Button
            mt={5}
            w={'full'}
            bg={'green.400'}
            color={'white'}
            rounded={'xl'}
            boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
            _hover={{
              bg: 'green.500',
            }}
            _focus={{
              bg: 'green.500',
            }}
            as='a'
            href={`/view/${course._id}`}
            onClick={()=>{
              localStorage.setItem("courseID", course._id);
            }}
            >
            View
          </Button>
        </Box>
      </Box>
    </Center>
  )
}