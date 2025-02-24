import { NextFunction, Request, Response } from "express";
import { AuthorizationService } from "../services/autorization.service";
import { TypeStudent } from "../types";
import { serverError } from "../util/response.helpers";

const authorizationService = new AuthorizationService();

// export async function validateCreateAssessment(
//   request: Request,
//   response: Response,
//   next: NextFunction
// ) {
//   try {
//     const { authorization } = request.headers;

//     const result = authorizationService.validationAuthorization(
//       authorization!,
//       [TypeStudent.Matriculado, TypeStudent.TechHelper]
//     );

//     if (!result.success) {
//       return response.status(result.code).json(result);
//     }

//     next();
//   } catch (error: any) {
//     return serverError(response, error);
//   }
// }
// export async function validateEditeAndDeleteAssessment(
//   request: Request,
//   response: Response,
//   next: NextFunction
// ) {
//   try {
//     const { authorization } = request.headers;

//     const result = authorizationService.validationAuthorization(
//       authorization!,
//       [TypeStudent.TechHelper]
//     );
//     if (!result.success) return response.status(result.code).json(result);

//     next();
//   } catch (error: any) {
//     return serverError(response, error);
//   }
// }

export function validateAuthorizationPermitions(permittedTypes: TypeStudent[]) {
  return (request: Request, response: Response, next: NextFunction) => {
    try {
      const { authorization } = request.headers;
      const result = authorizationService.validateAuthorization(
        authorization!,
        permittedTypes
      );

      if (!result.success) {
        return response.status(result.code).json(result);
      }

      next();
    } catch (error: any) {
      return serverError(response, error);
    }
  };
}
