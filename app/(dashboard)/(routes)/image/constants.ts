import * as z from "zod";
export const formSchema = z.object({
  prompt: z.string().min(1, { message: "Prompt is required" }),
  amount: z.string().min(1, { message: "Amount is required" }),
  resolution: z.string().min(1, { message: "Resolution is required" }),
});

export const amountOptions = [
  {
    value: "1",
    label: "1",
  },
  {
    value: "2",
    label: "2",
  },
  {
    value: "3",
    label: "3",
  },
  {
    value: "4",
    label: "4",
  },
];

export const resolutionOptions = [
  {
    value: "256x256",
    label: "256",
  },
  {
    value: "512x512",
    label: "512",
  },
  {
    value: "1024x1024",
    label: "1024",
  },
];
