import { ReactEventHandler, useState } from 'react'
import { ChatAppLogo } from '@/assets'
import LoginImg from '@/assets/LoginImg'
import SignUpImg from '@/assets/SignUpImg'

const imgClasses = 'h-80'

export default function Login() {
  const [signupPage, setSignupPage] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [signupError, setSignupError] = useState(false)
  const [loginError, setLoginError] = useState(false)

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault()
    const data = {
      username,
      email,
      // password,
    }
    setIsPending(true)

    //signup
    if (signupPage) {
      try {
        await fetch('http://127.0.0.1:8000/api/users/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            email,
          }),
        })
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
    <div className="grid grid-cols-2 content-center gap-y-20 p-20">
      <div className="col-span-full flex justify-center gap-6">
        <ChatAppLogo />
        <p className="text-6xl font-extrabold">Eagle Talk</p>
      </div>

      <form
        onSubmit={submitHandler}
        className="flex h-fit w-full flex-col flex-wrap content-center gap-5 rounded border-2 bg-light-secondary p-12 shadow"
      >
        <p className="text-center text-4xl font-semibold">
          {signupPage ? 'Sign Up' : 'Log In'}
        </p>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            className="rounded-md border-2 border-solid border-black bg-transparent"
          />
        </div>
        {signupPage && (
          <div className="flex flex-col gap-1">
            <label htmlFor="username">Display Name:</label>
            <input
              id="username"
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
              className="rounded-md border-2 border-solid border-black bg-transparent"
            />
          </div>
        )}
        {/* password */}
        {/* <div className="flex flex-col gap-1">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            className="rounded-md border-2 border-solid border-black bg-transparent"
          />

          <div className="">
            <input
              id="passwordCheckBox"
              type="checkbox"
              onClick={() => setShowPassword((prev) => !prev)}
            />
            <label htmlFor="passwordCheckBox">Show password</label>
          </div>
        </div> */}

        {/* **********************LOGIN BUTTONS********************** */}
        <div className="border-black text-center">
          {signupPage && (
            <button
              type="submit"
              className="rounded-md border-2 border-solid border-black p-1"
            >
              {isPending ? 'Authenticating...' : 'Sign Up'}
            </button>
          )}
          {!signupPage && (
            <button
              type="submit"
              className="rounded-md border-2 border-solid border-black p-1"
            >
              {isPending ? 'Authenticating...' : 'Log In'}
            </button>
          )}
          <p className="r">or</p>
          <button
            className="border-b border-solid border-black"
            type="button"
            onClick={() => setSignupPage((prev) => !prev)}
          >
            {!signupPage ? 'Sign Up' : 'Log In'}
          </button>
        </div>
        {/* **********************ERROR MESSAGES********************** */}
        {signupError && <p className="">{signupError}</p>}
        {loginError && <p className="">{loginError}</p>}
      </form>

      {signupPage && <SignUpImg classes={imgClasses} />}
      {!signupPage && <LoginImg classes={imgClasses} />}
    </div>
  )
}
