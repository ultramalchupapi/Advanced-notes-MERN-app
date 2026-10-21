import api from '../utils/api'
import { useAuthContext } from './useAuthContext'
import { useState } from 'react'

export const useLogin = () => {
    const { dispatch } = useAuthContext()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const login = async ({ email, password }) => {
        setIsLoading(true)
        setError(null)

        try {
            const { data } = await api.post(`/api/user/login`, { email, password })

            if (!data.token) {
                throw new Error('The server did not return an authentication token')
            }

            const user = { email: data.user, token: data.token }
            localStorage.setItem('token', data.token)
            localStorage.setItem('email', data.user)
            dispatch({ type: "LOGIN", payload: user })
            return true
        } catch (error) {
            setError(error.response?.data?.error || error.message || 'Login failed')
            return false
        } finally {
            setIsLoading(false)
        }
    }

    return { login, isLoading, error }
}