// utils/formatPrice.ts
export const formatPrice = (price: number | string): string => {
  return `₱${parseFloat(price.toString()).toFixed(2)}`;
};