import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const tlsx = (...classes: ClassValue[]) => twMerge(clsx(...classes));
