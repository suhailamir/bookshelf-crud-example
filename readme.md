## Development Environment Instructions (Docker)

- ensure the latest version of Docker is installed
- Navigate to the project directory
- copy docker-compose.override.example to docker-compose.override.yml and modify as needed
- Run "docker-compose -p users up -d" to bring up the containers
- Run "docker-compose -p users ps" to list the containers
- Run "docker exec -it users_api_1 sh" to run commands in a container's shell
- Run "docker-compose -p users stop" to stop the containers

## Development Environment Instructions (without Docker)

- clone the repo
- set mysql username and password
- Navigate to the /app directory
- Run npm install
- Run npm start
- navigate to localhost:3000/users , it will return list of users created