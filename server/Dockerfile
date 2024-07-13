FROM debian

LABEL app="Giropops"

env id="2"

run apt-get update && apt-get install -y stress && apt-get clean

CMD  stress --cpu 1 --vm-bytes 64m --vm 1