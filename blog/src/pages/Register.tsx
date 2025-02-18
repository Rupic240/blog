import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useMutation } from "react-query";
import { useTheme } from "@/contexts/theme-provider";
import { postUser, postUserType } from "@/lib/fetcher";
import ErrorPopup from "@/components/ErrorPopup";

export default function Register() {


  const { setGlobalMsg } = useTheme();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const bioRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const name = nameRef.current?.value;
    const username = usernameRef.current?.value;
    const bio = bioRef.current?.value;
    const password = passwordRef.current?.value;

    if (!name || !username || !password) {
      setError('name, username and password required');
      return false;
    }

    create.mutate({name, username, bio, password});
  }

  const create = useMutation(async (data: postUserType) => postUser(data), {
    onError: async () => {
      setError('Cannot create account');
    },
    onSuccess: async _ => {
      setGlobalMsg('Account created.')
      navigate('/login')
    }
  })

  return (
    <div>
      <h1 className="text-5xl max-md:text-2xl font-semibold mb-10">Register</h1>
      
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
          placeholder="Name"
          ref={nameRef}
        />
        <Input
          required
          type="text"
          className="py-5 px-4 h-14"
          placeholder="Username"
          ref={usernameRef}
        />
        <Input
          type="text"
          className="py-5 px-4 h-14"
          placeholder="Bio"
          ref={bioRef}
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
          Register
        </Button>

        <Link to='/login' className="text-blue-700 hover:text-blue-600 text-lg">Login</Link>

      </form>

    </div>
  )
}
