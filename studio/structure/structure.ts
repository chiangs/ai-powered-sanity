import {StructureResolver} from 'sanity/structure'
import {DocumentTextIcon, TagIcon, UserIcon, PinIcon} from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content Management')
    .items([
      // Content Section
      S.listItem()
        .title('Content')
        .child(
          S.list()
            .title('Content')
            .items([
              S.listItem()
                .title('Posts')
                .icon(DocumentTextIcon)
                .child(S.documentTypeList('post').title('Posts')),

              S.listItem()
                .title('Block Content')
                .child(S.documentTypeList('blockContent').title('Block Content')),
            ]),
        ),

      S.divider(),

      // Metadata Section
      S.listItem()
        .title('Metadata')
        .child(
          S.list()
            .title('Metadata')
            .items([
              S.listItem()
                .title('Categories')
                .icon(TagIcon)
                .child(S.documentTypeList('category').title('Categories')),

              S.listItem()
                .title('Locations')
                .icon(PinIcon)
                .child(S.documentTypeList('location').title('Locations')),

              S.listItem()
                .title('People')
                .icon(UserIcon)
                .child(S.documentTypeList('person').title('People')),
            ]),
        ),
    ])
