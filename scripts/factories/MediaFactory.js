/* eslint-disable linebreak-style */
// function photographerFactory(data) {
//   const { name, portrait} = data;

//   const picture = `assets/photographers/${portrait}`;

//   function getUserCardDOM() {
//     const article = document.createElement('article');
//     const img = document.createElement('img');
//     img.setAttribute('src', picture);
//     const h2 = document.createElement('h2');
//     h2.textContent = name;
//     article.appendChild(img);
//     article.appendChild(h2);
//     return (article);
//   }
//   return { name, picture, getUserCardDOM };
// }

// class PhotographersFactory {
//     constructor(data, type) {
//         if (type === 'photographerApi') {
//             return new Photographer(data)
//         } else if (type === 'mediaApi') {
//             return new Media(data)
//         } else {
//             throw 'Unknown format type'
//         }
//     }
// }
