import {
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface DialogBoxProps {
    question: string,
    open: string
}

export default function DialogBox({ open, question }: DialogBoxProps) {
  return (
      <>
          <DialogTrigger>{open}</DialogTrigger>
          <DialogContent>
              <DialogHeader>
                  <DialogTitle>{question}</DialogTitle>
              </DialogHeader>
          </DialogContent>
      </>

  )
}
