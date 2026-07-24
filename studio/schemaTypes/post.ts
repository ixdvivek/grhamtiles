import {defineField, defineType} from 'sanity'
import {OXIDE_SWATCH_OPTIONS} from './oxideSwatches'

export default defineType({
  name: 'post',
  title: 'Blog post',
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
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      description: 'Shown on the blog listing card and as the meta description.',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'body',
      title: 'Body',
      description:
        'One paragraph per entry (matches the site\'s current plain-paragraph rendering — ' +
        'no rich text yet, see CLAUDE.md if that needs to change).',
      type: 'array',
      of: [{type: 'text', rows: 3}],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      description: 'Falls back to the color swatch below when not set.',
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
  ],
  orderings: [{title: 'Newest first', name: 'dateDesc', by: [{field: 'date', direction: 'desc'}]}],
  preview: {
    select: {title: 'title', subtitle: 'date', media: 'image'},
  },
})
