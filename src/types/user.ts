export interface UserApi {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: {
    city: string;
  };
  company: {
    name: string;
  };
}

export interface EditableUser {
  name: string;
  username: string;
  email: string;
  city: string;
  phone: string;
  companyName: string;
  avatarUrl: string;
}

export interface UserCardModel {
  id: number;
  username: string;
  city: string;
  companyName: string;
  avatarUrl: string;
  archived: boolean;
}
