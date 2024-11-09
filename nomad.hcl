job "code-games" {
  type = "service"

  group "code-games" {
    count = 1
    network {
      port "web" {
        to = 8080
      }
    }

    service {
      name     = "code-games"
      port     = "web"
      provider = "nomad"
    }

    task "code-games-task" {
      driver = "docker"

      config {
        image = "codegames_caddy:v1.1"
        ports = ["web"]
      }
    }
  }
}