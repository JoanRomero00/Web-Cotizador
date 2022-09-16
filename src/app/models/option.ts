export interface Option {
    idObra: number;
    idPiso: string;
    idDepto: string;
    idStep: number;
    idOption: number;
    name: string;
    img_src?: string;
    type?: 'CGI' | 'Normal';
    tittle?: string;
    price?: number;
    img_src_min?: string;
  }

