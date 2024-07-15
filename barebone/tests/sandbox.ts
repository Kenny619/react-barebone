import { z } from "zod";

const str = "https://www.google.com";
const regex = /^https?:\/\/.*/;
const result = z.string().regex(regex);

console.log(result);