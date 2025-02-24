import jwt from "jsonwebtoken";

import { repository } from "../database/prisma.connection";
import { AuthDTO } from "../dtos/auth.dtos";
import { PayloadToken, ResponseData } from "../types";
import { Student } from "../models/student.model";

export class AuthService {
  public async login(data: AuthDTO): Promise<ResponseData | null> {
    const student = await repository.student.findFirst({
      where: {
        email: data.email,
        password: data.password,
      },
      select: {
        id: true,
        name: true,
        email: true,
        age: true,
        type: true,
        token: true,
      },
    });

    if (!student) return null;

    const studentPayloadToken = {
      id: student.id,
      type: student.type,
    };

    const token = this.generateToken(studentPayloadToken);

    return {
      success: true,
      code: 200,
      message: "Login realizado com sucesso.",
      data: {
        ...student,
        token,
      },
    };
  }

  public async validateLogin(
    token: string,
    studentId: string
  ): Promise<ResponseData> {
    const payload = this.validateToken(token) as PayloadToken;

    if (!payload || studentId !== payload.id) {
      return {
        success: false,
        message: "Token de autenticação inválido.",
        code: 401, // unauthorized
      };
    }

    return {
      success: true,
      message: "Validação de login realizada com sucesso.",
      code: 200,
    };
  }

  public generateToken(payload: any) {
    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    return token;
  }

  public validateToken(token: string) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!);

      return payload;
    } catch (error: any) {
      return null;
    }
  }

  public decodeToken(token: string) {
    return jwt.decode(token);
  }

  public async validateLoginOlderAge(studentId: string): Promise<ResponseData> {
    const student = await repository.student.findUnique({
      where: {
        id: studentId,
      },
    });
    if (!student) {
      return {
        success: false,
        code: 404,
        message: "Estudante...",
      };
    }
    if (!student.age || student.age < 18) {
      return {
        success: false,
        code: 403,
        message: "Acesso negado...",
      };
    }

    return {
      success: true,
      code: 200,
      message: "Acesso realizado com sucesso...",
    };
  }
}
