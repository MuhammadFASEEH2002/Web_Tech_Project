import { useEffect, useState } from 'react'
// @ts-ignore
import { jwtDecode } from 'jwt-decode'
import {
  Stack,
  Button,
  Box,
  useToast
} from "@chakra-ui/react";


function Login() {
  const toast = useToast()
  type user = {
    name: String,
    email: String,
    hd: String,
  };
  const [user, setUser] = useState<user>(Object)
  function handleCallbackResponse(response: any) {

    console.log(jwtDecode(response.credential))

    if (jwtDecode(response.credential).hd === "szabist.pk") {
      toast({
        title: "Login Successful",
        status: "success",
        position: "top",
        duration: 5000,
        isClosable: true
      })
      setUser(jwtDecode(response.credential));
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
    setUser({} as user)
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

      <Stack alignItems={'center'} justifyContent={'center'} height={'100%'} width={'100%'}>
        <Stack id="signInDiv"></Stack>
        {
          user && <Stack>
            <Box>{user.name}</Box>
            <Box>{user.email}</Box>
          </Stack>
        }
        {Object.keys(user).length != 0 &&
          <Button onClick={(e) => { signOut(e) }}>Sign Out</Button>
        }
      </Stack>
  )
}

export default Login
