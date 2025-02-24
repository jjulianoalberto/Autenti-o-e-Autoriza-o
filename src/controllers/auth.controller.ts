import { Request, Response } from "express";
import { randomUUID } from "crypto";

import { repository } from "../database/prisma.connection";
import { AuthService } from "../services/auth.service";
import { missingFieldError, serverError } from "../util/response.helpers";

const authService = new AuthService();

export class AuthController {
  public async login(request: Request, response: Response) {
    try {
      // entrada
      const { email, password } = request.body;

      if (!email || !password) {
        return missingFieldError(response);
      }

      const result = await authService.login({ email, password });

      if (!result) {
        // 401 - Unauthorized
        return response.status(401).json({
          success: false,
          code: response.statusCode,
          message: "Credenciais inválidas.",
        });
      }

      return response.status(result.code).json(result);
    } catch (error) {
      return serverError(response, error);
    }
  }
}
