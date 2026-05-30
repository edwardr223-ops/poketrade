import {
  Bell,
  ChevronDown,
  Grid2X2,
  Heart,
  List,
  MessageSquare,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  SlidersHorizontal,
  Star,
  Store,
  Truck,
  UserRound,
  WalletCards,
  X
} from "lucide-react";

const listings = [
  {
    id: 1,
    name: "Charizard ex",
    set: "Obsidian Flames 223/197",
    type: "Singles",
    condition: "Near Mint",
    language: "English",
    price: "$42.99",
    seller: "PokeVault",
    reviews: 658,
    rating: 4.9,
    badge: "FREE shipping",
    badgeType: "green",
    imageTheme: "fire",
    pokemon: "CHARIZARD",
    imageUrl: "https://images.pokemontcg.io/sv3/223_hires.png",
    tradeAccepted: true
  },
  {
    id: 2,
    name: "Pikachu",
    set: "Crown Zenith 055/159",
    type: "Singles",
    condition: "Near Mint",
    language: "English",
    price: "$2.75",
    seller: "CardCollector",
    reviews: 1204,
    rating: 4.8,
    badge: "Trade accepted",
    badgeType: "blue",
    imageTheme: "electric",
    pokemon: "PIKACHU",
    imageUrl: "https://images.pokemontcg.io/swsh12pt5/160_hires.png",
    tradeAccepted: true
  },
  {
    id: 3,
    name: "Umbreon VMAX",
    set: "Evolving Skies 215/203",
    type: "Graded Cards",
    condition: "PSA 10",
    language: "English",
    price: "$1,250.00",
    seller: "MoonCards",
    reviews: 312,
    rating: 5.0,
    badge: "Top rated",
    badgeType: "gold",
    imageTheme: "dark",
    pokemon: "UMBREON",
    imageUrl: "https://images.pokemontcg.io/swsh7/215_hires.png",
    tradeAccepted: false
  },
  {
    id: 4,
    name: "Blastoise ex",
    set: "151 184/165",
    type: "Singles",
    condition: "Lightly Played",
    language: "English",
    price: "$33.50",
    seller: "BlueShellTCG",
    reviews: 842,
    rating: 4.7,
    badge: "FREE shipping",
    badgeType: "green",
    imageTheme: "water",
    pokemon: "BLASTOISE",
    imageUrl: "https://images.pokemontcg.io/sv3pt5/200_hires.png",
    tradeAccepted: true
  },
  {
    id: 5,
    name: "Mewtwo V",
    set: "Fusion Strike 072/264",
    type: "Singles",
    condition: "Near Mint",
    language: "English",
    price: "$13.99",
    seller: "PsychicTCG",
    reviews: 567,
    rating: 4.6,
    badge: "Local pickup",
    badgeType: "purple",
    imageTheme: "psychic",
    pokemon: "MEWTWO",
    imageUrl: "https://images.pokemontcg.io/pgo/72_hires.png",
    tradeAccepted: false
  },
  {
    id: 6,
    name: "Eevee",
    set: "Promo SWSH065",
    type: "Singles",
    condition: "Near Mint",
    language: "Japanese",
    price: "$1.50",
    seller: "PokeFamily",
    reviews: 98,
    rating: 4.5,
    badge: "Budget pick",
    badgeType: "tan",
    imageTheme: "normal",
    pokemon: "EEVEE",
    imageUrl: "https://images.pokemontcg.io/swshp/SWSH065_hires.png",
    tradeAccepted: true
  },
  {
    id: 7,
    name: "Gengar VMAX",
    set: "Fusion Strike 271/264",
    type: "Singles",
    condition: "Near Mint",
    language: "English",
    price: "$89.99",
    seller: "GhostCards",
    reviews: 443,
    rating: 4.8,
    badge: "Trade accepted",
    badgeType: "blue",
    imageTheme: "ghost",
    pokemon: "GENGAR",
    imageUrl: "https://images.pokemontcg.io/swsh8/271_hires.png",
    tradeAccepted: true
  },
  {
    id: 8,
    name: "Rayquaza V",
    set: "Evolving Skies 194/203",
    type: "Singles",
    condition: "Near Mint",
    language: "English",
    price: "$185.00",
    seller: "SkyHighCards",
    reviews: 721,
    rating: 4.9,
    badge: "Rare find",
    badgeType: "gold",
    imageTheme: "dragon",
    pokemon: "RAYQUAZA",
    imageUrl: "https://images.pokemontcg.io/swsh7/194_hires.png",
    tradeAccepted: false
  },
  {
    id: 9,
    name: "Arceus VSTAR",
    set: "Brilliant Stars 123/172",
    type: "Singles",
    condition: "Near Mint",
    language: "English",
    price: "$9.25",
    seller: "LegendaryPulls",
    reviews: 305,
    rating: 4.7,
    badge: "FREE shipping",
    badgeType: "green",
    imageTheme: "legend",
    pokemon: "ARCEUS",
    imageUrl: "https://images.pokemontcg.io/swsh9/123_hires.png",
    tradeAccepted: true
  },
  {
    id: 10,
    name: "Iono",
    set: "Paldea Evolved 269/193",
    type: "Singles",
    condition: "Near Mint",
    language: "English",
    price: "$15.75",
    seller: "TrainerShop",
    reviews: 186,
    rating: 4.6,
    badge: "Popular",
    badgeType: "pink",
    imageTheme: "trainer",
    pokemon: "IONO",
    imageUrl: "https://images.pokemontcg.io/sv2/269_hires.png",
    tradeAccepted: false
  }
];

const categories = [
  "All Items",
  "Singles",
  "Sealed",
  "Graded Cards",
  "Accessories",
  "Plush & Figures",
  "TCG Supplies",
  "Shop by Set"
];

const sets = [
  "Scarlet & Violet",
  "Obsidian Flames",
  "151",
  "Crown Zenith",
  "Paldea Evolved",
  "Evolving Skies",
  "Fusion Strike"
];

const conditions = [
  "Near Mint",
  "Lightly Played",
  "Moderately Played",
  "Heavily Played",
  "Damaged"
];

function Header() {
  return (
    <header className="top-header">
      <div className="brand-wrap">
        <div className="brand-mark">
          <div className="brand-mark-top"></div>
          <div className="brand-mark-center"></div>
          <div className="brand-mark-bottom"></div>
        </div>

        <div>
          <div className="brand-name">Poke Booth</div>
          <div className="brand-tagline">Trade. Collect. Connect.</div>
        </div>
      </div>

      <div className="search-wrap">
        <input
          type="text"
          placeholder="Search cards, sets, or Pokemon..."
          aria-label="Search cards, sets, or Pokemon"
        />
        <button type="button" className="search-button" aria-label="Search">
          <Search size={24} />
        </button>
      </div>

      <nav className="header-actions" aria-label="User navigation">
        <button type="button" className="header-link">
          <Heart size={22} />
          <span>Wants</span>
        </button>

        <button type="button" className="header-link">
          <MessageSquare size={22} />
          <span>Messages</span>
        </button>

        <button type="button" className="icon-button notification-button" aria-label="Notifications">
          <Bell size={22} />
          <span className="count-badge">2</span>
        </button>

        <button type="button" className="icon-button" aria-label="Shopping cart">
          <ShoppingCart size={22} />
        </button>

        <button type="button" className="profile-button">
          <div className="avatar">P</div>
          <span>Audrey</span>
          <ChevronDown size={18} />
        </button>
      </nav>
    </header>
  );
}

function CategoryNav() {
  return (
    <nav className="category-nav" aria-label="Marketplace categories">
      {categories.map((category, index) => (
        <button
          type="button"
          key={category}
          className={index === 0 ? "category-button active" : "category-button"}
        >
          {category}
        </button>
      ))}
    </nav>
  );
}

function CheckboxRow({ label, count, checked = false }) {
  return (
    <label className="checkbox-row">
      <span>
        <input type="checkbox" defaultChecked={checked} />
        <span>{label}</span>
      </span>

      {count !== undefined && <small>{count.toLocaleString()}</small>}
    </label>
  );
}

function Filters() {
  return (
    <aside className="filters-card">
      <div className="filters-title-row">
        <h2>Filters</h2>
        <button type="button">Clear all</button>
      </div>

      <section className="filter-section">
        <h3>Item Type</h3>
        <CheckboxRow label="Singles" count={12345} checked />
        <CheckboxRow label="Sealed" count={2154} />
        <CheckboxRow label="Graded Cards" count={3247} />
        <CheckboxRow label="Accessories" count={1210} />
        <CheckboxRow label="Other" count={569} />
      </section>

      <section className="filter-section">
        <h3>Set</h3>
        <select aria-label="Select set">
          <option>Select a set</option>
          {sets.map((set) => (
            <option key={set}>{set}</option>
          ))}
        </select>
      </section>

      <section className="filter-section">
        <h3>Condition</h3>
        {conditions.map((condition, index) => (
          <CheckboxRow
            key={condition}
            label={condition}
            count={[8642, 2112, 1125, 469, 125][index]}
          />
        ))}
      </section>

      <section className="filter-section">
        <h3>Price</h3>
        <div className="price-row">
          <input type="text" placeholder="$ Min" aria-label="Minimum price" />
          <input type="text" placeholder="$ Max" aria-label="Maximum price" />
        </div>
      </section>

      <section className="filter-section">
        <h3>Language</h3>
        <CheckboxRow label="English" checked />
        <CheckboxRow label="Japanese" />
      </section>

      <section className="filter-section">
        <h3>Shipping</h3>
        <CheckboxRow label="Free shipping" />
        <CheckboxRow label="Local pickup" />
        <CheckboxRow label="Accepts trades" />
      </section>

      <section className="filter-section">
        <h3>Seller Location</h3>
        <input type="text" placeholder="Enter location" aria-label="Seller location" />
      </section>

      <button type="button" className="apply-button">
        Apply filters
      </button>
    </aside>
  );
}

function CardArt({ imageUrl, pokemon }) {
  return (
    <div className="card-art card-art-real">
      <img src={imageUrl} alt={`${pokemon} Pokemon card`} />
    </div>
  );
}

function ListingCard({ listing }) {
  return (
    <article className="listing-card">
      <button type="button" className="heart-button" aria-label={`Save ${listing.name}`}>
        <Heart size={22} />
      </button>

      <CardArt imageUrl={listing.imageUrl} pokemon={listing.pokemon} />

      <div className="listing-body">
        <h3>{listing.name}</h3>
        <p>{listing.set}</p>

        <div className="listing-badges">
          <span className="condition-badge">{listing.condition}</span>
          <span className={`status-badge ${listing.badgeType}`}>{listing.badge}</span>
        </div>

        <div className="listing-price">{listing.price}</div>

        <div className="seller-row">
          <span>{listing.seller}</span>
          <span className="seller-rating">
            <Star size={14} fill="currentColor" />
            {listing.rating}
          </span>
          <span className="review-count">({listing.reviews})</span>
        </div>

        <div className="listing-footer">
          <span>{listing.language}</span>
          {listing.tradeAccepted ? <span>Accepts trades</span> : <span>Buy only</span>}
        </div>
      </div>
    </article>
  );
}

function MarketplaceToolbar() {
  return (
    <div className="marketplace-toolbar">
      <div>
        <div className="results-count">12,345 results</div>
        <div className="results-subtitle">
          Pokemon-only listings from verified collectors and shops.
        </div>
      </div>

      <div className="toolbar-actions">
        <button type="button" className="mobile-filter-button">
          <SlidersHorizontal size={18} />
          Filters
        </button>

        <button type="button" className="sort-button">
          Sort by: Relevance
          <ChevronDown size={18} />
        </button>

        <button type="button" className="view-button active" aria-label="Grid view">
          <Grid2X2 size={22} />
        </button>

        <button type="button" className="view-button" aria-label="List view">
          <List size={22} />
        </button>
      </div>
    </div>
  );
}

function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Marketplace trust features">
      <div className="trust-item">
        <ShieldCheck size={24} />
        <div>
          <strong>Buyer Protection</strong>
          <span>Shop with confidence</span>
        </div>
      </div>

      <div className="trust-item">
        <Star size={24} />
        <div>
          <strong>Top Rated Sellers</strong>
          <span>Trusted Pokemon community</span>
        </div>
      </div>

      <div className="trust-item">
        <Truck size={24} />
        <div>
          <strong>Easy Returns</strong>
          <span>Hassle-free returns</span>
        </div>
      </div>

      <div className="trust-item">
        <Store size={24} />
        <div>
          <strong>Secure Payments</strong>
          <span>Protected checkout</span>
        </div>
      </div>
    </section>
  );
}

function PromoPanel() {
  return (
    <section className="promo-panel">
      <div className="promo-content">
        <div className="promo-kicker">Founding Traders</div>
        <h2>Build your binder. Match fair trades. Shop Pokemon-only.</h2>
        <p>
          A clean marketplace for singles, graded cards, sealed products, and collector-to-collector trades.
        </p>
      </div>

      <div className="promo-actions">
        <button type="button" className="primary-promo-button">
          Start Selling
        </button>
        <button type="button" className="secondary-promo-button">
          Upload Binder
        </button>
      </div>
    </section>
  );
}

function MobileBottomNav() {
  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
      <button type="button">
        <WalletCards size={22} />
        <span>Binder</span>
      </button>

      <button type="button">
        <Heart size={22} />
        <span>Wants</span>
      </button>

      <button type="button" className="active">
        <ShoppingBag size={22} />
        <span>Market</span>
      </button>

      <button type="button">
        <MessageSquare size={22} />
        <span>Messages</span>
      </button>

      <button type="button">
        <UserRound size={22} />
        <span>Profile</span>
      </button>
    </nav>
  );
}

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <CategoryNav />

      <main className="page-wrap">
        <PromoPanel />

        <div className="content-layout">
          <Filters />

          <section className="marketplace-section">
            <MarketplaceToolbar />

            <div className="active-filter-row">
              <span>Active filters:</span>
              <button type="button">
                Singles
                <X size={14} />
              </button>
              <button type="button">
                English
                <X size={14} />
              </button>
              <button type="button">
                Near Mint
                <X size={14} />
              </button>
              <button type="button">
                Accepts trades
                <X size={14} />
              </button>
            </div>

            <div className="listing-grid">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <TrustStrip />
      <MobileBottomNav />
    </div>
  );
}