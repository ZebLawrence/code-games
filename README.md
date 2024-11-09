# code-games

## Design system
- [https://opensource.adobe.com/spectrum-web-components/](https://opensource.adobe.com/spectrum-web-components/)
- [https://opensource.adobe.com/spectrum-web-components/getting-started/](https://opensource.adobe.com/spectrum-web-components/getting-started/)


## Code display
- [https://www.npmjs.com/package/playground-elements](https://www.npmjs.com/package/playground-elements)

## To run the container
Refs: https://developer.hashicorp.com/nomad/tutorials/get-started/gs-start-a-cluster https://docs.docker.com/desktop/install/ubuntu/
- install docker `sudo apt-get install docker-ce`
- check status ` sudo systemctl status docker`
- Start docker `systemctl --user start docker-desktop`
- Start nomad 
```bash 
sudo nomad agent -dev \
  -bind 0.0.0.0 \
  -network-interface='{{ GetDefaultInterfaces | attr "name" }}'
```
- In a second terminal `export NOMAD_ADDR=http://localhost:4646`
- Navigate to the Nomad UI in your web browser by visiting http://localhost:4646/ui(opens in new tab).
- Start the container: `nomad job  run ./nomad.hcl`

## Build a new image
- `docker build -t sampleapp:v1 .`
- https://www.cherryservers.com/blog/docker-build-command

## caddy stuff
- https://caddyserver.com/docs/caddyfile/directives/root
- https://hub.docker.com/_/caddy

## Nomad
- https://developer.hashicorp.com/nomad/tutorials/get-started/gs-overview
