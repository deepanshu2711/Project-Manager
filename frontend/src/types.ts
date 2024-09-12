export type User = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  orgs: Organization[];
};

export type Organization = {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  userId: string;
};
