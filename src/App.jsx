import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  Box,
  Camera,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Grid2X2,
  Heart,
  Home,
  ImagePlus,
  List,
  MessageSquare,
  PackageCheck,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  SlidersHorizontal,
  Star,
  Store,
  Truck,
  UploadCloud,
  UserRound,
  WalletCards,
  X
} from "lucide-react";
import "./App.css";
import { initialListings } from "./data/listings.js";
import { messages } from "./data/messages.js";
import { categories, conditions, setOptions, itemTypeOptions, conditionCounts, languageOptions, shippingOptions } from "./data/filters.js";

function money(value) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });
}

function getRouteFromHash() {
  const rawHash = window.location.hash.replace("#", "").replace("/", "");
  const parts = rawHash.split("/").filter(Boolean);

  if (parts.length === 0) {
    return {
      page: "market",
      listingId: null
    };
  }

  if (parts[0] === "card" && parts[1]) {
    return {
      page: "detail",
      listingId: Number.parseInt(parts[1], 10)
    };
  }

  const allowedPages = ["market", "binder", "wants", "messages", "cart", "profile", "sell", "upload"];

  if (allowedPages.includes(parts[0])) {
    return {
      page: parts[0],
      listingId: null
    };
  }

  return {
    page: "market",
    listingId: null
  };
}

function routeToHash(page, listingId = null) {
  if (page === "detail" && listingId) {
    return "#/card/" + listingId;
  }

  return "#/" + page;
}

export default function App() {
  const initialRoute = getRouteFromHash();
  const [activePage, setActivePage] = useState(initialRoute.page);
  const [activeCategory, setActiveCategory] = useState("All Items");
  const [searchText, setSearchText] = useState("");
  const [sortMode, setSortMode] = useState("relevance");
  const [savedIds, setSavedIds] = useState([2, 7]);
  const [selectedListingId, setSelectedListingId] = useState(initialRoute.listingId);

  useEffect(() => {
    function handleHashChange() {
      const nextRoute = getRouteFromHash();
      setActivePage(nextRoute.page);
      setSelectedListingId(nextRoute.listingId);
    }

    window.addEventListener("hashchange", handleHashChange);

    if (!window.location.hash) {
      window.location.hash = routeToHash("market");
    }

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);
  const [filters, setFilters] = useState({
    itemTypes: ["Singles"],
    conditions: [],
    languages: ["English"],
    shipping: ["Accepts trades"],
    priceMin: "",
    priceMax: ""
  });

  const selectedListing = initialListings.find((item) => item.id === selectedListingId);

  const filteredListings = useMemo(() => {
    let items = [...initialListings];

    if (activeCategory !== "All Items") {
      items = items.filter((item) => item.category === activeCategory);
    }

    if (filters.itemTypes.length > 0) {
      items = items.filter((item) => filters.itemTypes.includes(item.category));
    }

    if (filters.conditions.length > 0) {
      items = items.filter((item) => filters.conditions.includes(item.condition));
    }

    if (filters.languages.length > 0) {
      items = items.filter((item) => filters.languages.includes(item.language));
    }

    if (filters.shipping.length > 0) {
      items = items.filter((item) => {
        const wantsFreeShipping = filters.shipping.includes("Free shipping");
        const wantsLocalPickup = filters.shipping.includes("Local pickup");
        const wantsTrades = filters.shipping.includes("Accepts trades");

        return (
          (wantsFreeShipping && item.badge === "FREE shipping") ||
          (wantsLocalPickup && item.badge === "Local pickup") ||
          (wantsTrades && item.tradeAccepted)
        );
      });
    }

    const minPrice = Number.parseFloat(filters.priceMin);
    const maxPrice = Number.parseFloat(filters.priceMax);

    if (!Number.isNaN(minPrice)) {
      items = items.filter((item) => item.priceValue >= minPrice);
    }

    if (!Number.isNaN(maxPrice)) {
      items = items.filter((item) => item.priceValue <= maxPrice);
    }

    const query = searchText.trim().toLowerCase();

    if (query.length > 0) {
      items = items.filter((item) => {
        return (
          item.name.toLowerCase().includes(query) ||
          item.set.toLowerCase().includes(query) ||
          item.seller.toLowerCase().includes(query) ||
          item.pokemon.toLowerCase().includes(query)
        );
      });
    }

    if (sortMode === "priceLow") {
      items.sort((a, b) => a.priceValue - b.priceValue);
    }

    if (sortMode === "priceHigh") {
      items.sort((a, b) => b.priceValue - a.priceValue);
    }

    if (sortMode === "rating") {
      items.sort((a, b) => b.rating - a.rating);
    }

    return items;
  }, [activeCategory, searchText, sortMode, filters]);

  const savedListings = initialListings.filter((item) => savedIds.includes(item.id));
  const binderValue = initialListings.reduce((total, item) => total + item.priceValue, 0);

  function toggleSaved(id) {
    setSavedIds((current) => {
      if (current.includes(id)) {
        return current.filter((itemId) => itemId !== id);
      }

      return [...current, id];
    });
  }

  function toggleFilter(group, value) {
    setFilters((current) => {
      const currentValues = current[group];

      if (currentValues.includes(value)) {
        return {
          ...current,
          [group]: currentValues.filter((item) => item !== value)
        };
      }

      return {
        ...current,
        [group]: [...currentValues, value]
      };
    });
  }

  function updatePriceFilter(field, value) {
    setFilters((current) => ({
      ...current,
      [field]: value
    }));
  }

  function removeFilter(group, value) {
    setFilters((current) => ({
      ...current,
      [group]: current[group].filter((item) => item !== value)
    }));
  }

  function clearFilters() {
    setFilters({
      itemTypes: [],
      conditions: [],
      languages: [],
      shipping: [],
      priceMin: "",
      priceMax: ""
    });
  }

  function goToPage(page) {
    setSelectedListingId(null);
    setActivePage(page);
    window.location.hash = routeToHash(page);
  }

  function openListing(id) {
    setSelectedListingId(id);
    setActivePage("detail");
    window.location.hash = routeToHash("detail", id);
  }

  return (
    <div className="app-shell">
      <Header
        activePage={activePage}
        setActivePage={goToPage}
        searchText={searchText}
        setSearchText={setSearchText}
      />

      <CategoryNav
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        setActivePage={goToPage}
      />

      <main className="page-wrap">
        {activePage === "market" && (
          <MarketPage
            listings={filteredListings}
            savedIds={savedIds}
            toggleSaved={toggleSaved}
            openListing={openListing}
            sortMode={sortMode}
            setSortMode={setSortMode}
            filters={filters}
            toggleFilter={toggleFilter}
            updatePriceFilter={updatePriceFilter}
            removeFilter={removeFilter}
            clearFilters={clearFilters}
            setActivePage={goToPage}
          />
        )}

        {activePage === "binder" && (
          <BinderPage
            listings={initialListings}
            binderValue={binderValue}
            openListing={openListing}
            savedIds={savedIds}
            toggleSaved={toggleSaved}
          />
        )}

        {activePage === "wants" && (
          <WantsPage
            listings={savedListings}
            openListing={openListing}
            savedIds={savedIds}
            toggleSaved={toggleSaved}
          />
        )}

        {activePage === "messages" && <MessagesPage />}
        {activePage === "cart" && <CartPage listings={savedListings.slice(0, 3)} />}
        {activePage === "profile" && <ProfilePage />}
        {activePage === "sell" && <SellerPage />}
        {activePage === "upload" && <UploadBinderPage />}
        {activePage === "detail" && selectedListing && (
          <ListingDetailPage
            listing={selectedListing}
            isSaved={savedIds.includes(selectedListing.id)}
            toggleSaved={toggleSaved}
            setActivePage={goToPage}
          />
        )}
      </main>

      <TrustStrip />
      <MobileBottomNav activePage={activePage} setActivePage={goToPage} />
    </div>
  );
}

function Header({ activePage, setActivePage, searchText, setSearchText }) {
  return (
    <header className="top-header">
      <button type="button" className="brand-wrap brand-button" onClick={() => setActivePage("market")}>
        <div className="brand-mark">
          <div className="brand-mark-top"></div>
          <div className="brand-mark-center"></div>
          <div className="brand-mark-bottom"></div>
        </div>

        <div>
          <div className="brand-name">Poke Booth</div>
          <div className="brand-tagline">Trade. Collect. Connect.</div>
        </div>
      </button>

      <div className="search-wrap">
        <input
          type="text"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="Search cards, sets, or Pokemon..."
          aria-label="Search cards, sets, or Pokemon"
        />
        <button type="button" className="search-button" aria-label="Search" onClick={() => setActivePage("market")}>
          <Search size={24} />
        </button>
      </div>

      <nav className="header-actions" aria-label="User navigation">
        <button type="button" className={activePage === "wants" ? "header-link active" : "header-link"} onClick={() => setActivePage("wants")}>
          <Heart size={22} />
          <span>Wants</span>
        </button>

        <button type="button" className={activePage === "messages" ? "header-link active" : "header-link"} onClick={() => setActivePage("messages")}>
          <MessageSquare size={22} />
          <span>Messages</span>
        </button>

        <button type="button" className="icon-button notification-button" aria-label="Notifications" onClick={() => setActivePage("messages")}>
          <Bell size={22} />
          <span className="count-badge">2</span>
        </button>

        <button type="button" className="icon-button" aria-label="Shopping cart" onClick={() => setActivePage("cart")}>
          <ShoppingCart size={22} />
        </button>

        <button type="button" className="profile-button" onClick={() => setActivePage("profile")}>
          <div className="avatar">P</div>
          <span>TrainerJake</span>
          <ChevronDown size={18} />
        </button>
      </nav>
    </header>
  );
}

function CategoryNav({ activeCategory, setActiveCategory, setActivePage }) {
  return (
    <nav className="category-nav" aria-label="Marketplace categories">
      {categories.map((category) => (
        <button
          type="button"
          key={category}
          className={activeCategory === category ? "category-button active" : "category-button"}
          onClick={() => {
            setActiveCategory(category);
            setActivePage("market");
          }}
        >
          {category}
        </button>
      ))}
    </nav>
  );
}

function MarketPage({
  listings,
  savedIds,
  toggleSaved,
  openListing,
  sortMode,
  setSortMode,
  filters,
  toggleFilter,
  updatePriceFilter,
  removeFilter,
  clearFilters,
  setActivePage
}) {
  return (
    <>
      <PromoPanel setActivePage={setActivePage} />

      <div className="content-layout">
        <Filters
          filters={filters}
          toggleFilter={toggleFilter}
          updatePriceFilter={updatePriceFilter}
          clearFilters={clearFilters}
        />

        <section className="marketplace-section">
          <MarketplaceToolbar
            resultCount={listings.length}
            sortMode={sortMode}
            setSortMode={setSortMode}
          />

          <ActiveFilters filters={filters} removeFilter={removeFilter} clearFilters={clearFilters} />

          <ListingGrid
            listings={listings}
            savedIds={savedIds}
            toggleSaved={toggleSaved}
            openListing={openListing}
          />
        </section>
      </div>
    </>
  );
}

function PromoPanel({ setActivePage }) {
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
        <button type="button" className="primary-promo-button" onClick={() => setActivePage("sell")}>
          Start Selling
        </button>
        <button type="button" className="secondary-promo-button" onClick={() => setActivePage("upload")}>
          Upload Binder
        </button>
      </div>
    </section>
  );
}

function Filters({ filters, toggleFilter, updatePriceFilter, clearFilters }) {
  return (
    <aside className="filters-card">
      <div className="filters-title-row">
        <h2>Filters</h2>
        <button type="button" onClick={clearFilters}>Clear all</button>
      </div>

      <section className="filter-section">
        <h3>Item Type</h3>
        {itemTypeOptions.map((itemType) => (
          <CheckboxRow
            key={itemType.label}
            label={itemType.label}
            count={itemType.count}
            checked={filters.itemTypes.includes(itemType.label)}
            onChange={() => toggleFilter("itemTypes", itemType.label)}
          />
        ))}
      </section>

      <section className="filter-section">
        <h3>Set</h3>
        <select aria-label="Select set">
          <option>Select a set</option>
          {setOptions.map((setName) => (
            <option key={setName}>{setName}</option>
          ))}
        </select>
      </section>

      <section className="filter-section">
        <h3>Condition</h3>
        {conditions.map((condition, index) => (
          <CheckboxRow
            key={condition}
            label={condition}
            count={conditionCounts[index]}
            checked={filters.conditions.includes(condition)}
            onChange={() => toggleFilter("conditions", condition)}
          />
        ))}
      </section>

      <section className="filter-section">
        <h3>Price</h3>
        <div className="price-row">
          <input
            type="text"
            value={filters.priceMin}
            onChange={(event) => updatePriceFilter("priceMin", event.target.value)}
            placeholder="$ Min"
            aria-label="Minimum price"
          />
          <input
            type="text"
            value={filters.priceMax}
            onChange={(event) => updatePriceFilter("priceMax", event.target.value)}
            placeholder="$ Max"
            aria-label="Maximum price"
          />
        </div>
      </section>

      <section className="filter-section">
        <h3>Language</h3>
        {languageOptions.map((language) => (
          <CheckboxRow
            key={language}
            label={language}
            checked={filters.languages.includes(language)}
            onChange={() => toggleFilter("languages", language)}
          />
        ))}
      </section>

      <section className="filter-section">
        <h3>Shipping</h3>
        {shippingOptions.map((shippingOption) => (
          <CheckboxRow
            key={shippingOption}
            label={shippingOption}
            checked={filters.shipping.includes(shippingOption)}
            onChange={() => toggleFilter("shipping", shippingOption)}
          />
        ))}
      </section>

      <button type="button" className="apply-button">
        Apply filters
      </button>
    </aside>
  );
}

function CheckboxRow({ label, count, checked = false, onChange }) {
  return (
    <label className="checkbox-row">
      <span>
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span>{label}</span>
      </span>

      {count !== undefined && <small>{count.toLocaleString()}</small>}
    </label>
  );
}

function MarketplaceToolbar({ resultCount, sortMode, setSortMode }) {
  return (
    <div className="marketplace-toolbar">
      <div>
        <div className="results-count">{resultCount.toLocaleString()} results</div>
        <div className="results-subtitle">
          Pokemon-only listings from verified collectors and shops.
        </div>
      </div>

      <div className="toolbar-actions">
        <button type="button" className="mobile-filter-button">
          <SlidersHorizontal size={18} />
          Filters
        </button>

        <select
          className="sort-select"
          value={sortMode}
          onChange={(event) => setSortMode(event.target.value)}
          aria-label="Sort listings"
        >
          <option value="relevance">Sort by: Relevance</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>

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

function ActiveFilters({ filters, removeFilter, clearFilters }) {
  const filterGroups = [
    { key: "itemTypes", values: filters.itemTypes },
    { key: "conditions", values: filters.conditions },
    { key: "languages", values: filters.languages },
    { key: "shipping", values: filters.shipping }
  ];

  const priceFilters = [];

  if (filters.priceMin.trim().length > 0) {
    priceFilters.push({ label: "Min $" + filters.priceMin, field: "priceMin" });
  }

  if (filters.priceMax.trim().length > 0) {
    priceFilters.push({ label: "Max $" + filters.priceMax, field: "priceMax" });
  }

  const hasFilters =
    filterGroups.some((group) => group.values.length > 0) ||
    priceFilters.length > 0;

  if (!hasFilters) {
    return (
      <div className="active-filter-row">
        <span>No active filters</span>
      </div>
    );
  }

  return (
    <div className="active-filter-row">
      <span>Active filters:</span>

      {filterGroups.map((group) =>
        group.values.map((value) => (
          <button type="button" key={group.key + value} onClick={() => removeFilter(group.key, value)}>
            {value}
            <X size={14} />
          </button>
        ))
      )}

      {priceFilters.map((filter) => (
        <button type="button" key={filter.field} onClick={clearFilters}>
          {filter.label}
          <X size={14} />
        </button>
      ))}

      <button type="button" className="clear-chip" onClick={clearFilters}>
        Clear all
      </button>
    </div>
  );
}
function ListingGrid({ listings, savedIds, toggleSaved, openListing }) {
  if (listings.length === 0) {
    return (
      <div className="empty-state">
        <Search size={36} />
        <h3>No cards found</h3>
        <p>Try a different search, category, or filter.</p>
      </div>
    );
  }

  return (
    <div className="listing-grid">
      {listings.map((listing) => (
        <ListingCard
          key={listing.id}
          listing={listing}
          isSaved={savedIds.includes(listing.id)}
          toggleSaved={toggleSaved}
          openListing={openListing}
        />
      ))}
    </div>
  );
}

function ListingCard({ listing, isSaved, toggleSaved, openListing }) {
  return (
    <article className="listing-card" onClick={() => openListing(listing.id)}>
      <button
        type="button"
        className={isSaved ? "heart-button saved" : "heart-button"}
        aria-label={"Save " + listing.name}
        onClick={(event) => {
          event.stopPropagation();
          toggleSaved(listing.id);
        }}
      >
        <Heart size={22} fill={isSaved ? "currentColor" : "none"} />
      </button>

      <CardArt imageUrl={listing.imageUrl} pokemon={listing.pokemon} />

      <div className="listing-body">
        <h3>{listing.name}</h3>
        <p>{listing.set}</p>

        <div className="listing-badges">
          <span className="condition-badge">{listing.condition}</span>
          <span className={"status-badge " + listing.badgeType}>{listing.badge}</span>
        </div>

        <div className="listing-price">{money(listing.priceValue)}</div>

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

function CardArt({ imageUrl, pokemon }) {
  return (
    <div className="card-art">
      <img
        src={imageUrl}
        alt={pokemon + " Pokemon card"}
        loading="lazy"
        onError={(event) => {
          event.currentTarget.style.display = "none";
          event.currentTarget.parentElement.classList.add("card-art-missing");
          event.currentTarget.parentElement.setAttribute("data-card-name", pokemon);
        }}
      />
    </div>
  );
}

function BinderPage({ listings, binderValue, openListing, savedIds, toggleSaved }) {
  return (
    <section className="standard-page">
      <PageHero
        eyebrow="My Binder"
        title="Your digital trade binder"
        description="Track collection value, trade status, and cards ready to move."
      />

      <div className="stats-grid">
        <StatCard label="Binder value" value={money(binderValue)} icon={<WalletCards size={24} />} />
        <StatCard label="Tradeable cards" value="86" icon={<PackageCheck size={24} />} />
        <StatCard label="Want matches" value="12" icon={<Heart size={24} />} />
        <StatCard label="Completion" value="68%" icon={<CheckCircle2 size={24} />} />
      </div>

      <ListingGrid
        listings={listings}
        savedIds={savedIds}
        toggleSaved={toggleSaved}
        openListing={openListing}
      />
    </section>
  );
}

function WantsPage({ listings, openListing, savedIds, toggleSaved }) {
  return (
    <section className="standard-page">
      <PageHero
        eyebrow="Want List"
        title="Cards you are watching"
        description="Saved cards appear here. Use hearts on marketplace cards to add or remove wants."
      />

      <ListingGrid
        listings={listings}
        savedIds={savedIds}
        toggleSaved={toggleSaved}
        openListing={openListing}
      />
    </section>
  );
}

function MessagesPage() {
  return (
    <section className="standard-page">
      <PageHero
        eyebrow="Messages"
        title="Collector inbox"
        description="A clean place for offers, trade requests, closeup photos, and seller updates."
      />

      <div className="message-list">
        {messages.map((message) => (
          <article className="message-card" key={message.subject}>
            <div>
              <h3>{message.subject}</h3>
              <span>{message.from}</span>
            </div>
            <p>{message.body}</p>
            <small>{message.time}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function CartPage({ listings }) {
  const total = listings.reduce((sum, item) => sum + item.priceValue, 0);

  return (
    <section className="standard-page">
      <PageHero
        eyebrow="Cart"
        title="Review your sample cart"
        description="Checkout is not connected yet. This is a front-end prototype for the cart flow."
      />

      <div className="split-layout">
        <div className="checkout-list">
          {listings.map((item) => (
            <div className="mini-listing" key={item.id}>
              <img src={item.imageUrl} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>{item.condition} - {item.seller}</p>
              </div>
              <strong>{money(item.priceValue)}</strong>
            </div>
          ))}
        </div>

        <div className="checkout-summary">
          <h3>Order Summary</h3>
          <div><span>Subtotal</span><strong>{money(total)}</strong></div>
          <div><span>Shipping</span><strong>Calculated later</strong></div>
          <div><span>Buyer protection</span><strong>Included</strong></div>
          <button type="button" className="primary-promo-button full-width">Continue Checkout</button>
        </div>
      </div>
    </section>
  );
}

function ProfilePage() {
  return (
    <section className="standard-page">
      <PageHero
        eyebrow="Profile"
        title="TrainerJake"
        description="Trusted collector profile with trade history, badges, response rate, and public binder."
      />

      <div className="profile-grid">
        <div className="profile-card large">
          <div className="profile-avatar">P</div>
          <h3>TrainerJake</h3>
          <p>Modern singles, alt arts, and set completion collector.</p>
          <div className="badge-row">
            <span>47 completed trades</span>
            <span>4.9 rating</span>
            <span>Fast shipper</span>
          </div>
        </div>

        <StatCard label="Response rate" value="98%" icon={<MessageSquare size={24} />} />
        <StatCard label="Completed sales" value="123" icon={<Store size={24} />} />
        <StatCard label="Local friendly" value="Yes" icon={<Home size={24} />} />
      </div>
    </section>
  );
}

function SellerPage() {
  return (
    <section className="standard-page">
      <PageHero
        eyebrow="Start Selling"
        title="Open your Pokemon booth"
        description="Create listings, accept trades, manage orders, and build seller reputation."
      />

      <div className="step-grid">
        <StepCard number="1" title="Create your booth" text="Add shop name, location, return policy, and seller profile." icon={<Store size={24} />} />
        <StepCard number="2" title="List your cards" text="Upload front/back images, condition, language, set, and price." icon={<ImagePlus size={24} />} />
        <StepCard number="3" title="Sell or trade" text="Accept direct purchases, trade offers, local pickup, or mail trades." icon={<CircleDollarSign size={24} />} />
      </div>
    </section>
  );
}

function UploadBinderPage() {
  return (
    <section className="standard-page">
      <PageHero
        eyebrow="Upload Binder"
        title="Import your collection"
        description="This page will eventually scan binder photos and build a collection list."
      />

      <div className="upload-box">
        <UploadCloud size={48} />
        <h3>Drop binder photos here</h3>
        <p>Supported later: front images, back images, CSV imports, and TCG collection files.</p>
        <button type="button" className="primary-promo-button">
          Choose Files
        </button>
      </div>

      <div className="step-grid">
        <StepCard number="1" title="Upload images" text="Add binder pages, individual cards, or CSV inventory." icon={<Camera size={24} />} />
        <StepCard number="2" title="Review matches" text="Confirm card name, set, condition, language, and quantity." icon={<CheckCircle2 size={24} />} />
        <StepCard number="3" title="Mark status" text="Choose Keep, Sell, Trade, or Want for each card." icon={<Box size={24} />} />
      </div>
    </section>
  );
}

function ListingDetailPage({ listing, isSaved, toggleSaved, setActivePage }) {
  return (
    <section className="detail-page">
      <button type="button" className="back-button" onClick={() => setActivePage("market")}>
        Back to marketplace
      </button>

      <div className="detail-layout">
        <div className="detail-image-card">
          <img src={listing.imageUrl} alt={listing.name} />
        </div>

        <div className="detail-info">
          <div className="promo-kicker">{listing.category}</div>
          <h1>{listing.name}</h1>
          <p>{listing.set}</p>

          <div className="detail-price">{money(listing.priceValue)}</div>

          <div className="listing-badges">
            <span className="condition-badge">{listing.condition}</span>
            <span className={"status-badge " + listing.badgeType}>{listing.badge}</span>
            {listing.tradeAccepted && <span className="status-badge blue">Accepts trades</span>}
          </div>

          <div className="seller-detail-card">
            <strong>{listing.seller}</strong>
            <span><Star size={15} fill="currentColor" /> {listing.rating} rating from {listing.reviews} reviews</span>
          </div>

          <div className="detail-actions">
            <button type="button" className="primary-promo-button">Buy Now</button>
            <button type="button" className="secondary-promo-button">Make Offer</button>
            <button type="button" className={isSaved ? "secondary-promo-button saved-action" : "secondary-promo-button"} onClick={() => toggleSaved(listing.id)}>
              {isSaved ? "Saved" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function PageHero({ eyebrow, title, description }) {
  return (
    <section className="page-hero">
      <div className="promo-kicker">{eyebrow}</div>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <article className="stat-card">
      <div className="stat-icon">{icon}</div>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

function StepCard({ number, title, text, icon }) {
  return (
    <article className="step-card">
      <div className="step-top">
        <span>{number}</span>
        {icon}
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
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

function MobileBottomNav({ activePage, setActivePage }) {
  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
      <button type="button" className={activePage === "binder" ? "active" : ""} onClick={() => setActivePage("binder")}>
        <WalletCards size={22} />
        <span>Binder</span>
      </button>

      <button type="button" className={activePage === "wants" ? "active" : ""} onClick={() => setActivePage("wants")}>
        <Heart size={22} />
        <span>Wants</span>
      </button>

      <button type="button" className={activePage === "market" ? "active" : ""} onClick={() => setActivePage("market")}>
        <ShoppingBag size={22} />
        <span>Market</span>
      </button>

      <button type="button" className={activePage === "messages" ? "active" : ""} onClick={() => setActivePage("messages")}>
        <MessageSquare size={22} />
        <span>Messages</span>
      </button>

      <button type="button" className={activePage === "profile" ? "active" : ""} onClick={() => setActivePage("profile")}>
        <UserRound size={22} />
        <span>Profile</span>
      </button>
    </nav>
  );
}