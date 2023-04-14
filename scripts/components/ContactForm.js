class FormModal {
  /**
   * @param {Photographer} photographer 
   */
  constructor(photographer) {
    this._photographer = photographer;
    this.$wrapper = document.createElement('div');
    this.createForm(photographer);
  }

  /**
  * validation du formulaire
  * @param {FormData} formData 
  * @return {boolean} 
  */
  validateForm(formData) {
    const CARACT_MINI = 2;
    const nameFormat = /^[a-zA-Z-çéèê\s]+$/;
    const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    let valid = true;

    // Supprime tous les messages d'erreur précédents
    const errorMessages = this.$wrapper.querySelectorAll('.error-message');
    errorMessages.forEach(errorMessage => errorMessage.remove());

    formData.forEach((value, key) => {
      const field = this.$wrapper.querySelector(`#${key}`);
      field.classList.remove('error');
      let message = '';
      if (!value) {
        message = `Vous devez remplir ce champ`;
      } else if (key === 'email' && !mailFormat.test(value)) {
        message = `Le format de l'email n'est pas valide`;
      } else if (key !== 'email' && key !== 'message' && (value.length < CARACT_MINI || !nameFormat.test(value))) {
        message = `Ce champ n'est pas valide`;
      }

      if (message) {
        valid = false;
        this.createErrorMessage(field, message);
      }
    });
    return valid;
  }

  onSubmitForm() {
    const form = this.$wrapper.querySelector('form');
    form.addEventListener('submit', e => {
      e.preventDefault();

      const formData = new FormData(form);
      const valid = this.validateForm(formData);

      if (valid) {
        const { firstname, lastname, email, message } = Object.fromEntries(formData.entries());
        console.log("votre prénom : " + firstname);
        console.log("votre nom : " + lastname);
        console.log("votre email : " + email);
        console.log("votre message: " + message);

        this.onClose();
        this.createBackground();
        this.createConfirmModal();
      }
    });
  }

  /**
   * création des messages d'erreur
   * @param {HTMLElement} field 
   * @param {string} message 
   */
  createErrorMessage(field, message) {
    const error = document.createElement('div');
    field.classList.add('error');
    error.classList.add('error-message');
    error.innerHTML = message;
    field.insertAdjacentElement('afterend', error);
  }

  createForm() {
    const form = `
      <div class="modal" tabindex="0">
        <div class="modal_header">
        <h2>Contactez-moi<br>${this._photographer.name}</h2>
        <img src="assets/icons/close.svg" alt="fermeture" class="close" tabindex="0"/>
        </div>
        <form action="#" method="POST">
          <div class="form-group">
            <label class="form-label" for="firstname">Prénom</label>
            <input class="text" id="firstname" name="firstname" type="text">
          </div>
          <div class="form-group">
            <label class="form-label" for="lastname">Nom</label>
            <input class="text" id="lastname" name="lastname" type="text">
          </div>
          <div class="form-group">
            <label class="form-label" for="email">Email</label>
            <input class="text" id="email" name="email" type="text">
          </div>
          <div class="form-group">
            <label class="form-label" for="message">Votre message</label>
            <input class="text" id="message" name="message" type="text">
          </div>
          <input class="contact_button close_button" type="submit" value="Envoyer">

        </form>
      </div>
    `;
    this.$wrapper.innerHTML = form;
    this.$modalWrapper = this.$wrapper.querySelector('.modal');

    // désactiver en lecture clavier les élements de fond
    const tabIndexed = document.querySelectorAll('.accessibility');
    tabIndexed.forEach((tabIndex) => {
      tabIndex.setAttribute('tabindex', '-1')
    });
  }

  createBackground() {
    const background = document.createElement('div');
    background.classList.add('modal_background');
    document.body.insertBefore(background, document.body.firstChild);
  }

  createConfirmModal() {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.setAttribute('tabindex', '0');

    modal.innerHTML = `
      <div class="modal_header">
        <h2>Confirmation</h2>
        <img src="assets/icons/close.svg" alt="fermeture" class="close close_modal" tabindex="0"/>
      </div>
      <div class="modal_body">
        <p>Votre message a bien été envoyé.</p>
      </div>
      <button class="contact_button close_modal" type="submit" tabindex="0">Fermer</button>
    `;
    document.body.appendChild(modal);

    // désactiver en lecture clavier les élements de fond
    const tabIndexed = document.querySelectorAll('.accessibility');
    tabIndexed.forEach((tabIndex) => {
      tabIndex.setAttribute('tabindex', '-1')
    });

    // fermeture de la modale de confirmation
    const closeButtons = modal.querySelectorAll('.close_modal');
    const closeModal = () => {
      this.onClose();
      modal.remove();
    };

    closeButtons.forEach((closeButton) => {
      closeButton.addEventListener('click', closeModal);
      closeButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          closeModal();
        }
      });
    });
  }

  onClose() {
    const element = document.querySelector('.modal');
    if (element) {
      element.classList.add('fadeOut');
      const background = document.querySelector('.modal_background');
      background.parentNode.removeChild(background); // suppression de la div modal_background
      element.parentNode.removeChild(element);
    }
    // réactiver en lecture clavier les élements de fond
    const tabIndexed = document.querySelectorAll('.accessibility');
    tabIndexed.forEach((tabIndex) => {
      tabIndex.setAttribute('tabindex', '0')
    });
  }

  render() {
    this.createForm();
    this.createBackground()
    this.onSubmitForm();
  }
}

export { FormModal };

