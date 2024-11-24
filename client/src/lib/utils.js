import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function ParsePrice(price){
    const amount = parseFloat(price) / 100;
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "CAD",
    }).format(amount)
    return formatted;
}