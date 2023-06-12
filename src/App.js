import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import { useSelector, useDispatch } from "react-redux";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { uiActions } from "./components/Store/ui-slice";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const toggle = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  console.log(cart);

  const sendCartData = async () => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending ...",
        message: "Sending Cart Data",
      })
    );
    const response = await fetch(
      "https://redux-advance-cart-default-rtdb.firebaseio.com/cart.json",
      {
        method: "PUT",
        body: JSON.stringify(cart),
      }
    );
    if (!response.ok) {
      throw new Error("Sending cart data failed");
    }

    dispatch(
      uiActions.showNotification({
        status: "success",
        title: "Success!",
        message: "Sent cart data successfully",
      })
    );
  };

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sent cart data failed",
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {toggle && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
