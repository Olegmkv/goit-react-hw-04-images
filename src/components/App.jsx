import { useEffect, useState } from 'react'
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { fetchGallery } from './api'
import { Loader } from './Loader/Loader';
import { ModalOpen } from './Modal/Modal';


export const App = () => {
  const PER_PAGE = 12;
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [following, setFollowing] = useState(false);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState('');
  const [typeFetch, setTypeFetch] = useState('');
  const [modalData, setModalData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);


  useEffect(() => {
    loadingQuery(q, page, typeFetch);
  }, [q, page, typeFetch]);

  //зміна параметру відбору галереї
  const handlerFind = (evt) => {
    evt.preventDefault();
    setPage(1);
    setQ(evt.target.find.value);
    setTypeFetch('newQuery');
  };

  // наступна сторінка
  const nextPage = () => {
    setPage(prevState => prevState + 1);
    setTypeFetch('newPage');
  };

  // запит нової галереї або докачка нової сторінки по "Load more"
  async function loadingQuery(q, page, typeFetch) {
    try {
      setLoading(true);
      setError(false);
      const response = await fetchGallery(page, q);
      if (typeFetch === 'newQuery') {
        setGallery(response.hits);
        setFollowing(response.totalHits <= PER_PAGE ? false : true)
      }
      if (typeFetch === 'newPage') {
        setGallery(prevState => [...prevState, ...response.hits]);
        setFollowing(response.totalHits <= page * PER_PAGE ? false : true);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const onModalOpen = (imageObj) => {
    setModalOpen(true);
    setModalData(imageObj)
  };

  const onModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Searchbar onSelect={handlerFind} />
      <ImageGallery gallery={gallery} modalOpenProp={onModalOpen} />
      {loading && <Loader />}
      {error && (<p>Error load gallery, please restart page...</p>)}
      {following && (<Button nextPage={nextPage} />)}
      {modalOpen && (<ModalOpen imageObj={modalData} modalClose={onModalClose} />)}
    </>
  );
};
