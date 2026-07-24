import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  // Singleton: pinned directly in the Studio's desk structure (see
  // sanity.config.ts). Nav/footer link structure lives in the HTML
  // itself (it's site IA, not editorial content) — this document only
  // holds the parts that actually change: contact details, social links,
  // and the footer blurb.
  fields: [
    defineField({
      name: 'footerTagline',
      title: 'Footer tagline',
      description: 'Shown under the logo in the footer, e.g. "Handmade tiles from Kerala…"',
      type: 'text',
      rows: 2,
    }),
    defineField({name: 'phone', title: 'Phone', type: 'string'}),
    defineField({name: 'email', title: 'Email', type: 'string'}),
    defineField({name: 'address', title: 'Address', type: 'string'}),
    defineField({
      name: 'copyrightName',
      title: 'Copyright name',
      description: 'e.g. "Grham Home Decors" — the year is added automatically.',
      type: 'string',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {list: ['instagram', 'facebook', 'pinterest']},
              validation: (rule) => rule.required(),
            }),
            defineField({name: 'url', title: 'URL', type: 'url', validation: (rule) => rule.required()}),
          ],
          preview: {select: {title: 'platform', subtitle: 'url'}},
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Site settings'}),
  },
})
