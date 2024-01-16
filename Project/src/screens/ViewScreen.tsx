import { useState, useEffect } from "react";
import { Box, Heading, Stack, Image, useToast, Button, Text, HStack, IconButton } from "@chakra-ui/react";
import Card from "../components/View/Card";
import { useParams } from 'react-router-dom';
import api from "../utils/api";
import CourseType from "../utils/types/Course";
import { MdDeleteForever } from "react-icons/md";
import { IoBackspace, IoCloudDownloadSharp } from "react-icons/io5";

interface TypeFiles {
    filePath: string,
    fileName: string,
    type: string,
    _id: string,
    course: CourseType,
}

export default function View() {

    let params = useParams();
    const id: string = params?.id?.toString() ?? '';
    const [isSelected, setisSelected] = useState<boolean>(false);
    const [selected, setSelected] = useState<string | null>(null);
    const [files, setFiles] = useState<TypeFiles[]>([]);
    const toast = useToast();


    useEffect(() => {

        if (selected) {
            loadfiles()
        }
    }, [selected])

    const loadfiles = async () => {
        const { data } = await api.post('/api/files', {
            courseId: id,
            type: selected
        })
        if (data.status) {
            setFiles(data.files)
        }
    }


    const selectFile = () => {
        const input = document.createElement("input")
        input.type = 'file'

        input.onchange = (i: Event) => {
            const target = i.target as HTMLInputElement;
            console.log(target?.files)
            if (target?.files && target?.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e: ProgressEvent<FileReader>) {
                    console.log(e?.target?.result)

                };
                const fileName = target.files[0].name.toLowerCase();
                const fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
                if (fileExtension === 'pdf') {
                    // The selected file is a PDF
                    console.log('PDF file selected:', fileName);
                    reader.readAsDataURL(target.files[0]);
                    uploadImage(i)
                    // Perform further actions with the PDF file
                } else {
                    // Invalid file type
                    console.log('Please select a PDF file.');
                    toast({
                        title: "Please select a PDF file.",
                        status: "error",
                        position: "top",
                        duration: 5000,
                        isClosable: true
                    })
                }

            }
        }
        input.click()
    }
    async function uploadImage(i: any) {

        const formData = new FormData();
        formData.append('filename', i?.target?.files?.[0]?.name);
        formData.append('pdf', i.target.files[0]);
        formData.append('course_id', id);
        formData.append('type', selected ?? '');
        const { data } = await api.post('/api/upload/pdf', formData)
        if (data.status) {
            toast({
                title: `file uploaded`,
                description: `URL : ${data.url}`,
                status: "success",
                position: "top",
                duration: 5000,
                isClosable: true
            })
            loadfiles()
        }

    }

    const removeFile = (id : string) => {
        setFiles((prevFiles) => prevFiles.filter((file) => file._id !== id));
      };

    return <Stack display={'flex'} justify={'center'} align={'center'}>
        {isSelected && <Stack width={'80%'} display={'flex'} justify={'center'} align={'center'}>
            <Stack width={{ base: '100%', lg: '60%' }} m={2}>
                <Button width={100} variant={'outline'} leftIcon={<IoBackspace />}
                    onClick={() => setisSelected(false)}
                >
                    Go Back
                </Button>
            </Stack>


            <Box minW={'50%'} width={{ base: '100%', lg: '60%' }} display={'flex'}
                flexDir={'column'} justifyContent={'center'}
                alignItems={'center'} borderRadius={4} padding={4} margin={4} borderWidth={3}
                borderBottomColor={'gray'} borderStyle={'dashed'}
                onClick={selectFile}
            >
                <Image src="../../pdf.svg" width={100} height={100} />
                <Heading fontSize={'lg'} >Select Pdf File</Heading>
                <Button  >Choose file</Button>
            </Box>
            <Stack>
                {files?.map(file => <FileItem file={file} removeFile={removeFile} />)}
            </Stack>
        </Stack>}
        {!isSelected && <Box w={'100%'} h={'100vh'}
         display={'flex'} justifyContent={'center'} alignItems={{
            base : 'flex-start',
            lg : 'center'
         }}
         flexWrap={'wrap'}
         >
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

const FileItem = ({ file , removeFile }: { file: TypeFiles , removeFile : (id : string)=> void }) => {

    

    const onDownloadClicked = () => {
        const url = window.location.origin + '/' + file.filePath
        const downloadLink = document.createElement('a');


        // Set the download link attributes
        downloadLink.href = url
        downloadLink.setAttribute('download', file.fileName);

        // Append the anchor element to the body and click it programmatically
        document.body.appendChild(downloadLink);
        downloadLink.click();

        // Clean up the temporary anchor element
        document.body.removeChild(downloadLink);
    }

    const deleteFile = async () => {
        const { data } = await api.delete(`/api/file/${file._id}`)
        if(data.status){
            removeFile(file._id)
        }
    }

    return <HStack maxW={'500px'} minW={{ base: 'auto', lg: '450px' }} shadow={'md'} padding={4}>
        <Image src="../../pdf.svg" w={50} height={50} />
        <Stack flex={1} overflow={'hidden'}>
            <Heading size={'md'} noOfLines={2} >{file.fileName}</Heading>
            <Text>{file.type}</Text>
        </Stack>
        <HStack>


            <IconButton
                onClick={onDownloadClicked}
                variant='outline'
                colorScheme='blue'
                aria-label='download'
                icon={<IoCloudDownloadSharp />}
            />
            <IconButton
                onClick={deleteFile}
                variant='outline'
                colorScheme='red'
                aria-label='remove'
                icon={<MdDeleteForever />}
            />

        </HStack>
    </HStack>
}