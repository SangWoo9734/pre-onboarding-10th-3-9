import apiRequest from '.';
import { SearchRequestType } from '../@types';

const RESOURCE = '/search';

export const getSearchWordList = async ({ q, page = 1, limit = 10 }: SearchRequestType) => {
  try {
    const response = await apiRequest.get(`${RESOURCE}?q=${q}&page=${page}&limit=${limit}`, {});

    return response;
  } catch (error) {
    throw new Error('API getSeachWordList error');
  }
};
