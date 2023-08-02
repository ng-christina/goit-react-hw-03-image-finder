export const BASE_URL = 'https://pixabay.com/api/',
  API_KEY = '37205092-ee8b3a91029812b1435501f30',
  SEARCH_PARAMS = new URLSearchParams({
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
  });
