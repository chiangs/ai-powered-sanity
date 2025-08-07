import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  description: 'Blog posts and articles with rich content, metadata, and SEO optimization',
  icon: DocumentTextIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
    {
      name: 'meta',
      title: 'Metadata',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fieldsets: [
    {
      name: 'dates',
      title: 'Publication Dates',
      options: {
        collapsible: true,
        collapsed: false,
        columns: 2,
      },
    },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'content',
      validation: (Rule) =>
        Rule.required()
          .min(10)
          .max(80)
          .error('Title is required and should be between 10-80 characters'),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Slug is required for URL generation'),
    }),
    defineField({
      name: 'status',
      type: 'string',
      group: 'content',
      options: {
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'Published', value: 'published'},
          {title: 'Archived', value: 'archived'},
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (Rule) => Rule.required().error('Status is required for content management'),
    }),
    defineField({
      name: 'person',
      type: 'reference',
      group: 'content',
      to: [{type: 'person'}],
      validation: (Rule) => Rule.required().error('Author selection is required'),
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      group: 'content',
      description: 'Brief summary of the post content',
      validation: (Rule) =>
        Rule.required()
          .min(100)
          .max(300)
          .error(
            'Excerpt is required and should be between 100-300 characters for adequate editorial quality',
          ),
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      group: 'content',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          description: 'Alternative text for accessibility',
          validation: (Rule) => Rule.required().error('Alt text is required for accessibility'),
        }),
        defineField({
          name: 'caption',
          type: 'string',
          description: 'Optional caption for the image',
        }),
      ],
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
      group: 'content',
      validation: (Rule) => Rule.required().error('Body content is required'),
    }),
    defineField({
      name: 'categories',
      type: 'array',
      group: 'meta',
      of: [{type: 'reference', to: {type: 'category'}}],
      validation: (Rule) =>
        Rule.min(1).max(3).error('Please select 1-3 categories for proper organization'),
    }),
    defineField({
      name: 'tags',
      type: 'array',
      group: 'meta',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      validation: (Rule) =>
        Rule.max(10).warning('Consider limiting tags to 10 or fewer for better organization'),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      group: 'meta',
      fieldset: 'dates',
      validation: (Rule) => Rule.required().error('Published date is required'),
    }),
    defineField({
      name: 'updatedAt',
      type: 'datetime',
      group: 'meta',
      fieldset: 'dates',
      description: 'Date when the post was last updated',
    }),
    defineField({
      name: 'featured',
      type: 'string',
      group: 'meta',
      options: {
        list: [
          {title: 'Not Featured', value: 'not-featured'},
          {title: 'Featured', value: 'featured'},
          {title: 'Hero Post', value: 'hero'},
        ],
        layout: 'radio',
      },
      initialValue: 'not-featured',
      description: 'Feature level for homepage display',
    }),
    defineField({
      name: 'metaTitle',
      type: 'string',
      group: 'seo',
      description: 'Override the title for SEO purposes',
      validation: (Rule) =>
        Rule.max(60).warning('Meta title should be under 60 characters for optimal SEO'),
    }),
    defineField({
      name: 'metaDescription',
      type: 'text',
      group: 'seo',
      description: 'Brief description for search engines',
      validation: (Rule) =>
        Rule.max(160).warning('Meta description should be under 160 characters for optimal SEO'),
    }),
  ],
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
    {
      title: 'Published Date, Old',
      name: 'publishedAtAsc',
      by: [{field: 'publishedAt', direction: 'asc'}],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'person.name',
      media: 'mainImage',
      status: 'status',
      publishedAt: 'publishedAt',
      categories: 'categories',
      category0: 'categories.0.title',
      category0Color: 'categories.0.color',
      category1: 'categories.1.title',
      category1Color: 'categories.1.color',
      category2: 'categories.2.title',
      category2Color: 'categories.2.color',
    },
    prepare(selection) {
      const {
        title,
        author,
        media,
        status,
        publishedAt,
        category0,
        category0Color,
        category1,
        category1Color,
        category2,
        category2Color,
      } = selection
      const statusEmoji: Record<string, string> = {
        draft: '📝',
        published: '✅',
        archived: '📦',
      }
      const colorEmoji: Record<string, string> = {
        red: '🔴',
        blue: '🔵',
        green: '🟢',
        purple: '🟣',
        orange: '🟠',
      }

      const date = publishedAt ? new Date(publishedAt).toLocaleDateString() : 'No date'

      // Build category display with color indicators
      const categories = []
      if (category0) {
        categories.push(`${colorEmoji[category0Color] || '⚪'} ${category0}`)
      }
      if (category1) {
        categories.push(`${colorEmoji[category1Color] || '⚪'} ${category1}`)
      }
      if (category2) {
        categories.push(`${colorEmoji[category2Color] || '⚪'} ${category2}`)
      }

      const categoryText = categories.length > 0 ? ` • ${categories.join(', ')}` : ''

      return {
        title,
        subtitle: author
          ? `${statusEmoji[status] || ''} by ${author} • ${date}${categoryText}`
          : `${statusEmoji[status] || ''} ${date}${categoryText}`,
        media: media || DocumentTextIcon,
      }
    },
  },
})
