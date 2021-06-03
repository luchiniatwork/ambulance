(ns user
  (:require [ambulance.system :as system]
            [clojure.pprint :refer [pprint]]
            [integrant.repl :refer [clear go halt prep init reset reset-all]]
            [jsonista.core :as json]
            [helins.linux.gpio :as gpio]))

(integrant.repl/set-prep! system/read-config)

(comment
  (with-open [device         (gpio/device "/dev/gpiochip0")
              out-handle     (gpio/handle device
                                          {17 {:gpio/state false
                                               :gpio/tag   :led-1}
                                           18 {:gpio/state true
                                               :gpio/tag   :led-2}}
                                          {:gpio/direction :output})
              #_button-watcher #_(gpio/watcher device
                                               {22 {:gpio/direction :input}})]
    (let [buffer (gpio/buffer out-handle)]
      (loop [leds (cycle [:led-1
                          :led-2])]
        (Thread/sleep 1000)
        (gpio/write out-handle
                    (gpio/set-line+ buffer
                                    {(first  leds) true
                                     (second leds) false}))
        #_(gpio/event button-watcher)
        (recur (rest leds))))))
