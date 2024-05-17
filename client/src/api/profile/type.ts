export interface Kid {
  id: number | null;
  name: string;
  age: number;
}

export interface ProfileResponse {
  id: number;
  username: string;
  email: string;
  password: string;
  avatar: string;
  role: string;
  kids: Kid[];
}

export interface IProfileUpdateRequest {
  username?: string;
  email?: string;
  avatar?: string;
}
