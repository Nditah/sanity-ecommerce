import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
    projectId: `${process.env.NEXT_PUBLIC_SANITY_PROJECTID}`,
    dataset: 'production',
    apiVersion: '2023-02-08',
    useCdn: true,
    token: `${process.env.NEXT_PUBLIC_SANITY_API_TOKEN}`,
})

const builder = imageUrlBuilder(client)

export const urlFor = (source: any) => builder.image(source)
