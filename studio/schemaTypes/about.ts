import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'about',
  title: 'About page',
  type: 'document',
  // Singleton: pinned directly in the Studio's desk structure (see
  // sanity.config.ts) so editors land on the one existing document
  // instead of a "create new" list.
  fields: [
    defineField({
      name: 'storyEyebrow',
      title: 'Story — eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'storyTitle',
      title: 'Story — heading',
      type: 'string',
    }),
    defineField({
      name: 'storyBody',
      title: 'Story — body',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'workshopEyebrow',
      title: 'Workshop — eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'workshopTitle',
      title: 'Workshop — heading',
      type: 'string',
    }),
    defineField({
      name: 'workshopBody',
      title: 'Workshop — body',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'team',
      title: 'Team',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'teamMember',
          fields: [
            defineField({name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'role', title: 'Role', type: 'string'}),
            defineField({
              name: 'initials',
              title: 'Initials',
              description: 'Shown in the avatar circle until a real photo is uploaded.',
              type: 'string',
              validation: (rule) => rule.max(2),
            }),
            defineField({name: 'photo', title: 'Photo', type: 'image', options: {hotspot: true}}),
          ],
          preview: {select: {title: 'name', subtitle: 'role', media: 'photo'}},
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'About page'}),
  },
})
