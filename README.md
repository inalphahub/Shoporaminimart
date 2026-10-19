# Shopora Mini Mart — E-Commerce

Shopora Mini Mart is a responsive frontend e-commerce experience built with HTML5, CSS3, vanilla JavaScript, JSON, and browser `localStorage`.

## Pages

- `index.html` — animated storefront landing page
- `shop.html` — full catalog with category filters and sorting
- `product.html?id=1` — product purpose, reasons to buy, pricing, reviews, and feedback
- `cart.html` — persistent cart and demo checkout
- `login.html`, `signup.html`, `auth.html` — login and signup flow
- `dashboard.html` — profile, orders, addresses, settings, and tracking
- `wishlist.html` — saved products
- `new-arrivals.html` — new products collection
- `deals.html` — flash deal collection
- `support.html` — FAQ and help page

## Included functionality

- Responsive desktop and mobile layouts
- Animated hero carousel, reveal transitions, hover states, and toast notifications
- Product catalog loaded from `data/products.json`
- Category navigation and related-product discovery
- Product details with purpose, “why buy this” guidance, ratings, reviews, and user feedback
- Cart, wishlist, account profile, addresses, and preferences stored in `localStorage`
- Demo checkout that creates orders with status and Google Maps tracking links
- Order cancellation from the dashboard
- Search suggestions, flash deals, newsletter validation, and mobile navigation

## Run locally

Because product data is loaded with `fetch()`, run the project through a local server such as VS Code Live Server:

1. Open the project folder in VS Code.
2. Start Live Server on `index.html`.
3. Open the generated local URL.

Do not open the files directly with `file://` if you want product data to load.

## Scope

This is a frontend demo. Authentication, orders, reviews, addresses, wishlist, and settings are local browser state. Checkout, payments, courier tracking, and Google Maps links are prepared demo integrations that can be connected to a backend and real service APIs later.
