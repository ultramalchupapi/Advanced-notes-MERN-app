import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { useSignup } from "../hooks/useSignup"
import { Link } from "react-router-dom"

const LoginForm = ({ header, loadingState, isSignup = false }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const loginState = useLogin()
    const signupState = useSignup()
    const { login, isLoading, error } = loginState
    const { signup, isLoading: isSignupLoading, error: signupError } = signupState

    const loginSignupUser = async (event) => {
        event.preventDefault()
        const succeeded = isSignup
            ? await signup({ email, password })
            : await login({ email, password })
        if (succeeded) {
            setEmail('')
            setPassword('')
        }
    }

    return (
        <form onSubmit={loginSignupUser} className="flex m-auto mt-20 card bg-success-content p-5 max-w-sm  sm:max-w-lg w-full">
            <h1 className="text-3xl font-bold text-center tracking-tight text-neutral-content pb-4">{header}</h1>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    type="email"
                    value={email}
                    className="input outline-none mt-1 focus:border-neutral-content mb-10 w-full"
                    placeholder="e.g tammy@gmail.com"
                />

                <label htmlFor="password">password:</label>
                <input
                    id="password"
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input focus:border-neutral-content outline-none  mt-1 mb-3 w-full "
                    placeholder="e.g Test123!"
                />

                {(isSignup ? signupError : error) && (
                    <div className="flex mt-2 btn btn-soft btn-error">
                        {isSignup ? signupError : error}
                    </div>
                )}

                <div className="justify-center ml-3 text-neutral-content">
                    {isSignup ? (
                        <>
                            Already have an account? <Link to="/login" className="link">Login</Link>
                        </>
                    ) : (
                        <>
                            Don't have an account? <Link to="/signup" className="link">Sign up</Link>
                        </>
                    )}
                </div>

                <div className="flex justify-end">
                    <button
                        disabled={isSignup ? isSignupLoading : isLoading}
                        type="submit"
                        className="btn mt-5 w-fit text-neutral-content bg-info-content border-neutral-content">
                        {(isSignup ? isSignupLoading : isLoading) ? loadingState : header}
                    </button>
                </div>



            </div>
        </form>
    )
}

export default LoginForm
