import { useRef } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface FormProps {
  add: (content: string) => void;
}

export default function Form({ add }: FormProps) {

  const contentRef: any = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const content = contentRef.current?.value;
    add(content);
  }

  return (
    <form
      className="mb-8 text-right"
      onSubmit={e => {
        e.preventDefault();
        handleSubmit();
        e.currentTarget.reset();
      }}
    >
      <Input
        required
        ref={contentRef}
        type="text"
        placeholder="Context"
        className="px-5 py-6 mb-3"
      />

      <Button
        type="submit"
        className="p-5 bg-blue-600 text-white border-0 hover:bg-blue-700"
      >
        Post
      </Button>
    </form>
  )
}
