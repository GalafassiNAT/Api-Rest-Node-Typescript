import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { AnyObject, ObjectSchema, ValidationError } from "yup";


interface IProperty {
	Property: "body" | "params" | "header" | "query";
}

interface IGetSchema {
	getSchema: <T extends AnyObject>(schema: ObjectSchema<T>) => ObjectSchema<T>;
}

interface IAllSchemas {
	Schemas: Record<IProperty["Property"], ObjectSchema<any>>;
}

interface IGetAllSchemas {
	getSchemas: (getSchema: IGetSchema["getSchema"]) => Partial<IAllSchemas["Schemas"]>;

}

interface IValidation {
	(getAllSchemas: IGetAllSchemas["getSchemas"]): RequestHandler;
}

export const validation:IValidation = (getAllSchemas) =>  async (req, res, next) => {
	const schemas = getAllSchemas(schema => schema);
	const errorsResult: Record<string, Record<string, string>> = {};

	Object.entries(schemas).forEach(([key, schema]) => {
		try{
			schema.validateSync(req[key as IProperty["Property"]], {abortEarly: false});
		} catch (err){
			const yupError = err as ValidationError;
			const errors: Record<string, string> = {};
			
			yupError.inner.forEach(error => {
				if(!error.path) return;
				
				errors[error.path] = error.message;
			});
			
			errorsResult[key] = errors;
		}
		
		
	});

	if(Object.entries(errorsResult).length > 0){
		return res.status(StatusCodes.BAD_REQUEST).json({ errors: errorsResult });
	} 
	else{
		return next();
	}

	
};