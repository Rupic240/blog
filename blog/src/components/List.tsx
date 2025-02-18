import { ReactNode } from "react"

interface ListProps {
    children: ReactNode;
}

export default function List({ children }: ListProps) {
  return (
    <ul className="pb-10 transition-all duration-300 animate-fade_in list-none rounded-md overflow-hidden">
        {children}
    </ul>
  )
}
