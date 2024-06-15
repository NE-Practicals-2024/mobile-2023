import { Router } from "express";
import tokenRouter from "./token.route";

const router = Router()

router.use("/token", tokenRouter
    /*
        #swagger.tags = ['Tokens']
    */
)
export default router