import { repository } from "../database/prisma.connection";
import { CreateStudentDTO, UpdateStudentDTO } from "../dtos/student.dto";
import { Student } from "../models/student.model";
import { ResponseData } from "../types";

export class StudentService {
  async getAllStudents(): Promise<ResponseData> {
    const students = await repository.student.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        age: true,
        type: true,
      },
    });
    return {
      success: true,
      code: 200,
      message: "alunos listados",
      data: students,
    };
  }

  public async createStudent(data: CreateStudentDTO): Promise<ResponseData> {
    const newStudent = new Student(
      data.name,
      data.email,
      data.password,
      data.type,
      data.age
    );

    const createdStudent = await repository.student.create({
      data: {
        id: newStudent.id,
        name: newStudent.name,
        email: newStudent.email,
        password: newStudent.password,
        type: newStudent.type,
        age: newStudent.age,
      },
      select: {
        id: true,
        name: true,
        email: true,
        age: true,
        type: true,
      },
    });

    return {
      success: true,
      code: 201,
      message: "Aluno criado com sucesso.",
      data: createdStudent,
    };
  }

  public async getStudentById(id: string): Promise<ResponseData> {
    const student = await repository.student.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        age: true,
        type: true,
      },
    });

    if (!student) {
      throw new Error("Aluno nao encontrado");
    }
    return {
      success: true,
      code: 200,
      message: "Aluno encontrado com sucesso.",
      data: student,
    };
  }

  public async updateStudent(data: UpdateStudentDTO): Promise<ResponseData> {
    const updatedStudent = await repository.student.update({
      where: {
        id: data.id,
      },
      data,
      select: {
        email: true,
        age: true,
        type: true,
      },
    });
    return {
      success: true,
      code: 200,
      message: "Aluno atualizado",
      data: updatedStudent,
    };
  }

  public async deletedStudent(id: string): Promise<ResponseData> {
    const deletedStudent = await repository.student.delete({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        age: true,
        type: true,
      },
    });
    return {
      success: true,
      code: 200,
      message: "Aluno atualizado",
      data: deletedStudent,
    };
  }
}
