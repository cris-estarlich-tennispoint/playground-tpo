# Project Documentation: React E-Commerce Exercise

## What the Exercise Is About

This project is a **mini e-commerce / product catalog** app—a typical introductory React exercise with a product listing, shopping cart, and wishlist.

---

## Core Concept

Build a **product category page** where users can:

- **Browse products** (fetched from a backend API)
- **Add to cart** — products go into a sidebar cart
- **Add to wishlist** — save products for later
- **Remove from cart** — take items out
- **See total** — cart shows a sum and checkout button

---

## Concepts You’ll Learn

| Concept | How It's Used |
|---------|---------------|
| **Fetching data** | `ProductList` uses `useEffect` + `fetch` to load products from `http://localhost:3001/api/products` |
| **State management** | `CategoryPage` holds `productsInBasket` and `productsInWishlist` with `useState` |
| **Props & callbacks** | `addToCart`, `addToWishlist`, `removeFromCart` passed down to child components |
| **Component composition** | `CategoryPage` → `Header`, `ProductList`, `Cart`, `Wishlist` → `ProductTile` |
| **Lists & keys** | Products rendered with `.map()` and `key={product.id}` |
| **Full-stack setup** | React frontend + Express backend (port 3001) |

---

## Project Structure

```
Frontend (Vite + React)
├── CategoryPage      → Main page, owns cart/wishlist state
├── Header            → Cart & wishlist badge counts
├── ProductList       → Fetches products, renders grid
├── Product (tile)    → Single product card with add/remove actions
├── Cart              → Sidebar cart with total & checkout
└── Wishlist          → Sidebar wishlist

Backend (Express)
├── GET  /api/products        → List all products
├── GET  /api/products/:id    → Single product
├── GET  /api/basket/products → Cart items (not wired to frontend yet)
├── POST /api/basket/product  → Add to cart
├── GET  /api/wishlist/products → Wishlist items (not wired to frontend yet)
└── POST /api/wishlist/product  → Add to wishlist
```

---

## Tech Stack

- **React 19** — UI library
- **Vite 7** — Build tool & dev server
- **Bun** — Runtime & package manager
- **TypeScript** — Type checking
- **Tailwind CSS** — Styling
- **Express** — Backend API
- **react-hot-toast** — Toast notifications

---

## How to Run

1. **Start the backend** (from project root):
   ```bash
   cd backend
   bun install
   bun run start
   # or: bun run index.ts
   ```

2. **Start the frontend** (from project root):
   ```bash
   bun install
   bun run dev
   ```

3. Open `http://localhost:5173` in your browser.

---

## Summary

This is a **mini shopping app** for learning React fundamentals: `useState`, `useEffect`, props, callbacks, and component composition, with a simple REST API backend. The frontend currently uses local state for cart and wishlist rather than persisting via the backend basket/wishlist endpoints.
