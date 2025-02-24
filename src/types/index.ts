import { JwtPayload } from "jsonwebtoken";

export interface ResponseData {
  success: boolean;
  code: number;
  message: string;
  data?: any;
}

export interface PayloadToken extends JwtPayload {
  id: string;
  type: TypeStudent;
}

export enum TypeStudent {
  Matriculado = "M",
  TechHelper = "T",
  Formado = "F",
}
