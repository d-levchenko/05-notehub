import css from './App.module.css';
import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';

import NoteList from '../NoteList/NoteList';
import SearchBox from '../SearchBox/SearchBox';

import fetchNotes from '../../services/noteService';

const App = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const PER_PAGE = 12;

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setPage(1);
    setSearch(value);
  }, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', search, page],
    queryFn: () => fetchNotes(search, page, PER_PAGE),
    enabled: search.trim() !== '',
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={debouncedSearch} />
        {/* Пагінація */}
        <button className={css.button}>Create note +</button>
      </header>
      {isLoading && <div>Loading...</div>}
      {isError && <div>There is an error to load notes.</div>}
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
};

export default App;
