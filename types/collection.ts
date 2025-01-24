export type Collection = {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  image: string;
  description?: string;
};
