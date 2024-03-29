import { useEffect, useState } from 'react'
// @ts-ignore
import { jwtDecode } from 'jwt-decode'
import { useCookies } from 'react-cookie';
import {
  Stack,
  Button,
  Box,
  useToast
} from "@chakra-ui/react";
import TypeUser from '../utils/types/User';
import CallBack_ResponseType from '../utils/types/Login';


function Login() {
  
  const toast = useToast()
  const [cookies, setCookie] = useCookies();
  const [user, setUser] = useState<TypeUser>(Object)

  function handleCallbackResponse(response: CallBack_ResponseType) {

    const decoded: TypeUser = jwtDecode(response.credential);

    console.log(decoded)

    if (decoded.hd === "szabist.pk") {

      const currentDate = new Date();
      // Expires in 10days
      const expirationDate =  new Date(currentDate.getTime() + (10 * 24 * 60 * 60 * 1000));
      setCookie("token" , response.credential, { path : '/' , expires : expirationDate})

      toast({
        title: "Login Successful",
        status: "success",
        position: "top",
        duration: 5000,
        isClosable: true
      })
      const signInDiv: any = document.getElementById("signInDiv");
      signInDiv.hidden = true;

    }
    else {
      toast({
        title: "Auth Error",
        description: "Only szabist.pk email id's allowed",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true
      })
    }
  }
  function signOut(event: React.MouseEvent<HTMLButtonElement>) {
    setUser({} as TypeUser)
    const signInDiv: any = document.getElementById("signInDiv");
    signInDiv.hidden = false;
  }
  useEffect(() => {
    /* global google */
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: "187188309585-q16trkm21nc4305m7u87q7c0d6bpb74s.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });
    // @ts-ignore
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {
        theme: "outline", size: "larger"
      }
    );
  }, [])

  return (

    <Stack alignItems={'center'} justifyContent={'center'} height={'100vh'} width={'100%'}>
      <Stack id="signInDiv"></Stack>
      {Object.keys(user).length != 0 &&
        <Button onClick={(e) => { signOut(e) }}>Sign Out</Button>
      }
    </Stack>
  )
}

export default Login
