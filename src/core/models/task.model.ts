import { IResponsible } from "./responsible.model.ts";

export interface ITask {
  title: string;
  estimatedTime: number;
  responsible: IResponsible;
  status: boolean;
}
