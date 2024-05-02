import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";



interface ICity{
	name: string;
}


export const create = (req: Request<{}, {}, ICity>, res: Response) => {
	const data = req.body;
	console.log(data);

	return res.status(StatusCodes.ACCEPTED).send("Create!");
};