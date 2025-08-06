import {defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons'

export const personType = defineType({
  name: 'person',
  title: 'Person',
  type: 'document',
  icon: UserIcon,
  groups: [
    {
      name: 'basic',
      title: 'Basic Information',
      default: true,
    },
    {
      name: 'contact',
      title: 'Contact Details',
    },
    {
      name: 'content',
      title: 'Content & Bio',
    },
  ],
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      group: 'basic',
      validation: (Rule) => Rule.required().error('Name is required for person identification'),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'basic',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Slug is required for URL generation'),
    }),
    defineField({
      name: 'role',
      type: 'string',
      group: 'basic',
      description: 'The role or occupation of the person (e.g., Author, Editor, Contributor, etc.)',
      validation: (Rule) => Rule.required().error("Role is required to identify person's function"),
    }),
    defineField({
      name: 'image',
      type: 'image',
      group: 'basic',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'email',
      type: 'string',
      group: 'contact',
      validation: (Rule) => Rule.email().warning('Please enter a valid email address'),
    }),
    defineField({
      name: 'socialLinks',
      type: 'array',
      group: 'contact',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              type: 'string',
              options: {
                list: [
                  {title: 'Twitter', value: 'twitter'},
                  {title: 'LinkedIn', value: 'linkedin'},
                  {title: 'GitHub', value: 'github'},
                  {title: 'Instagram', value: 'instagram'},
                  {title: 'Website', value: 'website'},
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              type: 'url',
              validation: (Rule) => Rule.required().uri({scheme: ['http', 'https']}),
            }),
          ],
          preview: {
            select: {
              platform: 'platform',
              url: 'url',
            },
            prepare({platform, url}) {
              return {
                title: platform,
                subtitle: url,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'bio',
      type: 'array',
      group: 'content',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
        },
      ],
      validation: (Rule) =>
        Rule.warning('Consider adding a bio to provide context about this person'),
    }),
    defineField({
      name: 'status',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          {title: 'Active', value: 'active'},
          {title: 'Inactive', value: 'inactive'},
          {title: 'Guest', value: 'guest'},
        ],
        layout: 'radio',
      },
      initialValue: 'active',
      description: 'Current status of this person in the organization',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
      status: 'status',
    },
    prepare(selection) {
      const {title, subtitle, media, status} = selection
      const statusEmoji: Record<string, string> = {
        active: '🟢',
        inactive: '🔴',
        guest: '👤',
      }
      return {
        title,
        subtitle: subtitle ? `${statusEmoji[status] || ''} ${subtitle}` : status,
        media: media || UserIcon,
      }
    },
  },
})
