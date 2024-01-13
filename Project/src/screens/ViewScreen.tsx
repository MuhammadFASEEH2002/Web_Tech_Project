import { useState, useEffect } from "react";
import { Box, Heading, Stack, Image, Input } from "@chakra-ui/react";
import Card from "../components/View/Card";

export default function View() {
    const [isSelected, setisSelected] = useState<boolean>(false);
    const [selected, setSelected] = useState<string | null>(null);

    return <Stack display={'flex'} justify={'center'} align={'center'}>
        {isSelected && <Stack width={'80%'} display={'flex'} justify={'center'} align={'center'}>

            <Box minW={'50%'} display={'flex'} flexDir={'column'} justifyContent={'center'}
                alignItems={'center'} borderRadius={4} padding={4} margin={4} borderWidth={3}
                borderBottomColor={'gray'} borderStyle={'dashed'}

            >
                <Image src="../../pdf.svg" width={100} height={100} />
                <Heading fontSize={'lg'} >Select Pdf File</Heading>
                <Input type="file" accept="application/pdf" />
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
                    setSelected('BEST')
                    setisSelected(!isSelected)

                }}
            />
            <Card
                label="WORST"
                onClick={() => {

                    setSelected('BEST')
                    setisSelected(!isSelected)
                }}
            />
        </Box>}
    </Stack>
}