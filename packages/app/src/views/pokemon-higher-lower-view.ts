import { Auth, Observer, View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { Msg } from "../messages";
import { Model } from "../model";

export class PokemonHigherLowerViewElement extends View<Model, Msg> {
  @property()
  topic = "pokemon";

  @state()
  cards: any[] = [];

  @state()
  card1: any = null;

  @state()
  card2: any = null;

  @state()
  score = 0;

  @state()
  streak = 0;

  @state()
  guessStatus: 'correct' | 'incorrect' | null = null;

  @state()
  loading = true;

  @state()
  isAuthenticated = false;

  _authObserver = new Observer<Auth.Model>(this, "blazing:auth");

  constructor() {
    super("blazing:auth");
  }

  async connectedCallback() {
    super.connectedCallback();
    
    // observe authentication state
    this._authObserver.observe((auth: Auth.Model) => {
      const { user } = auth;
      this.isAuthenticated = user?.authenticated ?? false;
      if (this.isAuthenticated && !this.cards.length) {
        this.loadCards();
      }
    });
  }

  async loadCards() {
    // check if cards are already in localStorage
    const cachedCards = localStorage.getItem('pokemon-cards');
    
    if (cachedCards) {
      this.cards = JSON.parse(cachedCards);
      this.loading = false;
      console.log('Loaded cards from localStorage:', this.cards);
      this.initializeCards();
      return;
    }

    // fetch from API if not cached
    try {
      this.loading = true;
      const apiKey = import.meta.env.VITE_TCG_API_KEY;
      console.log('Using API key:', apiKey ? 'Key present' : 'Key missing');
      
      const randomOffset = Math.floor(Math.random() * (200 - 20 + 1)) + 20;
      console.log('Using random offset:', randomOffset);
      const response = await fetch(
        `https://api.justtcg.com/v1/cards?game=Pokemon&limit=20&condition=Near%20Mint&printing=Holofoil&language=English&rarity=Ultra%20Rare,Promo,Rare&offset=${randomOffset}`,
        {
          headers: {
            'X-API-Key': apiKey,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      this.cards = data.data || data;
      
      // save to localStorage so i dont run out of free trial api calls ;-;
      localStorage.setItem('pokemon-cards', JSON.stringify(this.cards));
      console.log('Fetched and cached cards:', this.cards);
      
      this.initializeCards();
      
    } catch (error) {
      console.error('Failed to load Pokemon cards:', error);
    } finally {
      this.loading = false;
    }
  }

  initializeCards() {
    // initialize card1
    if (!this.card1 && this.cards.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.cards.length);
      this.card1 = this.cards.splice(randomIndex, 1)[0];
      console.log('Initialized card1:', this.card1);
    }
    // initialize card2 if it's missing and we have cards
    if (!this.card2 && this.cards.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.cards.length);
      this.card2 = this.cards.splice(randomIndex, 1)[0];
      console.log('Initialized card2:', this.card2);
    }
  }

  render() {
    return html`
      <header-data src="/data/headers.json" page="pk-hilo"></header-data>
      <div class="body">
        <h2>Guess the higher/lower value. Try to get the longest streak!</h2>

        ${!this.isAuthenticated ? html`
          <div class="auth-message">
            <p>Please <a href="/login.html" @click=${(e: MouseEvent) => {
              e.preventDefault();
              window.location.href = "/login.html";
            }}>sign in</a> to play the game.</p>
          </div>
        ` : this.loading ? html`
          <p class="loading">Loading cards...</p>
        ` : html`
          <p class="card-count">Cards loaded: ${this.cards.length}</p>
          
          <div class="comparison-box">
            <div class="card-container">
              <img src="https://tcgplayer-cdn.tcgplayer.com/product/${this.card1.tcgplayerId}_in_1000x1000.jpg" width="300" height="400" alt="Current card" />
              <p class="card-price">$${this.card1.variants?.[0]?.price?.toFixed(2) || '0.00'}</p>
            </div>
            <div class="card-container">
              <img src="https://tcgplayer-cdn.tcgplayer.com/product/${this.card2.tcgplayerId}_in_1000x1000.jpg" width="300" height="400" alt="Next card" />
              <p class="card-price hidden">?</p>
            </div>
          </div>

          <div class="guess">
            <button id="higher" @click=${this.handleHigher}>Higher</button>
            <button id="lower" @click=${this.handleLower}>Lower</button>
          </div>

          ${this.guessStatus ? html`
            <div class="guess-status ${this.guessStatus}">
              ${this.guessStatus === 'correct' ? '✓ Correct!' : '✗ Incorrect!'}
            </div>
          ` : ''}

          <div class="stats">
            <p>Score: <span class="score-value">${this.score}</span></p>
            <p>Streak: <span class="streak-value">${this.streak}</span></p>
          </div>
        `}

        <div class="nav-links">
          <a href="/app/pokemon">← Back to Pokemon</a>
        </div>
      </div>
    `;
  }

  handleHigher() {
    if (!this.card1 || !this.card2) return;

    const card1Price = this.card1.variants?.[0]?.price || 0;
    const card2Price = this.card2.variants?.[0]?.price || 0;

    // check if card2 is lower than or eq to card1 (card1 is higher)
    if (card2Price <= card1Price) {
      // correct guess
      this.score += 1;
      // update highest streak if current is higher
      if (this.score > this.streak) {
        this.streak = this.score;
      }
      this.guessStatus = 'correct';
    } else {
      // wrong guess - reset current streak
      this.score = 0;
      this.guessStatus = 'incorrect';
    }

    // move card2 to card1 and get a random new card for card2
    this.card1 = this.card2;
    if (this.cards.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.cards.length);
      this.card2 = this.cards.splice(randomIndex, 1)[0];
    } else {

      // no more cards - refresh the list
      console.log('Cards depleted. Refreshing card list...');
      this.card2 = null;
      localStorage.removeItem('pokemon-cards'); // clear cache to get fresh cards
      this.loadCards();
    }
  }

  handleLower() {
    if (!this.card1 || !this.card2) return;

    const card1Price = this.card1.variants?.[0]?.price || 0;
    const card2Price = this.card2.variants?.[0]?.price || 0;

    // check if card2 is higher than or eq to card1 (card1 is lower)
    if (card2Price >= card1Price) {
      // correct guess - increment current streak
      this.score += 1;
      // update highest streak if current is higher
      if (this.score > this.streak) {
        this.streak = this.score;
      }
      this.guessStatus = 'correct';
    } else {
      // wrong guess - reset current streak
      this.score = 0;
      this.guessStatus = 'incorrect';
    }

    // move card2 to card1 and get a random new card for card2
    this.card1 = this.card2;
    if (this.cards.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.cards.length);
      this.card2 = this.cards.splice(randomIndex, 1)[0];
    } else {
      // no more cards - refresh the list
      console.log('Cards depleted. Refreshing card list...');
      this.card2 = null;
      localStorage.removeItem('pokemon-cards'); // clear cache to get fresh cards
      this.loadCards();
    }
  }

  static styles = css`
    :host {
      display: block;
      height: 100%;
    }

    .body {
      background-color: var(--color-background);
      display: flex;
      flex-direction: column;
      align-items: center;
      font-family: var(--font-body);
      min-height: 100vh;
      padding: 2rem 0;
      gap: 2rem;
    }

    h2 {
      color: var(--color-support);
      font-size: 2rem;
      padding: 15px;
      margin: 0;
    }

    .comparison-box {
      display: flex;
      gap: 20px;
    }

    .card-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    .comparison-box img {
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }

    .card-price {
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--color-main);
      margin: 0;
      padding: 0.5rem 1rem;
      background-color: var(--color-card);
      border-radius: 8px;
    }

    .card-price.hidden {
      color: var(--color-support);
      background-color: var(--color-card);
    }

    .guess {
      display: flex;
      flex-direction: column;
      padding: 10px;
      align-items: center;
      width: 200px;
      gap: 5px;
    }

    .guess button {
      font-size: 1.5em;
      height: 40px;
      width: 200px;
      border-radius: 10px;
      border: none;
      cursor: pointer;
      color: white;
      font-family: var(--font-body);
      transition: background 0.2s;
    }

    #higher {
      background: var(--color-main);
    }

    #higher:hover {
      background: var(--color-mainhover);
    }

    #lower {
      background: var(--color-red);
    }

    #lower:hover {
      background: var(--color-redhover);
    }

    .stats {
      display: flex;
      gap: 2rem;
      font-size: 1.2rem;
      color: var(--color-support);
    }

    .stats p {
      margin: 0;
    }

    .score-value,
    .streak-value {
      font-weight: bold;
      color: var(--color-main);
    }

    .loading,
    .card-count {
      color: var(--color-support);
      font-size: 1rem;
      margin: 1rem 0;
    }

    .card-count {
      color: var(--color-main);
      font-weight: bold;
    }

    .nav-links {
      margin-top: 2rem;
    }

    .nav-links a {
      color: var(--color-main);
      font-size: 1rem;
      text-decoration: none;
    }

    .nav-links a:hover {
      color: var(--color-mainhover);
    }

    .auth-message {
      text-align: center;
      padding: 2rem;
      background-color: var(--color-card);
      border-radius: 10px;
      margin: 2rem 0;
    }

    .auth-message p {
      color: var(--color-support);
      font-size: 1.2rem;
      margin: 0;
    }

    .auth-message a {
      color: var(--color-main);
      text-decoration: underline;
    }

    .auth-message a:hover {
      color: var(--color-mainhover);
    }

    .guess-status {
      padding: 1rem 2rem;
      border-radius: 10px;
      font-size: 1.5rem;
      font-weight: bold;
      text-align: center;
      animation: fadeIn 0.3s ease-in;
    }

    .guess-status.correct {
      background-color: var(--color-main);
      color: white;
    }

    .guess-status.incorrect {
      background-color: var(--color-red);
      color: white;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
}
