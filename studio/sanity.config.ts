import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'

import {schemaTypes} from './schemaTypes'
import {structure, defaultDocumentNode} from './structure'

export default defineConfig({
  name: 'default',
  title: 'My Custom Keeb Shop',

  projectId: 'fyrb2qru',
  dataset: 'production',

  plugins: [structureTool({structure, defaultDocumentNode}), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
