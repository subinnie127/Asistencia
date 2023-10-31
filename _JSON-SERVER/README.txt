1. Para instalar json-server:

npm install -g json-server

2. Para ejecutar json-server:

json-server --watch publicaciones.json

export interface Publicacion {
  id: string,
  correo: string;
  nombre: string;
  apellido: string;
  titulo: string;
  contenido: string;
};