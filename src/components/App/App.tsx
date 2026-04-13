import css from './App.module.css';
import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';

import NoteList from '../NoteList/NoteList';
import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import NoteForm from '../NoteForm/NoteForm';

import fetchNotes from '../../services/noteService';
import Modal from '../Modal/Modal';

const App = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
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

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={debouncedSearch} />
        {data?.notes && data.notes.length > 0 && (
          <>
            {totalPages > 1 && (
              <Pagination
                totalPages={totalPages}
                currentPage={page}
                onPageChange={setPage}
              />
            )}
          </>
        )}
        <button className={css.button} onClick={() => setModalOpen(true)}>
          Create note +
        </button>
      </header>
      {isLoading && <div>Loading...</div>}
      {isError && <div>There is an error to load notes.</div>}
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <NoteForm onCancel={() => setModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default App;
