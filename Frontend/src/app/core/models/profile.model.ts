export interface Profile {
    username: string;
    bio: string;
    image: string;
    following: boolean;
    followedByUsers: string[];
    followingUsers: string[];
    likedProducts: string[];
  }
  