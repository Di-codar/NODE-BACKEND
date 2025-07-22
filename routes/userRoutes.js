import e from "express"
import { del1user, forlogin, forsignup, get1user, getAllUsers, update1user } from "../controllers/usercontroller.js";
import authorize from "../middlewares/authorize.js";
const router = e.Router();

router.post('/register', forsignup);

router.get('/', getAllUsers);

router.get('/', get1user);

router.delete('/:id', authorize(['Admin']), del1user);

router.put('/:id', update1user);

router.post('/login', forlogin);

export default router
