# Angular 21 E-Commerce Application

A modern e-commerce application built with Angular 21, featuring product listings, shopping cart functionality, and a checkout process.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation & Running

```bash
# Install dependencies
npm install

# Start development server
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/` to see the application running.

### Building for Production

```bash
ng build
```

## 📋 Application Features

This e-commerce application includes:

1. **Product Listing**
   - Display products with images, prices, and ratings
   - Filter by category
   - Search functionality
   - Sort by various criteria
   - Discount badges

2. **Shopping Cart**
   - Add/remove products
   - Update quantities
   - Persistent cart (localStorage)
   - Real-time price calculations

3. **Checkout**
   - Customer information form
   - Shipping address
   - Payment details (mock)
   - Order summary


## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── product-list/    # Product listing with filters
│   │   ├── cart/             # Shopping cart
│   │   ├── checkout/         # Checkout flow
│   │   └── header/           # Navigation header
│   ├── services/
│   │   ├── product.service.ts
│   │   └── cart.service.ts
│   ├── models/
│   │   └── product.model.ts
│   └── app.routes.ts
└── styles.scss
```


## 🔧 Technologies Used

- **Angular 21** (Standalone components)
- **TypeScript**
- **SCSS** for styling
- **RxJS** for reactive programming
- **Angular Router** for navigation
- **FormsModule** for form handling

## 📝 Notes

- All data is mocked (no real backend)
- localStorage is used for cart persistence
- No actual payment processing
- Images are placeholders