import NavBar from "../components/NavBar"
import LoginForm from "../components/LoginForm"

const Signup = () => {
  return (
    <div>
        <NavBar/>
        <LoginForm header="Signup" loadingState="Signing up..." isSignup />
    </div>
  )
}

export default Signup
