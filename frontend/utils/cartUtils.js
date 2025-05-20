export const addDecimal = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // Calculate items price
  addDecimal(
    (state.itemsPrice = state.cartItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    ))
  );

  // Shipping fee (If order is over $100 then free, else $10 shipping fee)
  state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 10);

  // Calculate tax price (15% tax)
  state.taxPrice = addDecimal(Number(0.15 * state.itemsPrice).toFixed(2));

  // Calculate total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);
  localStorage.setItem("cart", JSON.stringify(state));
};
