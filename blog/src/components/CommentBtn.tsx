import { MessageSquareIcon } from "lucide-react"
import { Button } from "./ui/button"

interface CommentBtnProps {
    item: {
        comments: any[]
    },
    comment: boolean
}

export default function CommentBtn({ item, comment }: CommentBtnProps) {
    return (
        <div className="flex items-center">
            {
                !comment && (
                    <Button
                        variant={null}
                    >
                        <MessageSquareIcon className="text-blue-600"/>
                        <p>{ item.comments.length }</p>
                    </Button>
                )
            }
        </div>
    )
}
