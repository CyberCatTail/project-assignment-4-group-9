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

import {ParsePrice} from "@/lib/utils"

function PaymentCard({products, ...props}) {
  let Subtotal = 0;
  let Discount = 0;
  let Tax = 0;
  let Total = 0;
  // products.foreach{}
  for (const product of products) {
    Subtotal += product.price/10.0;
  };

  Tax = Subtotal * 0.15;
  Total = Subtotal + Tax - Discount;

  Subtotal = ParsePrice(Subtotal);
  Discount = ParsePrice(Discount);
  Tax      = ParsePrice(Tax);
  Total    = ParsePrice(Total);
 
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
        <CardDescription>
          Add a new payment method to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-4">
          <div>
            <RadioGroupItem value="card" id="card" className="peer sr-only" />
            <Label
              htmlFor="card"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <CreditCardIcon className="size-12"/>
              Card
            </Label>
          </div>
        </RadioGroup>
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="First Last" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="number">Card number</Label>
          <Input id="number" placeholder="" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="month">Expires</Label>
            <Select>
              <SelectTrigger id="month">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">January</SelectItem>
                <SelectItem value="2">February</SelectItem>
                <SelectItem value="3">March</SelectItem>
                <SelectItem value="4">April</SelectItem>
                <SelectItem value="5">May</SelectItem>
                <SelectItem value="6">June</SelectItem>
                <SelectItem value="7">July</SelectItem>
                <SelectItem value="8">August</SelectItem>
                <SelectItem value="9">September</SelectItem>
                <SelectItem value="10">October</SelectItem>
                <SelectItem value="11">November</SelectItem>
                <SelectItem value="12">December</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="year">Year</Label>
            <Select>
              <SelectTrigger id="year">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }, (_, i) => (
                  <SelectItem key={i} value={`${new Date().getFullYear() + i}`}>
                    {new Date().getFullYear() + i}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cvc">CVC</Label>
            <Input id="cvc" placeholder="CVC" />
          </div>
        </div>
        <ul className="text-gray-800 mt-8 space-y-4">
            <li className="flex flex-wrap gap-4 text-sm">Subtotal <span className="ml-auto font-bold">{Subtotal}</span></li>
            <li className="flex flex-wrap gap-4 text-sm">Discount <span className="ml-auto font-bold">{Discount}</span></li>
            <li className="flex flex-wrap gap-4 text-sm">Tax <span className="ml-auto font-bold">{Tax}</span></li>
            <hr className="border-gray-300" />
            <li className="flex flex-wrap gap-4 text-sm font-bold">Total <span className="ml-auto">{Total}</span></li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Make Payment</Button>
      </CardFooter>
    </Card>
  )
}

export default PaymentCard;