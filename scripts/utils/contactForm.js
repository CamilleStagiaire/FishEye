class FormModal {
  /**
   * @param {Objet} photographer 
   */
  constructor(photographer) {
    this._photographer = photographer;
    this.$wrapper = document.createElement('div');
    this.createForm(photographer);

  }

  onSubmitForm() {
    this.$wrapper
      .querySelector('form')
      .addEventListener('submit', e => {
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

        if (!firstNameInputValue || firstNameInputValue.length < CARACT_MINI || !firstNameInputValue.match(nameFormat)) {
          console.log('Prénom invalide');
          valid = false;
        }

        if (!lastNameInputValue || lastNameInputValue.length < CARACT_MINI || !lastNameInputValue.match(nameFormat)) {
          console.log('Nom invalide');
          valid = false;
        }

        if (!emailInputValue || !emailInputValue.match(mailFormat)) {
          console.log('Email invalide');
          valid = false;
        }

        if (!messageInputValue) {
          console.log('Message invalide');
          valid = false;
        }

        if (!valid) {
// créer un champs invalid
        } else {
          console.log("votre prénom : " + firstNameInputValue);

          // Fermeture de la modal
          this.$modalWrapper.classList.remove('modal');
          this.$modalWrapper.innerHTML = '';
          const background = document.querySelector('.modal_background')
          background.remove()
        }
      });
  }


  createForm() {
    const form = `
      <div class="modal">
        <div class="modal_header">
        <h2>Contactez-moi<br>${this._photographer.name}</h2>
        <img src="assets/icons/close.svg" class="close"/>
        </div>
        <form action="#" method="POST">
          <div class="form-group">
            <label class="form-label" for="firstname">Prénom</label>
            <input id="firstname" name="firstname" type="text">
          </div>
          <div class="form-group">
            <label class="form-label" for="lastname">Nom</label>
            <input id="lastname" name="lastname" type="text">
          </div>
          <div class="form-group">
            <label class="form-label" for="email">Email</label>
            <input id="email" name="email" type="text">
          </div>
          <div class="form-group">
            <label class="form-label" for="message">Votre message</label>
            <input id="message" name="message" type="text">
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

  onClose() {
    this.$modalWrapper.style.display = "none";
    const background = document.querySelector('.modal_background');
    background.style.display = "none";
  }

  render() {
    this.createForm();
    this.createBackground()
    this.onSubmitForm();
  }
}

