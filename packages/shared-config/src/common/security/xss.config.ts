export const xssConfig = {
  whiteList: {
    html: ['b', 'i', 'u', 'p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'blockquote'],
    body: ['*'],
  },
  stripIgnoreTag: true,
  stripIgnoreTagBody: ['script', 'style'],
  allowComments: false,
};
