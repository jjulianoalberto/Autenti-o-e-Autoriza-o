import { NextFunction, Request, Response } from "express";

import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export async function validateToken(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { authorization } = request.headers;
    const { studentId } = request.params;

    if (!authorization) {
      return response.status(401).json({
        success: false,
        code: response.statusCode,
        message: "Token de autenticação não informado.",
      });
    }

    const result = await authService.validateLogin(authorization, studentId);

    if (!result.success) {
      return response.status(result.code);
    }

    next();
  } catch (error: any) {
    return response.status(500).json({
      success: false,
      code: response.statusCode,
      message: `Autenticação falhou: ${error.toString()}`,
    });
  }
}

export async function validateLoginOlderAge(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { studentId } = request.params;
  try {
    const result = await authService.validateLoginOlderAge(studentId);
    if (!result.success) {
      return response.status(result.code).json(result);
    }
    next();
  } catch (error: any) {
    return response.status(500).json({
      success: false,
      code: response.statusCode,
      message: error.toString(),
    });
  }
}
