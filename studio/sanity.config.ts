import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const SINGLETON_TYPES = new Set(['about', 'siteSettings'])

export default defineConfig({
  name: 'default',
  title: 'Grham Tiles',

  // Read from studio/.env.local (SANITY_STUDIO_* is the prefix Sanity's
  // Vite build inlines into the Studio bundle) with these values as the
  // fallback so the Studio still works if that file is ever missing.
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '6rmlud2u',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

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
