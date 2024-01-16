import { useState, useEffect } from "react";
import { Center, HStack, Input } from "@chakra-ui/react";
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
    const [courses, setCourses] = useState([]);

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
        const { data } = await api.post('/api/courses', { teacher: user?.name })
        if (data.status) {
            setCourses(data.courses)
        }
    }
    return <Nav user={user} >
        <Center>
            <HStack width={'50%'}>
                <Input variant='outline' placeholder='Search Courses' />
            </HStack>
        </Center>
        <HStack flexWrap={'wrap'} >
            {courses.map(course => {
                return <Course course={course} />
            })}

        </HStack>
    </Nav>
}