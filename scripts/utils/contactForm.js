import { Photographer } from '../models/Photographer.js';

class FormModal {
  /**
   * @param { Photographer} photographer 
   */
  constructor(photographer) {
    this._photographer = photographer;
    this.$wrapper = document.createElement('div');
    this.createForm(photographer);
  }

  onSubmitForm() {
    const form = this.$wrapper.querySelector('form');
    form.addEventListener('submit', e => {
      e.preventDefault();

      const firstNameInputValue = this.$wrapper.querySelector('#firstname').value;
      const lastNameInputValue = this.$wrapper.querySelector('#lastname').value;
      const emailInputValue = this.$wrapper.querySelector('#email').value;
      const messageInputValue = this.$wrapper.querySelector('#message').value;

      // nombre de caractères minimum
      const CARACT_MINI = 2;

      // les regex
      const nameFormat = /^[a-zA-Z-çéèê\s]+$/; // vérification du nom/prénom
      const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // vérification de l'email

      let valid = true;

      // Supprime tous les messages d'erreur précédents
      const errorMessages = this.$wrapper.querySelectorAll('.error-message');
      errorMessages.forEach(errorMessage => errorMessage.remove());

      // Vérification du champ du prénom
      if (!firstNameInputValue || firstNameInputValue.length < CARACT_MINI || !nameFormat.test(firstNameInputValue)) {
        console.log('Prénom invalide');
        valid = false;
        const firstNameError = document.createElement('div');
        this.$wrapper.querySelector('#firstname').classList.add('error');
        firstNameError.classList.add('error-message');
        firstNameError.innerHTML = 'Le prénom doit contenir au moins 2 caractères';
        this.$wrapper.querySelector('#firstname').insertAdjacentElement('afterend', firstNameError);
      }

      // Vérification du champ du nom
      if (!lastNameInputValue || lastNameInputValue.length < CARACT_MINI || !nameFormat.test(lastNameInputValue)) {
        console.log('Nom invalide');
        valid = false;
        const lastNameError = document.createElement('div');
        this.$wrapper.querySelector('#lastname').classList.add('error');
        lastNameError.classList.add('error-message');
        lastNameError.innerHTML = 'Le nom doit contenir au moins 2 caractères';
        this.$wrapper.querySelector('#lastname').insertAdjacentElement('afterend', lastNameError);
      }

      // Vérification du champ de l'email
      if (!emailInputValue || !mailFormat.test(emailInputValue)) {
        console.log('Email invalide');
        valid = false;
        const emailError = document.createElement('div');
        this.$wrapper.querySelector('#email').classList.add('error');
        emailError.classList.add('error-message');
        emailError.innerHTML = "Le format d'email n'est pas valide";
        this.$wrapper.querySelector('#email').insertAdjacentElement('afterend', emailError);
      }

      // Vérification du champ du message
      if (!messageInputValue) {
        console.log('Message invalide');
        valid = false;
        const messageError = document.createElement('div');
        this.$wrapper.querySelector('#message').classList.add('error');
        messageError.classList.add('error-message');
        messageError.innerHTML = "Vous devez entrer un message";
        this.$wrapper.querySelector('#message').insertAdjacentElement('afterend', messageError);
      }

      if (valid) {
        console.log("votre prénom : " + firstNameInputValue);
        console.log("votre nom : " + lastNameInputValue);
        console.log("votre email : " + emailInputValue);
        console.log("votre message: " + messageInputValue);

        this.onClose();
        this.createBackground()
        this.createConfirmModal();
      }
    });
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
          <input class="contact_button" type="submit" value="Envoyer">

        </form>
      </div>
    `;
    this.$wrapper.innerHTML = form;
    this.$modalWrapper = this.$wrapper.querySelector('.modal');
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
      <img src="assets/icons/close.svg" alt="fermeture" class="close" tabindex="0"/>
    </div>
    <div class="modal_body">
      <p>Votre message a bien été envoyé.</p>
    </div>
    <button class="contact_button close_button" type="submit" tabindex="0">Fermer</button>
  `;
    document.body.appendChild(modal);
    const closeButton = modal.querySelector('.close');
    closeButton.addEventListener('click', () => {
      this.onClose();
      modal.remove();
    });
    closeButton.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.onClose();
        modal.remove();
      }
    });
    const closeBtn = modal.querySelector('.close_button');
    closeBtn.addEventListener('click', () => {
      this.onClose();
      modal.remove();
    });
    closeBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.onClose();
        modal.remove();
      }
    });
  }

  onClose() {
    const element = document.querySelector('.modal');
    if (element) {
      element.classList.add('fadeOut');
      const background = document.querySelector('.modal_background');
      background.style.display = "none";
      element.parentNode.removeChild(element);
    }
  }

  render() {
    this.createForm();
    this.createBackground()
    this.onSubmitForm();
  }
}

export { FormModal };

