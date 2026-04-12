import axios from 'axios';
import type { Note } from '../types/note';

interface NotehubResponse {
  notes: Note[];
  totalPages: number;
}

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const fetchNotes = async (
  query: string,
  page: number,
): Promise<NotehubResponse> => {
  const response = await axios.get<NotehubResponse>(
    `https://notehub-public.goit.study/api/notes`,
    {
      params: { query: query, page: page },
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  return response.data;
};

export default fetchNotes;
