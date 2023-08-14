

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export default function Modal ({ url, alt, onClose }) {

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdpropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

    return (
      <div className={css.overlay} onClick={handleBackdpropClick}>
        <div className={css.modal}>
          <img src={url} alt={alt}/>
        </div>
      </div>
    );
  }


Modal.propTypes = {
  url: PropTypes.string,
  alt: PropTypes.string,
  handleBackdpropClick: PropTypes.func,
};
