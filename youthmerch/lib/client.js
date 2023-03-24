import sanityClient from '@sanity/client';
import  imageUrlBuilder  from '@sanity/image-url';

export const client = sanityClient({
  projectId: '94z1jt5w',
  dataset: 'production',
  apiVersion: '2023-03-21',
  useCdn: true,
  token:process.env.TOKEN
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);