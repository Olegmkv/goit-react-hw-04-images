import React from "react"
import { StyledModal, StyledOverlay } from "./Modal.stylesd"

export const ModalOpen = ({ imageObj, modalClose }) => {
    const { largeImageURL, tags } = imageObj;
    return (
        <StyledOverlay onClick={modalClose}>
            < StyledModal>
                <img src={largeImageURL} alt={tags} />
            </StyledModal >
        </StyledOverlay >
    )
}