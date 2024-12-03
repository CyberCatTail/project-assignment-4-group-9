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

export default function Profile({ user, handleClose, onSubmit, ...props }) {

    const formSchema = z.object({
        password: z.string().min(5, {
            message: "Password must be at least 5 characters.",
        }).max(20, {
            message: "Password must be at most 20 characters.",
        }),
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
        },
    })
    return (
        <Card {...props}>
            <CardHeader className="space-y-1">
                <Button variant="ghost" className="absolute top-0 right-0 m-3" onClick={handleClose}>X</Button>
            </CardHeader>
            <CardContent className="grid gap-4">
                <p>Hello {user.email}!</p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                        <Button>Change Password</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
