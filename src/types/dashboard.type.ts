export type CourseType = {
  id: string;
  title: string;
  author: string;
  authorName: string;
  header: string;
  description: {
    h1: string;
    paragraph: string;
  }[];
  price: number;
  image: string;
  language: string;
  type: string;
  isNew: boolean;
  isForSale: boolean;
  categories: string;
  activity: string[];
  thingToLearn: { str: string }[];
  createdAt: Date;
  updatedAt: Date;
};
