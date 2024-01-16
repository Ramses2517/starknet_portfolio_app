import {css} from "@emotion/css";

export const NftGalleryStyles = {
    container: css`
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 10px;

      @media screen and (max-width: 1619px) {
        grid-template-columns: repeat(5, 1fr);
      }
      @media screen and (max-width: 1439px) {
        grid-template-columns: repeat(4, 1fr);
      }
      @media screen and (max-width: 1239px) {
        grid-template-columns: repeat(3, 1fr);
      }
    `,
    imageWrapper: css`
      aspect-ratio: 1;
    `
}

