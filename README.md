# jubilant-pancake


### Remebering where I left off

This project is intended to run in docker compose keeping needs to local enviroments minimal. Though one should install Go.

Please pull the repo in via ssh

`git clone git@github.com:arabenjamin/jubilant-pancake.git`


Next make sure you have [Docker](https://docs.docker.com/engine/install/ubuntu/) and [Docker Compose](https://docs.docker.com/compose/install/linux/) installed via the linked instructions.


Before you can continue, you need an enviormentfile not inclluded in the repo. See example below
```.env
PROJECT_ROOT="$HOME/jubilant-pancake"
APP_DOCKERFILE=PROJECT_ROOT="DOCKERFILE"
CLIENT_DOCKERFILE=PROJECT_ROOT="DOCKERFILE"
```


You should be able to run and start the service via docker compose

`sudo docker compose up`



