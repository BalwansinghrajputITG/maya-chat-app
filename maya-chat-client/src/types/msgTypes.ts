export interface Message {
  userId: number;
  msg: string;
}

export interface Users {
  userId: number | string;
  name: string;
  userName: string;
  profilePic: string | null;
  isOnlie: boolean;
}
