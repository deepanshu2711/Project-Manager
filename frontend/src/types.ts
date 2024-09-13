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

export type Project = {
  _id: string;
  name: string;
  description: string;
  org: string;
  tasks: task[];
};

export type task = {
  name: string;
  completed: boolean;
  assignedTo: string;
};
