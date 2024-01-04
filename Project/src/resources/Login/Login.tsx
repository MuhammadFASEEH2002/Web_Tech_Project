import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import {
  HStack,
  Heading,
  Stack,
  Text,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  Box
} from "@chakra-ui/react";


function Login() {
  type user = {
    name: String,
    email: String,
    hd: String,
  };
  const [user, setUser] = useState<user>(Object)
  function handleCallbackResponse(response: any) {
    // console.log(response.credential)

    // console.log(userObject);
    console.log(jwtDecode(response.credential).hd)
    if(jwtDecode(response.credential).hd ==="szabist.pk"){
      setUser(jwtDecode(response.credential));
      const signInDiv = document.getElementById("signInDiv");
      signInDiv.hidden = true;
      
    }
    else{
      console.log("not a szabist user")
    }
  }
  function signOut(event: React.MouseEvent<HTMLButtonElement>) {
    setUser({} as user)
    const signInDiv = document.getElementById("signInDiv");
      signInDiv.hidden = false;

  }
  useEffect(() => {
    /*global google */
    google.accounts.id.initialize({
      client_id: "187188309585-q16trkm21nc4305m7u87q7c0d6bpb74s.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {
        theme: "outline", size: "larger"
      }
    );
  }, [])

  return (
    <>
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
    </>
  )
}

export default Login
