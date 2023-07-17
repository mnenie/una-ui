export default defineAppConfig({
  docus: {
    title: 'NexveltUI',
    description: 'An Atomic UI/UX Technology',
    image: '',
    socials: {
      twitter: 'phojiee',
      github: 'nexvelt/ui',
    },
    github: {
      dir: 'docs/content',
      branch: 'main',
      repo: 'ui',
      owner: 'nexvelt',
      edit: true,
    },
    aside: {
      level: 1,
      collapsed: false,
      exclude: ['/'],
    },
    header: {
      logo: true,
      exclude: ['/docs', '/'],
    },
    footer: {
      credits: {
        icon: '',
        text: 'Released under the MIT License. ',
        href: 'https://github.com/nexvelt/ui/blob/main/LICENSE',
      },
      textLinks: [
        {
          text: 'Copyright © 2023-present Phojie Rengel',
          href: 'https://github.com/phojie',
          target: '_blank',
          rel: 'noopener',
        },
      ],
    },

  },
})