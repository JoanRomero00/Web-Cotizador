export interface Option {
    idOption: number;
    idStep: number;
    idObra: number;
    name: string;
    img_src?: string;
    type?: 'CGI' | 'Normal';
    tittle?: string;
    price?: number;
    img_src_min?: string;
  }

