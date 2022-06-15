# File Compression Service

Microservicio Node.js escrito en Typescript.

Permite la compresión y encriptación de archivos.

## Índice
[Estructura del proyecto](#estructura-del-proyecto)

[Dependencias](#dependencias)

[Comandos](#comandos-npm)


<br>

## Dependencias

#

### Para el desarrollo:
<br>

`typescript, ts-node`

Interpretar Typescript durante el desarrollo (ejecutar typescript directamente).

`eslint, ts-node, @typescript-eslint/eslint-plugin, @typescript-eslint/parser`

Tener disponible las herramientas de Linting y de tipos que caracterizan a Typescript durante el desarrollo.

`typescript (tsc), cpx`

Convertir el proyecto a javascript puro (de forma que se ejecute directamente el javascript una vez deployado) y copiar archivos al output del build.

`supertest, mocha, should, sinon`

Realizar tests unitarios.

<br>

### Para la ejecución:
<br>

`express`

Web framework para crear API REST.

`morgan-body`

Para loggear el body de las requests y responses.


<br><br>

## Estructura del proyecto
#
La estructura sugerida del proyecto es la siguiente

- api/
    - dto/
        - ... : _directorio donde incluir interfaces TS para requests y responses. (Data Transfer Objects)._
    - model/
        - ... : _directorio donde incluir clases TS referidas al modelo de datos._
    - routes.js : _módulo donde se definen los endpoints._
- dist/
    - <$npm_package_name> : _directorio output para el build del proyecto._
- environments/
    - environments.ts
    - ... : _definición de variables de entorno. Crear un archivo para cada ambiente_
- test _directorio utilizado por mocha para ejecutar tests unitarios._
- .eslintrc.json : _archivo para opciones de linting del Typescript_
- .gitignore
- nodemon.json : _configuración nodemon para escuchar cambios durante el desarrollo_
- package.json
- Readme.md
- server.js
- tsconfig.json : _configuraciones de compilación de typescript_

<br><br>

## Comandos NPM 
#
`npm run local`

Este comando corre la aplicación de forma local utilizando nodemon. 
La configuración de nodemon está en el archivo nodemon.json y puede ser modificada a gusto de quienes trabajen en el proyecto.
<br>

`npm run build`

Este script utiliza el paquete **cpx** para copiar archivos .js, y otros assets al directorio dist. Luego utiliza el comando **tsc** para convertir los archivos typescript a javascript y colocarlos también en el directorio dist (respetando la estructura de carpetas del proyecto).

<br>

`npm run start`

Generalmente es el script de inicio que utilizan los contenedores o pods una vez deployado. Se recomienda que exista en el package.json.

También sirve durante el desarrollo para correr localmente el server.js que está dentro de la carpeta dist y verificar que está funcionando correctamente el proyecto "buildeado".

<br>

`npm run test`

Se corren los tests que estén escritos en el directorio ./test.