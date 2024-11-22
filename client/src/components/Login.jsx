import * as React from "react";
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import * as authApi from "@/api/authApi";

export default function Login({ login, close, ...props }) {

    const formSchema = z.object({
        username: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }).max(10, {
            message: "Username must be at most 10 characters.",
        }),
        password: z.string().min(5, {
            message: "Password must be at least 5 characters.",
        }).max(20, {
            message: "Password must be at most 20 characters.",
        }),
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    const onSubmit = async (values) => {
        await authApi.login(values.username, values.password)
        login()
        close()
        window.location.reload();
    };

    const handleClose = () => {
        close();
    };

    return (
        <Card {...props}>
            <CardHeader className="space-y-1">
                <Button variant="ghost" className="absolute top-0 right-0 m-3" onClick={handleClose}>X</Button>
            </CardHeader>
            <CardContent className="grid gap-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className='w-full'>Login / Create Account</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
