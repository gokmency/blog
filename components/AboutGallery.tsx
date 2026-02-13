"use client";

import { useState } from "react";
import Image from "next/image";

export interface GalleryImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface AboutGalleryProps {
  images: GalleryImage[];
}

export function AboutGallery({ images }: AboutGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  if (!images || images.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-[var(--muted)] p-12 text-center">
        <p className="text-[var(--muted)]">
          Henüz görsel eklenmemiş. Görselleri eklemek için{" "}
          <code className="rounded bg-[var(--muted)]/20 px-2 py-1 text-sm">
            app/[lang]/about/page.tsx
          </code>{" "}
          dosyasındaki <code className="rounded bg-[var(--muted)]/20 px-2 py-1 text-sm">galleryImages</code> array&apos;ine görsellerinizi ekleyin.
        </p>
      </div>
    );
  }

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = "unset";
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedImage === null) return;
    if (e.key === "Escape") {
      handleCloseModal();
    } else if (e.key === "ArrowRight") {
      handleNext(e as any);
    } else if (e.key === "ArrowLeft") {
      handlePrevious(e as any);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => handleImageClick(index)}
            className="group relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 aspect-square cursor-pointer transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-black/20 dark:hover:shadow-black/40 hover:scale-[1.02] hover:z-10"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width || 400}
              height={image.height || 400}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-125"
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 ring-2 ring-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={handleCloseModal}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors"
                aria-label="Previous image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors"
                aria-label="Next image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}

          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              width={images[selectedImage].width || 1200}
              height={images[selectedImage].height || 800}
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
