import {Provider} from "react-redux";
import {store} from "./redux/store.ts";
import {RouterProvider} from "react-router";
import {routes} from "./routes/routes.tsx";

function App() {

    return (
        <Provider store={store}>
            <RouterProvider router={routes}/>
        </Provider>
    );
}

export default App
