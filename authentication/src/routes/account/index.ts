import express, { Router } from "express";
import { decodeToken } from "../../middleware";
import { verifyAccount } from "../../controllers/account";
const accountRouter: Router = express.Router();

accountRouter.get("/:token", decodeToken, verifyAccount);

export default accountRouter;