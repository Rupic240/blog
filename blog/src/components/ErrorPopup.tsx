import { Alert, AlertDescription } from "@/components/ui/alert";

interface ErrorPopupProp {
    text: string
}

export default function ErrorPopup({ text }: ErrorPopupProp) {
    return (
        <Alert>
            <AlertDescription>{text}</AlertDescription>
        </Alert>
    )
}
