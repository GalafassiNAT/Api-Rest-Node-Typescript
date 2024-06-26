import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";


interface ICity{
	name: string;
	state: string;
}

interface IFilter {
	filter: string;
	
}

export const createValidation = validation((getSchema) => ({
	body: getSchema<ICity>(yup.object().shape({ 
		name: yup.string().required().min(3),
		state: yup.string().required().length(2),
	})),
	query: getSchema<IFilter>(yup.object().shape({
		filter: yup.string().required().min(3),
	})),
}));


export const create = async (req: Request<{}, {}, ICity>, res: Response) => {
	console.log(req.body);

	return res.status(StatusCodes.ACCEPTED).send("Create!");
};