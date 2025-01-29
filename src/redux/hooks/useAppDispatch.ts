import {store} from "../store.ts";
import {useSelector} from "react-redux";

export const useAppDispatch = useSelector.withTypes<typeof store.dispatch>();