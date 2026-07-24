import {defineField, defineType} from 'sanity'
import {OXIDE_SWATCH_OPTIONS} from './oxideSwatches'

export default defineType({
  name: 'project',
  title: 'Portfolio project',
  type: 'document',
  fields: [
    defineField({
      name: 'project',
      title: 'Project title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'project'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'tiles',
      title: 'Tiles used',
      description:
        'Plain names, not linked references — a project can name a tile that isn\'t in the current catalog. ' +
        'The site resolves each name to a tile page when it can and renders plain text otherwise.',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Main photo',
      description: 'Falls back to the color swatch below when not set.',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      description: 'Extra photos for the detail-page stack (the main photo above is always first).',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
    defineField({
      name: 'swatch',
      title: 'Swatch (placeholder color)',
      type: 'string',
      options: {list: OXIDE_SWATCH_OPTIONS},
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'project', subtitle: 'location', media: 'image'},
  },
})
