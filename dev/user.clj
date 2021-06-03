(ns user
  (:require [ambulance.system :as system]
            [clojure.pprint :refer [pprint]]
            [integrant.repl :refer [clear go halt prep init reset reset-all]]
            [jsonista.core :as json]))

(integrant.repl/set-prep! system/read-config)
