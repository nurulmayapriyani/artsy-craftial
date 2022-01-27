import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import History from "./pages/History";
import ProductDetail from "./pages/ProductDetail";
import MyNavbar from "./components/myNavbar";
import "./App.css";
import { connect } from "react-redux";
import { userKeepLogin, checkStorage } from "./redux/actions/user";
import { getCartData } from "./redux/actions/cart";

class App extends React.Component {
  componentDidMount() {
    // jika kita tdk dpt data userLocalStorage brrti user blm login
    const userLocalStorage = localStorage.getItem("userDataEmmerce");

    if (userLocalStorage) {
      // JSON.parse mengubah object yg mnjd string menjadi object lagi
      const userData = JSON.parse(userLocalStorage);
      // alasan getCartData di simpan bersama userKeep Login karena kita mau ambil cart dari user yg sdh login
      this.props.userKeepLogin(userData);
      // getCartData meminta userId yg blm bisa kita dapatkan dri redux karena justru di dlm userKeepLogin dia yg set reduxnya tp kita bisa dapatkan dari variable userdata di atas
      this.props.getCartData(userData.id);
    } else {
      // jika ini tdk ada, ketika logout dan direfresh akan muncul Loading karena checkstorage tdk dipanggil maka tdk ada yg mengubah storageIsChecked menjadi true sdgkn storageIsChecked yg menjadi kunci utk masuk ke dlm aplikasi kita
      this.props.checkStorage();
    }
  }

  render() {
    // kondisi ketika refresh dan masih login
    if (this.props.userGlobal.storageIsChecked) {
      return (
        <div className="App">
          <BrowserRouter>
            <MyNavbar />
            <Routes>
              <Route element={<Login />} path="/login" />
              <Route element={<Register />} path="/register" />
              <Route element={<Admin />} path="/admin" />
              <Route element={<Cart />} path="/cart" />
              <Route element={<History />} path="/history" />
              <Route
                element={<ProductDetail />}
                path="/product-detail/:productId"
              />
              <Route element={<Home />} path="/" />
            </Routes>
          </BrowserRouter>
        </div>
      );
    }

    // kondisi ketika refresh tidak login
    return <div>Loading...</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

const mapDispatchToProps = {
  userKeepLogin,
  checkStorage,
  getCartData,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);