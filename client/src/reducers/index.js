import { combineReducers } from "redux";

import posts from './posts'
import auth from "./OAuth";

export default combineReducers({ posts, auth})