clojure -Sdeps '{:deps {nrepl {:mvn/version "0.6.0"} cider/cider-nrepl {:mvn/version "0.26.0"}}}' -m nrepl.cmdline --middleware '["cider.nrepl/cider-middleware"]'
