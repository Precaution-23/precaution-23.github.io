import { configureStore} from "@reduxjs/toolkit";
import reset from "./reset_slice"

const store = configureStore({
    reducer: {
        reset
    },
})

export default store;