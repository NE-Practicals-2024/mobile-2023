import { Router } from "express";
import tokenController from "../controllers/token.controller"
import { validationMiddleware } from "../middlewares/token.validator";
import { PurchaseTokenDTO } from "../dtos/token.dto";
const tokenRouter = Router()

tokenRouter.get("/validate/:token", tokenController.validateToken)
tokenRouter.get("/by-meter-number/:meter", tokenController.getTokensByMeterNumber)
tokenRouter.post("/purchase", [validationMiddleware(PurchaseTokenDTO)], tokenController.purchaseToken)

export default tokenRouter;