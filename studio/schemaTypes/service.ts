import {defineField, defineType} from 'sanity'
import {OXIDE_SWATCH_OPTIONS} from './oxideSwatches'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      description: 'Short homepage-teaser copy.',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'Long-form copy for the services page.',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'cta',
      title: 'CTA label',
      description: 'e.g. "Ask about export"',
      type: 'string',
    }),
    defineField({
      name: 'photoLabel',
      title: 'Placeholder photo caption',
      description: 'Shown over the swatch until a real photo is uploaded.',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'swatch',
      title: 'Swatch (placeholder color)',
      type: 'string',
      options: {list: OXIDE_SWATCH_OPTIONS},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
    }),
  ],
  orderings: [
    {title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'title', subtitle: 'cta', media: 'image'},
  },
})
