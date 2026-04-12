import css from './App.module.css';
import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import NoteList from '../NoteList/NoteList';

import fetchNotes from '../../services/noteService';

const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', query, page],
    queryFn: () => fetchNotes(query, page),
    enabled: query.trim() !== '',
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        {/* Пагінація */}
        {/* Кнопка створення нотатки */}
      </header>
      {data && data.notes.length > 0 && <NoteList />}
    </div>
  );
};

export default App;
