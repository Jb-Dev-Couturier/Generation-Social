export default {
  name: 'user',
  title: 'Utilisateur',
  type: 'document',
  fields: [
    {
      name: 'userName',
      title: 'Pseudo',
      type: 'string',
    },
    {
      name: 'image',
      title: 'ImageProfil',
      type: 'string',
    },
    {
      name: 'following',
      title: 'Je les Follow',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'user' }],
        },
      ],
    },
    {
      name: 'followers',
      title: 'Ils me Follow',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'user' }],
        },
      ],
    },
  ],
};