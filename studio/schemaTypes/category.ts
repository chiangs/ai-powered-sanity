import {defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons'

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  description: 'Content categories for organizing and filtering posts and other content',
  icon: TagIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
    {
      name: 'settings',
      title: 'Settings',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'content',
      options: {
        list: [
          {title: 'Business', value: 'Business'},
          {title: 'Design', value: 'Design'},
          {title: 'Hardware', value: 'Hardware'},
          {title: 'Lifestyle', value: 'Lifestyle'},
          {title: 'Technology', value: 'Technology'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required().error('Category title is required for organization'),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      hidden: ({document}) => !document?.title,
      validation: (Rule) =>
        Rule.required()
          .error('Slug is required for URL generation')
          .custom((slug) => {
            if (!slug || !slug.current) {
              return 'Slug must be generated from the title'
            }
            return true
          }),
    }),
    defineField({
      name: 'description',
      type: 'text',
      group: 'content',
      description: 'Brief description of what this category represents',
      validation: (Rule) =>
        Rule.required()
          .min(10)
          .max(100)
          .error('Description is required and should be between 10-100 characters and be concise'),
    }),
    defineField({
      name: 'color',
      type: 'string',
      options: {
        list: [
          {title: 'Red', value: 'red'},
          {title: 'Blue', value: 'blue'},
          {title: 'Green', value: 'green'},
          {title: 'Purple', value: 'purple'},
          {title: 'Orange', value: 'orange'},
        ],
        layout: 'radio',
      },
      description: 'Color theme for this category in the interface',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title,
        subtitle: subtitle || 'No description',
        media: TagIcon,
      }
    },
  },
})
