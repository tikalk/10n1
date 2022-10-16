# Infra

## K3s install

Save as `k3s.yml`:

```yaml
disable: traefik
node-external-ip: 3.250.118.144
write-kubeconfig-mode: "0640"
tls-san:
  - 10n1.local
  - 10n1.tikalk.dev
node-label:
  - "project=10n1"
  - "category=app"
```

```sh
sudo apt install apt-transport-https ca-certificates curl software-properties-common -y

export K3S_CONFIG_FILE=$PWD/k3s.yml
curl -sfL https://get.k3s.io | sh -

systemctl status k3s.service
sudo chgrp ubuntu /etc/rancher/k3s/k3s.yaml

k3s kubectl get node -owide
```

Now you can use the kubeconfig `/etc/rancher/k3s/k3s.yaml` on other machines.

## Nginx-ingress Controller

```sh
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
helm install ingress-nginx ingress-nginx/ingress-nginx -f k8s/values-ingress-controller.yaml
```

## MongoDB

```sh
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
helm install mongodb bitnami/mongodb -f k8s/values-mongodb.yaml
```

## Registry

```sh
kubectl create secret docker-registry registry-credentials --docker-server=https://registry.gitlab.com --docker-username= --docker-password= --docker-email=
```

## Services

```sh
kubectl create -f sa.yaml
kubectl create -f svc-ui.yaml
kubectl create -f deploy-ui.yaml
kubectl create -f svc-ds.yaml
kubectl create -f deploy-ds.yaml
```
