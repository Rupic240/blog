import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { postLogin, postLoginType } from "@/lib/fetcher";
import { useRef, useState } from "react";
import { useMutation } from "react-query";
import { useTheme } from "@/contexts/theme-provider";
import ErrorPopup from "@/components/ErrorPopup";

export default function Login() {

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setAuth } = useTheme();

  const handleSubmit = () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      setError('username and password required');
      return false;
    }

    login.mutate({ username, password });
  }

  const login = useMutation(async (data: postLoginType) => postLogin(data), {
    onError: async () => {
      setError('Incorrect username or password.')
    },
    onSuccess: async result => {
      setAuth(result.user)
      localStorage.setItem('token', result.token);
      navigate('/');
    }
  })

  return (
    <>
      <h1 className="text-5xl max-md:text-2xl font-semibold mb-10">Login</h1>

      {error && <ErrorPopup text={error} />}

      <form
        className="flex flex-col gap-5 items-center mt-5"
        onSubmit={e => {
          e.preventDefault();
          handleSubmit();
        }}  
      >
        <Input
          required
          type="text"
          className="py-5 px-4 h-14"
          placeholder="Username"
          ref={usernameRef}
        />
        <Input
          required
          type="password"
          className="py-5 px-4 h-14"
          placeholder="Password"
          ref={passwordRef}
        />
        <Button
          type="submit"
          className="w-full h-12 mb-3"
        >
          Login
        </Button>

        <Link to='/register' className="text-blue-700 hover:text-blue-600 text-lg">Register</Link>

      </form>
    </>
  )
}
