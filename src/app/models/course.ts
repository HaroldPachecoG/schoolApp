import { Professor } from "./professor";

export interface Course {
    id: number;
    name: string;
    credits: number;
    professors: Professor[];
  }