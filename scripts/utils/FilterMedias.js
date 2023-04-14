class FilterMedias {
  /**
   * @param {Media[]} medias 
   */
  constructor(medias) {
    this.medias = medias;
  }

  /**
   * Trie les médias par ordre alphabétique du titre
   * @returns {Media[]}
   */
  filterByTitle() {
    const filteredMedias = this.medias.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
    return filteredMedias;
  }

  /**
   * Trie les médias par ordre chronologique (date croissante)
   * @returns {Media[]}
   */
  filterByDate() {
    const filteredMedias = this.medias.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
    return filteredMedias;
  }

  /**
   * Trie les médias par nombre de likes décroissant
   * @returns {Media[]}
   */
  filterByLikes() {
    const filteredMedias = this.medias.sort((a, b) => {
      return b.likes - a.likes;
    });
    return filteredMedias;
  }
}

export { FilterMedias };