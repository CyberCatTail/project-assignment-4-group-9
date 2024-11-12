import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export default function Login({isVisible, setIsVisible}) {
    const handleClose = () => {
        setIsVisible(false);
    };

    return (
        <>
            {isVisible &&
                <Card className="w-1/4 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <CardHeader className="space-y-1">
                        <Button variant="ghost" className="absolute top-0 right-0 m-3" onClick={handleClose}>X</Button>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="m@example.com" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full">Login / Create Account</Button>
                    </CardFooter>
                </Card>
            }
        </>

    )
}
