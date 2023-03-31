export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'array',
      of: [{ type:'image' }],
      options: {
        hotspot: true,
      }
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string'
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength : 90,
      }
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'Colors',
      title: 'Colors',
      type: 'array',
      of: [{type:'string'}]
    },
    {
      name: 'details',
      title: 'Details',
      type: 'string',
    }
  ] 
}