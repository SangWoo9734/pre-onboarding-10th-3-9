export interface TodoType {
  title: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface TodoRequestDataType {
  title: string;
}

export interface SearchRequestType {
  q: string;
  page?: number;
  limit?: number;
}

export interface SearchResponseType {
  q: string;
  page: number;
  limit: number;
  result: string[];
  qty: number;
  total: number;
}
