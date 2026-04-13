import css from './NoteList.module.css';
import type { Note } from '../../types/note';

interface NoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
  return (
    <ul className={css.list}>
      {notes.map(elem => (
        <li key={elem.id} className={css.listItem}>
          <h2 className={css.title}>{elem.title}</h2>
          <p className={css.content}>{elem.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{elem.tag}</span>
            <button className={css.button}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
