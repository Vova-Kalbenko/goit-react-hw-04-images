
import css from './ImageGallery.module.css'
const ImageGallery =({children}) =>  {

    return <ul className={css.imageGallery}>{children}</ul>;

}

export default ImageGallery;

