import { Router } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();


router.get("/", (_, res) => {
	return res.send("Hello world!");
});

router.post("/", (req, res) => {
	console.log(req.body);
	return res.status(StatusCodes.FORBIDDEN).send("Hello world!");
});



export {  router };