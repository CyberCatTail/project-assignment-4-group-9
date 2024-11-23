import * as React from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
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
import { getProduct, updateProduct } from "@/api/adminApi";

const column = [
    {
        name: 'brand',
        label: 'Brand',
    },
    {
        name: 'model',
        label: 'Model',
    },
    {
        name: 'category',
        label: 'Category',
    },
    {
        name: 'inches',
        label: 'Inches',
    },
    {
        name: 'screen_resolution',
        label: 'Screen Resolution',
    },
    {
        name: 'cpu',
        label: 'Cpu',
    },
    {
        name: 'ram',
        label: 'Ram',
    },
    {
        name: 'memory',
        label: 'Memory',
    },
    {
        name: 'gpu',
        label: 'GPU',
    },
    {
        name: 'op',
        label: 'OP',
    },
    {
        name: 'weight',
        label: 'Weight(kg)',
    },
    {
        name: 'price',
        label: 'Price(cent)',
    },
    {
        name: 'img',
        label: 'Img',
    },
    {
        name: 'stock.quantity',
        label: 'Quantity',
    },
]

export default function AdminProductForm() {
    const formSchema = z.object({
        brand: z.string().min(1).refine(async (val) => val.toUpperCase()),
        model: z.string().min(1),
        category: z.string().min(1),
        inches: z.string().min(1),
        screen_resolution: z.string().min(1),
        cpu: z.string().min(1),
        ram: z.string().min(1),
        memory: z.string().min(1),
        gpu: z.string().min(1),
        op: z.string().min(1),
        weight: z.coerce.number().nonnegative().transform(v => `${v}kg`),
        price: z.string().regex(/^[1-9]\d*$/, "Value must be a positive integer"),
        img: z.string().min(1),
        stock: z.object({
            quantity: z.coerce.number().int().nonnegative(),
        })
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            brand: '',
            model: '',
            category: '',
            inches: '',
            screen_resolution: '',
            cpu: '',
            ram: '',
            memory: '',
            gpu: '',
            op: '',
            weight: 0,
            price: BigInt(0),
            img: '',
            stock: {
                quantity: 0
            }
        }
    })

    const { action, id } = useParams();

    const parse = (data) => {
        const {
            brand,
            model,
            category,
            inches,
            screen_resolution,
            cpu,
            ram,
            memory,
            gpu,
            op,
            weight,
            price,
            img,
            stock: { quantity }
        } = data;
        return {
            brand,
            model,
            category,
            inches,
            screen_resolution,
            cpu,
            ram,
            memory,
            gpu,
            op,
            weight: parseFloat(weight),
            price,
            img,
            stock: { quantity }
        }
    }

    React.useEffect(() => {
        if (action == "edit" && id) {
            getProduct(id).then((v) => {
                form.reset(parse(v))
            })
        }
    }, []);


    const onSubmit = (values) => {
        if (action == "edit") {
            updateProduct(id, values)
        } else if (action == "create") {

        }
    };

    return (
        <div className='w-2/3'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {
                        column.map(c => {
                            return <FormField
                                key={c.name}
                                control={form.control}
                                name={c.name}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{c.label}</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        })
                    }
                    <Button type="submit">{action === "edit" ? "Save" : "Add Product"}</Button>
                </form>
            </Form>
        </div>

    );
}
