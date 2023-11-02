import { Profile } from './profile.model';

export interface Product {
  slug: string;
  name: string;
  price: number;
  description: string;
  id_category: string;
  state: string;
  product_images: [string];
  likesCount: number;
  liked: boolean;
  author: Profile;
}