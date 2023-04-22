import axios from 'axios';
import { useRouter } from "next/router";
import {createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
  const router = useRouter()
    let user
    useEffect(() => {
      // Perform localStorage action
       user = localStorage.getItem('user')

    }, [])
    const [currentUser, setCurrenctUser] = useState(user || null);
    const [userId, setUserId] = useState(null)
    const [authToken, setAuthToken] = useState(null)

    const login = async (inputs, setInputs, setError, setLoading) => {
      try{
        const graphqlQuery = {
            query: `
            query Login($email: String!, $password: String!)  {
                login(email: $email, password: $password) {
                    token
                    userId
              }
            }
            `,
            variables: {
              email: (inputs.email).toString(),
              password: inputs.password,
            }
          };
        const res = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_URL, graphqlQuery)
        router.push('/')
        // router.back()
        setLoading(false)
        setInputs({
          email: '',
          password: '',
        })
        setUserId(res.data.data.login.userId)
        setAuthToken(res.data.data.login.token)
        localStorage.setItem('token', res.data.data.login.token);
        localStorage.setItem('userId', res.data.data.login.userId);
       }catch(err) {
        setLoading(false)
         setError(err.response.data.errors[0].message)
         setTimeout(() => {
           setError(null)
        }, 5000)
        }
    }

    const logout = async () => {
    //  await axios.post(process.env.NEXT_PUBLIC_LOGOUT_URL)
    localStorage.clear()
    setAuthToken(null)
    setUserId(null)
      return
    }

    useEffect(() => {
      setUserId(localStorage.getItem('userId'))
      setAuthToken(localStorage.getItem('token'))
      localStorage.setItem('user', JSON.stringify(currentUser))
    }, [currentUser, authToken, userId])
    
    return  (
    <AuthContext.Provider value={{currentUser, login, logout, authToken, userId}}>{children}
    </AuthContext.Provider>)
}

