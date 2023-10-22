import React from "react"
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem"
import { GalleryUl } from "./ImageGallery.styled"

export const ImageGallery = ({ gallery, modalOpenProp }) => {
    return (
        <GalleryUl >
            {gallery.map(item =>
                <ImageGalleryItem key={item.id} galleryItem={item} modalOpenProp={modalOpenProp} />
            )}
        </GalleryUl>
    )
}