import LoginForm from "../components/LoginForm"
import NavBar from "../components/NavBar"

function Login() {
  return (
    <div>
        <NavBar/>
        <LoginForm header="Login" loadingState="Logging in..."/>
    </div>
  )
}

export default Login
