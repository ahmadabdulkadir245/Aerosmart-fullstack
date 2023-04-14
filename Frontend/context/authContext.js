import axios from 'axios';
import {createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    let user
    useEffect(() => {
      // Perform localStorage action
       user = localStorage.getItem('user')
    }, [])
    // if (typeof window !== 'undefined') {
    //     // Access localStorage here
    //     const user = JSON.parse(localStorage.getItem('user'));
    //   }
    const [currentUser, setCurrenctUser] = useState(user || null);
    const [authToken, setAuthToken] = useState(null)

    const login = async (inputs) => {
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
              email: inputs.email,
              password: inputs.password,
            }
          };
        const res = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_URL, graphqlQuery)
        console.log(res.data)
    setCurrenctUser(res.data)
    setAuthToken(res.data.data.login.token)
    }

    const logout = async () => {
     await axios.post(process.env.NEXT_PUBLIC_LOGOUT_URL)
    setCurrenctUser(null)
    }

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser))
    }, [currentUser])
    
    return  (
    <AuthContext.Provider value={{currentUser, login, logout, authToken}}>{children}
    </AuthContext.Provider>)
}

