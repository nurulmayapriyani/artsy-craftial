const init_state = {
  username: "",
  fullName: "",
  email: "",
  role: "",
  id: 0,
  errMsg: "",
  // storageIsChecked: penanda jika userLocalStorage di App.jsx sdh dicek atau blm, tdk peduli user blm atau sdh login, storageIsChecked perlu menjadi true utk bisa masuk ke dlm app kita yaitu di dlm render di App.jsx
  storageIsChecked: false,
};

const reducer = (state = init_state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      // result.data pd user di actions menyimpan field yg sama dg init_state di atas, maka otomatis ketika direturn akan mengganti semua field yg ada di init_state
      // jadi pastikan nama field di init_state sama persis dg yg ada di db.json
      // password tdk ada di init_state karena kita tdk ingin menunjukkan password si usernya
      // tp di result.data kita akan mengirim sebuah field baru yaitu password jd akan ttp masuk ke reducer kita
      return { ...state, ...action.payload, storageIsChecked: true };
    case "USER_ERROR":
      return { ...state, errMsg: action.payload };
    case "USER_LOGOUT":
      // init_state: to reset values in init_state as its declare at the first time above
      return { ...init_state, storageIsChecked: true };
    case "CHECK_STORAGE": // we make it true when CHECK_STORAGE action is called.
      return { ...state, storageIsChecked: true };
    default:
      return state;
  }
};

export default reducer;
