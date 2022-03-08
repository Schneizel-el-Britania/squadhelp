const env = process.env.NODE_ENV || 'development';
const serverIP = 'localhost';
const serverPort = 3000;
export default {
  CUSTOMER: 'customer',
  CREATOR: 'creator',
  CONTEST_STATUS_ACTIVE: 'active',
  CONTEST_STATUS_FINISHED: 'finished',
  CONTEST_STATUS_PENDING: 'pending',
  NAME_CONTEST: 'name',
  LOGO_CONTEST: 'logo',
  TAGLINE_CONTEST: 'tagline',
  OFFER_STATUS_REJECTED: 'rejected',
  OFFER_STATUS_WON: 'won',
  OFFER_STATUS_PENDING: 'pending',
  STATIC_IMAGES_PATH: '/staticImages/',
  ANONYM_IMAGE_PATH: '/staticImages/anonym.png',
  BASE_URL: `http://${serverIP}:${serverPort}/`,
  ACCESS_TOKEN: 'accessToken',
  publicURL: env === 'production'
    ? `http://${serverIP}:80/images/`
    : `http://${serverIP}:${serverPort}/public/images/`,
  NORMAL_PREVIEW_CHAT_MODE: 'NORMAL_PREVIEW_CHAT_MODE',
  FAVORITE_PREVIEW_CHAT_MODE: 'FAVORITE_PREVIEW_CHAT_MODE',
  BLOCKED_PREVIEW_CHAT_MODE: 'BLOCKED_PREVIEW_CHAT_MODE',
  CATALOG_PREVIEW_CHAT_MODE: 'CATALOG_PREVIEW_CHAT_MODE',
  CHANGE_BLOCK_STATUS: 'CHANGE_BLOCK_STATUS',
  ADD_CHAT_TO_OLD_CATALOG: 'ADD_CHAT_TO_OLD_CATALOG',
  CREATE_NEW_CATALOG_AND_ADD_CHAT: 'CREATE_NEW_CATALOG_AND_ADD_CHAT',
  USER_INFO_MODE: 'USER_INFO_MODE',
  CASHOUT_MODE: 'CASHOUT_MODE',
  HEADER_ANIMATION_TEXT: [
    'a Company',
    'a Brand',
    'a Website',
    'a Service',
    'a Book',
    'a Business',
    'an App',
    'a Product',
    'a Startup',
  ],
  HeaderItems: {
    nav: [
      {
        title: 'NAME IDEAS',
        items: [
          {
            value: 'Beauty',
            href: '#'
          },
          {
            value: 'Consulting',
            href: '#'
          },
          {
            value: 'E-Commerce',
            href: '#'
          },
          {
            value: 'Fashion & Clothing',
            href: '#'
          },
          {
            value: 'Finance',
            href: '#'
          },
          {
            value: 'Real Estate',
            href: '#'
          },
          {
            value: 'Tech',
            href: '#'
          },
          {
            value: 'More Categories',
            href: '#',
            selected: true
          }
        ],
      },
      {
        title: 'CONTESTS',
        items: [
          {
            value: 'HOW IT WORKS',
            href: '#'
          },
          {
            value: 'PRICING',
            href: '#'
          },
          {
            value: 'AGENCY SERVICE',
            href: '#'
          },
          {
            value: 'ACTIVE CONTESTS',
            href: '#'
          },
          {
            value: 'WINNERS',
            href: '#'
          },
          {
            value: 'LEADERBOARD',
            href: '#'
          },
          {
            value: 'BECOME A CREATIVE',
            href: '#',
            selected: true
          },
        ],
      },
      {
        title: 'Our Work',
        items: [
          {
            value: 'NAMES',
            href: '#'
          },
          {
            value: 'TAGLINES',
            href: '#'
          },
          {
            value: 'LOGOS',
            href: '#'
          },
          {
            value: 'TESTIMONIALS',
            href: '#',
            selected: true
          },
        ],
      },
      {
        title: 'Names For Sale',
        items: [
          {
            value: 'POPULAR NAMES',
            href: '#'
          },
          {
            value: 'SHORT NAMES',
            href: '#'
          },
          {
            value: 'INTRIGUING NAMES',
            href: '#'
          },
          {
            value: 'NAMES BY CATEGORY',
            href: '#'
          },
          {
            value: 'VISUAL NAME SEARCH',
            href: '#'
          },
          {
            value: 'SELL YOUR DOMAINS',
            href: '#',
            selected: true
          }
        ],
      },
      {
        title: 'Blog',
        items: [
          {
            value: 'ULTIMATE NAMING GUIDE',
            href: '#'
          },
          {
            value: 'POETIC DEVICES IN BUSINESS NAMING',
            href: '#'
          },
          {
            value: 'CROWDED BAR THEORY',
            href: '#'
          },
          {
            value: 'ALL ARTICLES',
            href: '#'
          }
        ],
      }
    ],
    auth: [
      {
        title: 'LOGIN',
        href: '/login'
      },
      {
        title: 'SIGN UP',
        href: '/registration'
      }
    ],
    menu: [
      {
        title: 'View Dashboard',
        href: '/dashboard'
      },
      {
        title: 'My Account',
        href: '/account'
      },
      {
        title: 'Affiliate Dashboard',
        href: '#'
      },
      {
        title: 'Logout',
        logOut: true
      }
    ]
  },
  FooterItems: [
    {
      title: 'SQUADHELP',
      items: [
        'About',
        'Contact',
        'How It Works?',
        'Testimonials',
        'Our Work',
      ],
    },
    {
      title: 'RESOURCES',
      items: [
        'How It Works',
        'Become a Creative',
        'Business Name Generator',
        'Discussion Forum',
        'Blog',
        'Download eBook',
        'Pricing',
        'Help & FAQs',
      ],
    },
    {
      title: 'OUR SERVICES',
      items: [
        'Naming',
        'Logo Design',
        'Taglines',
        'Premium Names For Sale',
        'Creative Owned Names For Sale',
        'Audience Testing',
        'Trademark Research & Filling',
        'Managed Agency Service',
      ],
    },
    {
      title: 'LEGAL',
      items: [
        'Terms of Service',
        'Privacy Policy',
        'Cookie Policy',
      ],
    },
  ],
  UserInfoItems: [
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      isEditable: true
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
      isEditable: true
    },
    {
      name: "displayName",
      label: "Display Name",
      type: "text",
      isEditable: true
    },
    {
      name: "email",
      label: "Email",
      isEditable: false
    },
    {
      name: "role",
      label: "Role",
      isEditable: false
    },
    {
      name: "balance",
      label: "Balance",
      isEditable: false,
      onlyCreator: true
    },
    {
      name: "file",
      isEditable: true
    }
  ]
};
