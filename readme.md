## Kubernetes User Interface

1. Login to AWS `./scripts/aws-auth.sh`
2. Copy to `/workspace/kubernetes-user-interface/backend/config.yml` a Kubernetes configuration

## Vision

1. I tried some existing Kubernetes dashboards e.g. https://backstage.io/docs/features/kubernetes/
    * Overall, not bad, but wanted something
2. I tried EKS dashboard, but it was really painful
3. I tried the kubctl CLI, but it's too much effort, okay for actions, not good for overviews
- I also wanted something I could self-host deploy, and easily hook up to a cluster
    * Kinda like building my own "PaaS" UI over EKS

Challenges I had: 

1. Too much Kubernetes specifics, as a developer I want signal/noise
    * I don't care about Node/Cluster specifics, but I might if I need to debug
1. Bouncing about between EKS dashboard and UI in Backstage

## Roadmap

1. **Feature:** Shoji interaction for events
1. **Chore:** Fix Terraform module for cluster (RBAC roles)
1. Include nested UX elements
1. Support sidecars / multi-pods
1. Show manifest in the UI

1. ECR integration
1. Fix Kubernetes auth

1. Animate the loading icon
1. Fix Janky loading flashes

1. Create views based on who is viewing (customizable?)
1. Add loading spinners
1. Add polling or websockets
1. Move to proxy and clientside
1. Update favicon
1. Add integration tests to the backend

1. Group events by resource type
1. Convert into Backstage plugin