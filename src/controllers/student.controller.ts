import { Request, Response } from "express";
import { Student } from "../models/student.model";
import { StudentService } from "../services/student.service";

const studentService = new StudentService();

export class StudentController {
  // index -> lista todos os registros
  public async index(request: Request, response: Response) {
    try {
      // processamento
      const students = await studentService.getAllStudents();

      // saída
      return response.status(200).json({ students });
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: "Erro ao listar alunos.",
      });
    }
  }

  // store -> criar um novo registro
  public async store(request: Request, response: Response) {
    try {
      // entrada
      const { name, email, password, age, type } = request.body;

      // processamento
      if (!name || !email || !password) {
        return response.status(400).json({
          success: false,
          code: response.statusCode,
          message: "Preencha todos os campos obrigatórios.",
        });
      }

      const newStudent = new Student(name, email, password, age, type);

      const createdStudent = await studentService.createStudent(newStudent);
      // saída
      return response.status(201).json({ createdStudent });
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: "Erro ao cadastrar aluno.",
      });
    }
  }

  // show -> detalhes de um único registro
  public async show(request: Request, response: Response) {
    try {
      // entrada
      const { id } = request.params;

      //processamento
      const student = await studentService.getStudentById(id);

      if (!student) {
        return response.status(404).json({
          success: false,
          code: response.statusCode,
          message: "Aluno não encontrado.",
        });
      }

      return response.status(200).json({ student });
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: "Erro ao encontrar aluno.",
      });
    }
  }

  // update -> atualizar um registro existente
  public async update(request: Request, response: Response) {
    try {
      // entrada
      const { id } = request.params;
      const { name, email, password, age } = request.body;

      // processamento
      const updatedStudent = await studentService.updateStudent({
        id,
        name,
        email,
        password,
        age,
      });

      return response.status(200).json({ updatedStudent });
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: "Erro ao atualizar aluno.",
      });
    }
  }

  // delete ou destroy -> remover um registro existente
  public async delete(request: Request, response: Response) {
    try {
      // entrada
      const { id } = request.params;

      // processamento
      const deletedStudent = await studentService.deletedStudent(id);

      return response.status(200).json({ deletedStudent });

      // saída
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: `Aluno removido com sucesso. ${error}`,
      });
    }
  }
}
