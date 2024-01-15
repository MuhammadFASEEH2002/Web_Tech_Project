import { useState, useEffect } from "react";
import { Box, Heading, Stack, Image, Input, Button, useToast } from "@chakra-ui/react";
import Card from "../components/View/Card";
import api from "../utils/api";
import TypeUser from "../utils/types/User";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";


export default function View() {
    const toast = useToast()

    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies();
    const [isSelected, setisSelected] = useState<boolean>(false);
    const [selected, setSelected] = useState<string | null>(null);
    const [user, setUser] = useState<TypeUser | undefined>();
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };
    useEffect(() => {
        getMe()
    }, [])
    async function postBest() {
        const formData = new FormData();
        formData.append('file', file);
        // formData.append('filename', file.name);

        try {
            const upload = await api.post('/api/post-best', {
                teacher: 'Sadia Aziz',
                courseId: localStorage.getItem('courseID'),
                formData,
            });
            if (upload.status) {
                toast({
                    title: "File Uploaded",
                    status: "success",
                    position: "top",
                    duration: 5000,
                    isClosable: true
                })
            }
            // .then((res) => {
            //     // Handle the response here
            //    if(res.status){
            //     toast({
            //         title: "File Uploaded",
            //         status: "success",
            //         position: "top",
            //         duration: 5000,
            //         isClosable: true
            //       })
            //    }
            //     // Additional actions or logic
        } catch (error) {
            // Handle the error here
        }
    }

    async function getMe() {
        try {
            const { data } = await api.get('/api/me');
            if (data.status) {
                setUser(data.user)
                console.log(data.user)
            } else {
                setCookie('token', '')
                navigate('/')
            }
        } catch (error) {

        }
    }
    return <Stack display={'flex'} justify={'center'} align={'center'}>
        {isSelected && <Stack width={'80%'} display={'flex'} justify={'center'} align={'center'}>

            <Box minW={'50%'} display={'flex'} flexDir={'column'} justifyContent={'center'}
                alignItems={'center'} borderRadius={4} padding={4} margin={4} borderWidth={3}
                borderBottomColor={'gray'} borderStyle={'dashed'}

            >
                <Image src="../../pdf.svg" width={100} height={100} />
                <Heading fontSize={'lg'} >Select Pdf File</Heading>
                <Input type="file" accept="application/pdf" onChange={handleFileChange} />
                <Button onClick={() => {
                    if (selected == "BEST") {
                        postBest();
                    }
                }}>Submit</Button>
            </Box>
            <Stack>

            </Stack>
        </Stack>}
        {!isSelected && <Box w={'100%'} h={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'} >
            <Card
                label="BEST"
                onClick={() => {
                    setSelected('BEST')
                    setisSelected(!isSelected)
                }}
            />
            <Card
                label="AVERAGE"
                onClick={() => {
                    setSelected('AVERAGE')
                    setisSelected(!isSelected)

                }}
            />
            <Card
                label="WORST"
                onClick={() => {

                    setSelected('WORST')
                    setisSelected(!isSelected)
                }}
            />
        </Box>}
    </Stack>
}