import { ReactEventHandler, useState } from 'react'
import { ChatAppLogo } from '@/assets'
import LoginImg from '@/assets/LoginImg'
import SignUpImg from '@/assets/SignUpImg'

export default function Login() {
  const [signupPage, setSignupPage] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [signupError, setSignupError] = useState(false)
  const [loginError, setLoginError] = useState(false)

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault()
    const data = {
      username,
      email,
      password,
    }
    setIsPending(true)

    //signup
    if (signupPage) {
      try {
        console.log('signed up')
        setIsPending(false)
      } catch (err: any) {
        setSignupError(err.message)
        console.log(signupError)
        setIsPending(false)
      }
    } else {
      //login
      try {
        console.log('logged in')
        setIsPending(false)
      } catch (err: any) {
        setLoginError(err.message)
        console.log(loginError)
        setIsPending(false)
      }
    }
    console.log(data)
  }

  return (
    <div className="grid grid-cols-2 content-center justify-items-center gap-20 p-20">
      <div className="col-span-full flex justify-center gap-6">
        <ChatAppLogo />
        <p className="text-6xl font-extrabold">Eagle Talk</p>
      </div>

      <form
        onSubmit={submitHandler}
        className="flex w-fit flex-col flex-wrap content-center gap-5 rounded border-2 bg-light-secondary p-12 shadow"
      >
        <p className="text-center text-4xl font-semibold">
          {signupPage ? 'Sign Up' : 'Log In'}
        </p>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </div>
        {signupPage && (
          <div>
            <label htmlFor="username">Display Name:</label>
            <input
              id="username"
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
            />
          </div>
        )}
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />

          <div className="">
            <input
              id="passwordCheckBox"
              type="checkbox"
              onClick={() => setShowPassword((prev) => !prev)}
            />
            <label htmlFor="passwordCheckBox">Show password</label>
          </div>
        </div>

        {/* **********************LOGIN BUTTONS********************** */}
        <div className="">
          {signupPage && (
            <button type="submit">
              {isPending ? 'Authenticating...' : 'Sign Up'}
            </button>
          )}
          {!signupPage && (
            <button type="submit">
              {isPending ? 'Authenticating...' : 'Log In'}
            </button>
          )}
          <p>or</p>
          <button type="button" onClick={() => setSignupPage((prev) => !prev)}>
            {!signupPage ? 'Sign Up' : 'Log In'}
          </button>
        </div>
        {/* **********************ERROR MESSAGES********************** */}
        {signupError && <p className="">{signupError}</p>}
        {loginError && <p className="">{loginError}</p>}
      </form>

      {signupPage && <SignUpImg />}
      {!signupPage && <LoginImg />}
    </div>
  )
}
