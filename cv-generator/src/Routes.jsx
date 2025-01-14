const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/collection", element: <Collection /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/product/:productId", element: <Product /> },
      { path: "/cart", element: <Cart /> },
      { path: "/login", element: <Login /> },
      { path: "/place-order", element: <PlaceOrder /> },
      { path: "/orders", element: <Orders /> },
    ],
  },
];

export default routes;
