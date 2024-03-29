import { useState, useEffect } from "react";
import { Center, HStack, Input, Text } from "@chakra-ui/react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Nav from "../components/Home/NavBar";
import Course from "../components/Home/Course";
import TypeUser from "../utils/types/User";

export default function Home() {
    const navigate = useNavigate();
    const [, setCookie] = useCookies();
    const [user, setUser] = useState<TypeUser | undefined>();
    const [search, setSearch] = useState<string | null>(null);
    const [courses, setCourses] = useState([]);
    const [searchCourses, setSearchCourses] = useState([]);

    const [isVerified, setIsVerified] = useState<boolean>(false);
    
    const handleInputChange = (event:any, setState:any) => {
        setState(event.target.value);
    }

    useEffect(() => {
        getMe()
        getCourses()
    }, [])

    async function getMe() {
        try {
            const { data } = await api.get('/api/me');
            if (data.status) {
                console.log(data)
                setUser(data.user)
            } else {
                setCookie('token', '')
                navigate('/')
            }
        } catch (error) {

        }
    }
    async function getCourses() {
        const { data } = await api.post('/api/courses', { teacher: user?.name || "Sadia Aziz" })
        if (data.status) {
            setCourses(data.courses)
        }
    }
    async function searchCourse() {
        const { data } = await api.post('/api/search', { search: search } )
        if (data.status) {
            setSearchCourses(data.courses)
        }
    }
    return <Nav user={user} >
        <Center>
            <HStack width={'50%'}>
                <Input variant='outline' placeholder='Search Courses' onChange={(event) => { handleInputChange(event, setSearch); searchCourse(); }} />
            </HStack>
        </Center>
            <Text>Search Results:</Text>
        <HStack flexWrap={'wrap'} >
            {search!="" && searchCourses.map(search => {
            
                return <Course course={search} />
            })}
        </HStack>
        <Text>Current Courses:</Text>
        <HStack flexWrap={'wrap'} >

            {courses.map(course => {
            
                return <Course course={course} />
            })}

        </HStack>
    </Nav>
}