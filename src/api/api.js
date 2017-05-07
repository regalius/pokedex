export const PokeFetch = (url) => {
  return fetch(url)
  .then(response => {
    return response.json();
  })
  .then(json => {
    return json;
  });
};
