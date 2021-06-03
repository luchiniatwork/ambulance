(ns ambulance.system
  (:require [clojure.java.io :as io]
            [integrant.core :as ig]
            [ambiente.core :as ambiente]))

(defn read-config []
  (let [env (or (ambiente/env :env) "dev")
        config-file (->> (str env  ".edn")
                         (io/file "config")
                         .getPath)
        config (some->> config-file
                        io/resource
                        slurp
                        ig/read-string)]
    (when (nil? config)
      (throw (ex-info (str "Unable to load config: " config-file)
                      {:anomaly/category ::invalid-system-config})))
    config))

(def system nil)

(defn start-system []
  (let [config (read-config)]
    (ig/load-namespaces config)
    (alter-var-root #'system (fn [_] (ig/init config)))
    :started))

(defn stop-system []
  (when (and (bound? #'system)
             (not (nil? system)))
    (alter-var-root #'system (fn [system] (ig/halt! system)))
    :stopped))
