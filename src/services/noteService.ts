import axios from 'axios';
import type { Note } from '../types/note';

interface NotehubResponse {
  notes: Note[];
  totalPages: number;
}

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const fetchNotes = async (
  search: string,
  page: number,
  perPage: number,
): Promise<NotehubResponse> => {
  const url = `https://notehub-public.goit.study/api`;

  const response = await axios.get<NotehubResponse>(`${url}/notes`, {
    params: { search, page, perPage },
    headers: { Authorization: `bearer ${token}` },
  });

  return response.data;
};

export default fetchNotes;
