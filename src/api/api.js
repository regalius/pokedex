export const PokeFetch = url => {
  return fetch(url, { mode: "no-cors" })
    .then(response => {
      return response.json();
    })
    .then(json => {
      return json;
    });
};
