import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CreditCardIcon } from "@heroicons/react/24/outline";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import {ParsePrice} from "@/lib/utils"
import * as React from "react";

function PaymentCard({products, handlePaymentSubmit, ...props}) {

  let Subtotal = 0;
  let Discount = 0;
  
  for (const product of products) {
    Subtotal += product.price * product.quantity;
  };
  let SubtotalNum = Subtotal;
  let Tax = Math.floor(SubtotalNum * 0.15);
  let Total = SubtotalNum + Tax - Discount;

  let subtotalPrice  = ParsePrice(SubtotalNum);
  let discountPrice  = ParsePrice(Discount);
  let taxPrice       = ParsePrice(Tax);
  let totalPrice     = ParsePrice(Total);

  const formSchema = z.object({
    name: z.string().min(1, {
        message: "name must be at least 5 characters.",
    }).max(100, {
        message: "name must be at most 100 characters.",
    }),
    number: z.string()
    .regex(/^[0-9]+$/, { message: "Number must only contain digits 0-9." })
    .length(16, { message: "Number must be exactly 16 digits." }),
    month: z.coerce.number().int().min(1, { message: "month must be bigger than 1." }).max(12, { message: "month must be equal or lower than 12." }),
    year: z.coerce.number().int().min(2024,{ message: "year must be bigger than 2024." }),
    cvc: z.string()
    .regex(/^[0-9]+$/, { message: "CVC must only contain digits 0-9." })
    .length(3, { message: "CVC must be exactly 3 digits." })
    .transform((val) => Number(val)),
  })

  const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
          name: "",
          number: "",
          month: "",
          year: "",
          cvc:""
      },
  })

  const onSubmit = (value) => {
    handlePaymentSubmit({...value, Subtotal, Discount, Tax, Total});
    form.reset();
  }


  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
        <CardDescription>
          Input your payment account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">          
          <Label
            htmlFor="card"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <CreditCardIcon className="size-12"/>
            Card
          </Label>
        
          <div className="grid gap-2">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                      <FormControl>
                          <Input  {...field} />
                      </FormControl>
                      <FormMessage />
                  </FormItem>
                  )}
              />
          </div>
          <div className="grid gap-2">
            <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card number</FormLabel>
                      <FormControl>
                          <Input  {...field}/>
                      </FormControl>
                      <FormMessage />
                  </FormItem>
                  )}
              />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="month"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Month</FormLabel>
                      <FormControl>
                          <Input  {...field}/>
                      </FormControl>
                      <FormMessage />
                  </FormItem>
                  )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                      <FormControl>
                          <Input  {...field}/>
                      </FormControl>
                      <FormMessage />
                  </FormItem>
                  )}
              />
       
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="cvc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVC</FormLabel>
                      <FormControl>
                          <Input  {...field} />
                      </FormControl>
                      <FormMessage />
                  </FormItem>
                  )}
              />
    
            </div>
          </div>
          <ul className="text-gray-800 mt-8 space-y-4">
              <li className="flex flex-wrap gap-4 text-sm">Subtotal <span className="ml-auto font-bold">{subtotalPrice}</span></li>
              <li className="flex flex-wrap gap-4 text-sm">Discount <span className="ml-auto font-bold">{discountPrice}</span></li>
              <li className="flex flex-wrap gap-4 text-sm">Tax <span className="ml-auto font-bold">{taxPrice}</span></li>
              <hr className="border-gray-300" />
              <li className="flex flex-wrap gap-4 text-sm font-bold">Total <span className="ml-auto">{totalPrice}</span></li>
          </ul>
          <Button type="submit" className='w-full'>Make Payment</Button>
        </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default PaymentCard;