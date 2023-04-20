# API-Credito ( Habilitador_Tecnologico_API_Credito )

Este API se encarga de definir las operaciones relacionadas con la gestión de reporte en las líneas de negocio de Nacional Monte de Piedad.

## Capacidades :books

- Gestión de Reportes

## Repositorio 🚀

_En caso de necesitar realizar cambios en el código, solicitar acceso a la siguiente ubicación del repositorio en GIT_

### Pre-requisitos :bookmark_tabs

- Es necesario tener las siguientes herramientas

- node versión 10.15.3 o superior
- node package manager versión 6.4.1 o superior
  verificar con los siguientes comandos:

```
node --version
```

Y también

```
npm --version
```

### Variables de entorno :clipboard

Para los diferentes ambientes es necesario especificar las urls a redireccionar

```
CONTEXT_NAME: Contexto del API [api]/[credito]
CONTEXT_VERSION: Versión del API
```

Para análisis de pruebas Sonar

```
SONAR_HOST_URL: URL del Sonarqube
SONAR_PROJECT_NAME=Project name del proyecto
SONAR_PROJECT_KEY: Project key del proyecto
SONAR_PROJECT_LOGIN: Login generado para este proyecto
```

### Instalación :wrench

_Instalación de los paquetes necesarios para despliegue y pruebas_

```
npm install
```

## Ejecutando las pruebas ⚙️

_Para la ejecución de las pruebas, no es nesaria la instalacción de otra herramienta diferentes a las instaladas en la **Instalación**, ejecutar_

```
npm run test
```

### Análisis del código :nut_and_bolt

_Para la ejecución del análisis del código, no es nesaria la instalacción de otra herramienta diferentes a las instaladas en la **Instalación**, ejecutar_

```
npm run sonar
```

## Despliegue :package

_Para el despliegue, basta con ejecutar la sentencia_

```
npm start
```

_ver el despliegue correcto en (<https://[HOSTNAME>]:[PORT])_

## Documentación para consumo :book

Para el consumo de servicios sobre el manejo de los reporte ver [API-Reportes](https://app.apiary.io/).

## CD/CI

Para CD/CI se hace mediante [Jenkins](http://dev1775-devops.apps.pcf.nmp.com.mx/) y ejecutar PASO [Manual de Instalacion](https://github.com/MontePiedadMx/)

## Autores :black_nib

Desarrollado para Nacional Monte de Piedad por

- [**Softtek**](<(https://www.softtek.com/)>) - [**Benito José Martínez Osornio**](https://github.com/)

## Bitácora :heavy_check_mark

-Versión Inicial

- **INTL14**
  Actualización en el segmento de TL (Manual Técnico de Consulta), se considera agregar estas nuevas etiquetas en el API de créditos para su correcto funcionamiento.
