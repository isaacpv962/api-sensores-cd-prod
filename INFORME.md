# Informe de Laboratorio 5.2: Pipeline de CD con Docker y AWS

**Estudiante:** Hernan Isaac Peñaranda Villarroel<br>
**Docente:** Ing. Marcelo Quispe Ortega<br>
**Universidad:** Universidad Mayor Real y Pontificia de San Francisco Xavier de Chuquisaca (USFX)<br>
**Carrera:** Ingeniería en Ciencias de la Computación

## 1. Configuración de Infraestructura
Se desplegó una instancia EC2 en AWS utilizando Ubuntu 22.04. Para la seguridad, se habilitaron los puertos 22 (administración) y 80 (servicio público).

## 2. Estrategia de Despliegue
Se utilizó un Dockerfile multi-etapa para optimizar el almacenamiento en el servidor. El pipeline automatiza:
- El empaquetado de la aplicación.
- La publicación en Docker Hub.
- La ejecución remota mediante comandos SSH para actualizar el contenedor en tiempo real.

## 3. Evidencias
- **Pipeline de CD Exitoso:** ![Pipeline](./img/pipeline_cd.png)
- **API funcionando en IP Pública:** ![API](./img/api_aws.png)
*(Nota: Asegúrate de capturar la IP de AWS en la barra de direcciones del navegador)*

## 4. Rollback
Para revertir una versión, se utilizarían etiquetas específicas en lugar de `latest`. En caso de fallo, se ejecutaría:
`docker run -d --name api-iot -p 80:3000 ${{ secrets.DOCKER_USERNAME }}/api-sensores:SHA_ANTERIOR`