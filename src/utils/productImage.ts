export const productImageUrl = (fileName: string): string =>
  `${import.meta.env.BASE_URL}products/${fileName}`;
