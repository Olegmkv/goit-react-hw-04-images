import React from "react";
import { GalleryImage, GalleryLi } from "./ImageGalleryItem.styled";

export const ImageGalleryItem = ({ galleryItem, modalOpenProp }) => {
    const { webformatURL, tags, largeImageURL } = galleryItem;
    return (
        <GalleryLi>
            <GalleryImage onClick={() => modalOpenProp({ tags, largeImageURL })} src={webformatURL} alt={tags} />
        </GalleryLi >
    )
};
