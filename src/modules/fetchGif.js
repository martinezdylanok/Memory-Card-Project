export default function fetchGif(input) {
   const apiKey = "wKXpOjRC2bbTrBrQNVCiGI7fQOxsRhzI";
   const gif = `https://api.giphy.com/v1/gifs/search?q=${input}&api_key=${apiKey}&limit=1`;

   return fetch(gif)
      .then((response) => response.json())
      .then((json) => {
         const gifData = json.data;
         return gifData;
      });
}
