import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function convertAmountFromMiliunsits(amount:number){
  return amount/1000;
}

export function convertAmountToMiliunsits(amount:number){
  return Math.round(amount*1000)
}

export function formatCurrency(value: number) {
  const finalValue = convertAmountFromMiliunsits(value)
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(finalValue);
}
