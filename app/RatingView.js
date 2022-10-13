export default class RatingView {
	constructor(root) {
		this.root = root;

		this.initializeInterface();
	}

	initializeInterface() {
		this.root.innerHTML = `
    <form method="POST" id="rating-form">
      <article class="rating">
        <span class="icon-container">
          <img class="icon" src='/assets/images/icon-star.svg' alt="star icon">
        </span>
        <h1 class="rating__heading">How did we do?</h1>
        <p class="rating__question">
          Please let us know how we did with your support request. All feedback is appreciated to help us improve our
          offering!
        </p>
        <div class="rating__actions">
          <p data-value="1" class="rating__action">1</p>
          <p data-value="2" class="rating__action">2</p>
          <p data-value="3" class="rating__action">3</p>
          <p data-value="4" class="rating__action">4</p>
          <p data-value="5" class="rating__action">5</p>
        </div>
        <button type="submit" class="rating__button">SUBMIT</button>
      </article>
      </form>
      `;

		// Handle form submit
		this.root.querySelector('#rating-form').addEventListener('submit', (e) => {
			e.preventDefault();
			const rating = this._getRatedScore();
			if (rating)
				return this._updateInterface(this._createThankElement(rating));

			alert('please rate score...');
		});

		// Handle choosing a rated
		const ratingButtons = this.root.querySelectorAll('.rating__action');

		ratingButtons.forEach((element) =>
			element.addEventListener('pointerdown', (e) => {
				// Remove active status
				ratingButtons.forEach((button) =>
					button.classList.remove('rating__action--active'),
				);
				// Add active to the pressed one
				e.target.classList.add('rating__action--active');
			}),
		);
	}

	_getRatedScore() {
		const element = this.root.querySelector('.rating__action--active');
		if (element) return parseInt(element.textContent);
	}

	// Create thanks element
	_createThankElement(rating) {
		/*
		FIXME: thank icon do not display in production environment (with parcel)
		 */
		return `
		<article class="rating rated">
			<img class="rated__icon" src="/assets/images/illustration-thank-you.svg" alt="thanks icon">
			<p class="rated__rate">
			You selected ${rating} out of 5
			</p>
			<h1 class="rated__heading">Thank you!</h1>
			<p class="rated__description">
				We appreciate you taking the time to give a rating. if you ever need more support, don't hesitate to get in
				touch!
			</p>
		</article>
		`;
	}

	_updateInterface(thankElement) {
		this.root.innerHTML = thankElement;
	}
}
