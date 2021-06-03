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
  `$ clojure -A:cider`

Recommended development setup:

1. run `dev` and `cider` aliases on target Pi with `$ clojure
   -A:dev:cider`
2. tunnel to target Pi via dev environment with `$ ssh -NL
   55000:localhost:55000 <user>@<pi>`
3. then connect with Cider's `cider-connect` to `localhost:55000`
4. either nrepl or clojure or java takes time to "warm up" after first
   command is issued so, be patient
5. engage with Integrant/reloaded via `user/go` or `user/reset-all` or
   `user/halt`
