export interface Lame {
  id: number;
  coloration: string;
}

export interface Bloc {
  id: number;
  lames: Lame[];
}

export interface Prelevement {
  id: number;
  blocs: Bloc[];
}

export interface Case {
  id: number;
  prelevements: Prelevement[];
}

export interface CreateCaseDto {
  prelevements: {
    blocs: {
      lames: {
        coloration: string;
      }[];
    }[];
  }[];
}