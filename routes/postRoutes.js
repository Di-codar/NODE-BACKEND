import e from "express"
import { del1post, createPost, get1post, getAllPosts, update1post, } from "../controllers/postcontroller.js";
import authorize from "../middlewares/authorize.js";
const router = e.Router();

router.post('/',authorize(["Admin","User"]), createPost);

router.get('/', getAllPosts);

router.get('/:id', get1post);

router.delete('/:id', del1post);

router.put('/:id', update1post);

export default router