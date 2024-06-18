## Kubernetes User Interface

Learning objectives: 
1. Understand the core Kubernetes objects
2. Create a non-trivial application with Typescript (and Go?)

### Vision

As a new user to Kubernetes, the EKS dashboard was hard to navigate. I tried some existing Kubernetes dashboards, such as [the Backstage plugin](https://backstage.io/docs/features/kubernetes/). They were okay, but I wanted something better, as I want a clean separation between node information and workload information. In a platform context, EKS would be hard to provide to developers "as a service". Whilst the kubctl CLI is useful, it's a lot of effort. Good for "actions", not for "overviews". I also wanted to self-host and easily hook up to a cluster, kinda like building my own "PaaS" UI over EKS. I felt that the [Kubernetes resume challenge](https://cloudresumechallenge.dev/docs/extensions/kubernetes-challenge/) wasn't in-depth enough. 

## Kubernetes API

Personally, the [docs on kubernetes.io](https://kubernetes.io/docs/reference/kubernetes-api/) I find hard to navigate, here is a [rendered version](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.25/#service-v1-core) of similar content. Do note that there are [multiple API groups](https://kubernetes.io/docs/reference/using-api/#api-groups). This project currently makes use of the "core" and "apps" groups.

There is a GitHub organisation of [Kubernetes Clients](https://github.com/kubernetes-client) for accessing the Kubernetes API. This project makes use of [the JavaScript (Typescript) client](https://github.com/kubernetes-client/javascript). You can see the JavaScript [typedocs here](https://kubernetes-client.github.io/javascript/). Additionally, the [developer guide](https://github.com/kubernetes/community/tree/master/contributors/devel) includes a lot of information about contributing to Kubernetes, including the [API conventions](https://github.com/kubernetes/community/blob/master/contributors/devel/sig-architecture/api-conventions.md). 

### Development environment setup

1. Login to AWS `./scripts/aws-auth.sh`
2. Copy to `/workspace/kubernetes-user-interface/backend/config.yml` a Kubernetes configuration

### Roadmap
**This iteration:**
1. Update README
1. Include POSTMAN collection for K8s APIs
1. Get TypeScript shapes onto the frontend (passthrough proxy)
1. Ensure it can be deployed on a cluster (to read the cluster itself)

**Next iteration:**
1. Integrate ECR view, to show container images
1. Fix Kubernetes auth

**Ideas for future**
1. Shoji interaction for events
1. Fix Terraform module for cluster (RBAC roles)
1. Include nested UX elements
1. Support sidecars / multi-pods
1. Show manifest in the UI
1. ECR integration
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