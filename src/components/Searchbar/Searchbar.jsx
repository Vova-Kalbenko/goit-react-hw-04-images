import React, { useState } from 'react';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';

export default function Searchbar ({onSubmitHandler}) {
  const [name, setName] = useState('');
// это параметр поитска который береться с инпута ПРИ ВВОДЕ
  const handleChange = event => {
    const { value } = event.currentTarget;
    setName(value)
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (name.trim() === '') {
      toast.error(
        'search string is empty!', { position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",}
      );
      return;
    }

    onSubmitHandler({name});

    reset();
  };

  const reset = () => {
    setName('');
  }


    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={handleSubmit}>
          <button type="submit" className={css.searchbutton}>
            <span className="searchForm-button-label">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 20 20"
              >
                <title>search</title>
                <path d="M19 17l-5.15-5.15a7 7 0 1 0-2 2L17 19zM3.5 8A4.5 4.5 0 1 1 8 12.5 4.5 4.5 0 0 1 3.5 8z" />
              </svg>
            </span>
          </button>

          <input
            className={css.searchinput}
            type="text"
            onChange={handleChange}
            autoComplete="off"
            value={name}
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }


