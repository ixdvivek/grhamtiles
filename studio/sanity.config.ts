import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const SINGLETON_TYPES = new Set(['about', 'siteSettings'])

export default defineConfig({
  name: 'default',
  title: 'Grham Tiles',

  projectId: '6rmlud2u',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('About page')
              .id('about')
              .child(S.document().schemaType('about').documentId('about')),
            S.listItem()
              .title('Site settings')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => item.getId() && !SINGLETON_TYPES.has(item.getId() as string),
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    // Hide About/Site settings from the generic "create new" document
    // picker — they're singletons, reached only via the pinned items above.
    templates: (templates) => templates.filter(({schemaType}) => !SINGLETON_TYPES.has(schemaType)),
  },
})
