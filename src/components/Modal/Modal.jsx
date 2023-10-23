import React, { useEffect } from "react"
import { StyledModal, StyledOverlay } from "./Modal.stylesd"

export const ModalOpen = ({ imageObj, modalClose }) => {
    const { largeImageURL, tags } = imageObj;

    useEffect(() => {
        window.addEventListener('keydown', (evt) => evt.code === 'Escape' && modalClose());
        return () => {
            window.removeEventListener('keydown', (evt) => evt.code === 'Escape' && modalClose());
        }
    }, [modalClose])

    return (
        <StyledOverlay onClick={modalClose}>
            < StyledModal>
                <img src={largeImageURL} alt={tags} />
            </StyledModal >
        </StyledOverlay >
    )
};