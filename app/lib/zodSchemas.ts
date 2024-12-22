import {z} from 'zod'

export const productSchema = z.object({
    name: z.string(),
    description: z.string(),
    status: z.enum(["draft", "published", "archived"]),
    price: z.number().min(0.01),
    images: z.array(z.string()).min(1, "at least one image is required").max(10, 'cant upload more than 10 images'),
    category: z.enum([
        "boysClothing",
        "girlsClothing",
        "babyClothing",
        "shoes",
        "accessories",
        "outerwear",
        "activewear",
        "formalwear",
        "sleepwear",
        "swimwear",
        "maternityWear"
    ]),
    isFeatured: z.boolean().optional(),
})

export const bannerSchema = z.object({
    title: z.string(),
    image: z.string()
})