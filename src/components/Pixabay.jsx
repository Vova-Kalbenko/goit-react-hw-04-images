import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { url, apiKey, options } from "../API/pixabay";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";
import LoadMoreButton from "./Button/Button";
import ColorRingLoader from "./Loader/Loader";
import Modal from "./Modal/Modal";

export default function Pixabay () {

  const [hits, setHits] = useState([]);
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');
  const [totalHits, setTotalHits] = useState(0);
// это параметр поитска который береться с инпута ПРИ САБМИТЕ
// ТОТАЛД ХИТС ЭТО ПАРАМЕТР СО СТЕЙТА ДЛЯ КОТНРОЛЯ КОЛИЧЕСТВА ВСЕГО И ВЫДАВАТЬ ОШИБКУ ЕСЛИ ЗАКОНЧИЛИСЬ ФОТКИ



const toggleModal = (imageURL, tags) => {
  setShowModal(prevShowModal => !prevShowModal);
  setLargeImageURL(imageURL);
  setTags(tags);
};

const getValue = ({ name }) => {
  setHits([]);
  setName(name);
  setPage(1);
  setTotalHits(0);
};

  const fetchImages = useCallback(() => {
    setLoading(true);

    axios
      .get(`${url}?key=${apiKey}&q=${name}&page=${page}&${options}`)
      .then(response => {
        if (!response.data.hits.length) {
          
            toast.error(
              'No images found', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            }
            );
          
        }

        const modifiedHits = response.data.hits.map(({id, tags, webformatURL, largeImageURL }) => ({
          id: id,
          tags,
          webformatURL,
          largeImageURL,
        }));

        setHits(prevHits => [...prevHits, ...modifiedHits]);
        setTotalHits(response.data.totalHits);
        setLoading(false);
      })
      .catch(error => {
        console.error(error.message);
        setLoading(false);
      });
  }, [name, page]);

  useEffect(() => {
    if (name.trim() === '') {
      return;
    }

    fetchImages();
  }, [name, page, fetchImages]);

   const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

    return (
      <div>
        <Searchbar onSubmitHandler={getValue} />

        {hits.length > 0 && (
          <ImageGallery>
            <ImageGalleryItem articles={hits} onImage={toggleModal} />
          </ImageGallery>
        )}

        {showModal && (
          <Modal onClose={toggleModal} url={largeImageURL} alt={tags} />
        )}

        {loading && <ColorRingLoader />}

        {totalHits > 0 && hits.length < totalHits && (
          <LoadMoreButton onButtonClick={loadMore} />
        )}
        <ToastContainer />
      </div>
    );
  }


// АЛГОРИТМ
// 1. ФЕТЧ ФОТОК С ПОМОЩЬЮ АПИ
// 2. РЕНДЕР ЭТИХ ФОТОК (ЮЛ С ЛИШКАМИ)
// 3. ОБРАБОТКА КНОПКИ ПО ЗАГРУЖКЕ БОЛЬШЕ
// 4. ПОДКЛЮЧЕНИЕ МОДАЛКИ ДЛЯ ОТКРЫТИЯ БОЛЬШЕГО ИЗОБРАЖЕНИЯ
// 5. ОГРАНИЧЕНИЯ ФЕТЧА ПО ТОМУ ЖЕ ИМЕНИ(ПАРАМЕТРА ПОИСКА)
// 6.ОБРАБОТКА ВЫВЕДЕГНИЧЯ ОШИБКИ ЕСЛИ ЗАКОНЧИЛИЬ ВСЕ КАРТИНКИ ПО ДАННОМУ ЗАПРОЛСУ
// 7.ОБРАБОТКА ПОКАЗА ОШИБКИ ПО НЕВАЛИДНОМУ ПАРАМЕТРУ ПОИСКА (А ИМЕННО ТО ЧТО ФОТКИ НЕ НАЙДЕНЫ)



