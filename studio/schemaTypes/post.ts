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
        'Rich text. Use the toolbar for headings (H2/H3), bold/italic and links, and the ' +
        '"+" button to drop in an inline photo wherever it belongs in the text.',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading', value: 'h2'},
            {title: 'Subheading', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bulleted list', value: 'bullet'},
            {title: 'Numbered list', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (rule) => rule.uri({scheme: ['http', 'https', 'mailto']}),
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          title: 'Inline photo',
          options: {hotspot: true},
          fields: [
            {name: 'alt', type: 'string', title: 'Alt text', description: 'For screen readers and SEO.'},
            {name: 'caption', type: 'string', title: 'Caption (optional)'},
          ],
        },
      ],
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
