import {defineField, defineType} from 'sanity'
import {OXIDE_SWATCH_OPTIONS} from './oxideSwatches'

export default defineType({
  name: 'tile',
  title: 'Tile',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Flooring', value: 'flooring'},
          {title: 'Paving', value: 'paving'},
          {title: 'Oxide finish', value: 'oxide'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'categoryLabel',
      title: 'Category label',
      description: 'Short descriptive tag shown under the size/material line, e.g. "Courtyard classic".',
      type: 'string',
    }),
    defineField({
      name: 'spec',
      title: 'Size · material',
      description: 'e.g. 8" × 8" · Cement oxide',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'thickness',
      title: 'Thickness',
      description: 'e.g. 18–20 mm. Leave blank to use the site default (18–20 mm).',
      type: 'string',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      description: 'One line, shown as the meta description on the tile detail page.',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      description: 'Main product photo. Falls back to the color swatch below when not set.',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      description: 'Extra photos for the detail-page slider (the main photo above is always slide one).',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
    defineField({
      name: 'swatch',
      title: 'Swatch (placeholder color)',
      description: 'Used as the card thumbnail color until a real photo is uploaded above.',
      type: 'string',
      options: {list: OXIDE_SWATCH_OPTIONS},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'swatches',
      title: 'Swatches (placeholder slider colors)',
      description: 'Used as slider slide colors until real gallery photos are uploaded above.',
      type: 'array',
      of: [{type: 'string', options: {list: OXIDE_SWATCH_OPTIONS}}],
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'spec', media: 'image'},
  },
})
