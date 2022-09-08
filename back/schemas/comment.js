export default {
  name: 'comment',
  title: 'Commentaire',
  type: 'document',
  fields: [
    {
      name: 'postedBy',
      title: 'Posteur',
      type: 'postedBy',
    },
    {
      name: 'comment',
      title: 'Commentaire',
      type: 'string',
    },
  ],
};
