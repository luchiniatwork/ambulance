# Ambulance Server

## Requirements

1. Java 11+ (Azul Zulu embedded recommended)
2. Clojure tools deps launcher

## Settings

- Integrant config at `resources/config` defined by var `env` with
  default `dev.edn`
- Integrant reload flow. `go`, `halt`, and `reset-all` available at ns
  `user`

## Dev Mode

- `user` namespace under the `dev` folder and alias with `$ clojure -A:dev`
- Remote cider-nrepl available at port 55000 under alias `cider` with
  `$clojure -A:cider`
