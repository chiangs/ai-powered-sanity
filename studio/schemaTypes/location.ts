import {defineField, defineType} from 'sanity'
import {PinIcon} from '@sanity/icons'

export const locationType = defineType({
  name: 'location',
  title: 'Location',
  type: 'document',
  icon: PinIcon,
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
      name: 'details',
      title: 'Additional Details',
    },
  ],
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      group: 'basic',
      validation: (Rule) => Rule.required().error('Location name is required'),
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
      name: 'address',
      type: 'string',
      group: 'basic',
      validation: (Rule) =>
        Rule.required().error('Address is required for location identification'),
    }),
    defineField({
      name: 'city',
      type: 'string',
      group: 'basic',
      validation: (Rule) => Rule.required().error('City is required'),
    }),
    defineField({
      name: 'state',
      type: 'string',
      group: 'basic',
    }),
    defineField({
      name: 'postalCode',
      type: 'string',
      group: 'basic',
    }),
    defineField({
      name: 'country',
      type: 'string',
      group: 'basic',
      validation: (Rule) => Rule.required().error('Country is required'),
    }),
    defineField({
      name: 'phone',
      type: 'string',
      group: 'contact',
      validation: (Rule) =>
        Rule.regex(/^[+]?[1-9][\d]{0,15}$/, {
          name: 'phone',
          invert: false,
        }).warning('Please enter a valid phone number'),
    }),
    defineField({
      name: 'email',
      type: 'string',
      group: 'contact',
      validation: (Rule) => Rule.email().warning('Please enter a valid email address'),
    }),
    defineField({
      name: 'hours',
      type: 'string',
      group: 'contact',
      description: 'Opening hours or availability (e.g., Mon-Fri 9am-5pm)',
    }),
    defineField({
      name: 'geoLocation',
      type: 'geopoint',
      group: 'details',
      description: 'Latitude and longitude for this location',
    }),
    defineField({
      name: 'image',
      type: 'image',
      group: 'details',
      options: {hotspot: true},
    }),
    defineField({
      name: 'description',
      type: 'array',
      group: 'details',
      of: [{type: 'blockContent'}],
      description: 'Detailed description of this location',
    }),
    defineField({
      name: 'status',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          {title: 'Active', value: 'active'},
          {title: 'Temporarily Closed', value: 'temporarily-closed'},
          {title: 'Permanently Closed', value: 'permanently-closed'},
          {title: 'Coming Soon', value: 'coming-soon'},
        ],
        layout: 'radio',
      },
      initialValue: 'active',
      validation: (Rule) =>
        Rule.required().error('Status is required to show location availability'),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'city',
      media: 'image',
      status: 'status',
    },
    prepare(selection) {
      const {title, subtitle, media, status} = selection
      const statusEmoji: Record<string, string> = {
        active: '🟢',
        'temporarily-closed': '🟡',
        'permanently-closed': '🔴',
        'coming-soon': '🔵',
      }
      return {
        title,
        subtitle: subtitle ? `${statusEmoji[status] || ''} ${subtitle}` : status,
        media: media || PinIcon,
      }
    },
  },
})
