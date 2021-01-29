export class Articulo {
    constructor(
        public codigoarticulo: number,
        public descripcion: string,
        public precio: number,
        public estado: number,
        public creador
    ){}
}