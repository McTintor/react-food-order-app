import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./UI/CartItem";

export default function Cart() {
    
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0);

    function handleCloseCart() {
        userProgressCtx.hideCart();
    }

    function handleGoToCheckout() {
        userProgressCtx.showCheckout();
    }
     
    return (
        <>
            <Modal onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null} className="cart" open={userProgressCtx.progress === 'cart'}>
                <h2>Your Cart</h2>
                <ul>
                    {cartCtx.items.map((item) => (
                        <CartItem onDecrease={() => cartCtx.removeItem(item.id)} onIncrease={() => cartCtx.addItem(item)} key={item.id} name={item.name} quantity={item.quantity} price={item.price}/>
                    ))}
                </ul>
                <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
                <p className="modal-actions">
                    <Button onClick={handleCloseCart} textOnly>Close</Button>
                    {cartCtx.items.length > 0 && (
                        <Button onClick={handleGoToCheckout}>Go To Checkout</Button>
                    )}        
                </p>
            </Modal>
        </>
    )
}