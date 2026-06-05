export interface Tool {
  name: string;
  desc: string;
}

export interface Metric {
  value: string;
  label: string;
  desc: string;
}

export interface Outcome {
  label: string;
  desc: string;
}

export interface ServiceDetails {
  slug: string;
  title: string;
  headline: string;
  description: string;
  contentFocus: string;
  capabilities: string[];
  outcomes: Outcome[];
  metrics: Metric[];
  tools: Tool[];
  visualType: "cloud" | "pipeline" | "k8s" | "portal" | "observability" | "security" | "cost";
}

export const servicesData: ServiceDetails[] = [
  {
    slug: "cloud-infrastructure",
    title: "Cloud Infrastructure Engineering",
    headline: "Scalable, High-Availability Cloud Architectures Built for Resilience.",
    description: "Design and implement production-grade cloud environments utilizing automated scaling systems, secure network routing topologies, and multi-region disaster recovery models.",
    contentFocus: "We build enterprise cloud systems on AWS, GCP, and Azure that scale dynamically under load, maintain strict network boundary isolation, and survive region-level disruptions without data loss.",
    capabilities: [
      "VPC topology design & private subnet partitioning",
      "Multi-region transit gateway routing systems",
      "Network load balancing & application routing setups",
      "Auto-scaling configuration matching compute thresholds",
      "Multi-region data replication & failover architectures",
      "IAM boundary configurations & active directory links",
      "Cloud hardware security module (HSM) setups",
      "Infrastructure baseline vulnerability hardening"
    ],
    outcomes: [
      { label: "Higher Reliability", desc: "Reduces compute interruptions through multi-availability zone and region failovers." },
      { label: "Automated Scaling", desc: "Matches resource capacity directly with traffic volume to prevent downtime." },
      { label: "Secure Network Isolation", desc: "Keeps database layers completely private while routing traffic securely." }
    ],
    metrics: [
      { value: "99.99%", label: "Uptime Target", desc: "Achieved via multi-region clustering and active-active routing configurations." },
      { value: "0", label: "Single Points of Failure", desc: "Ensured by redundant paths across all network and compute layers." },
      { value: "100%", label: "IaC Coverage", desc: "Every subnet, route table, and load balancer defined in declarative code." }
    ],
    tools: [
      { name: "Amazon Web Services", desc: "Elastic Kubernetes Service (EKS), IAM, VPC routing, Transit Gateway, Route 53." },
      { name: "Google Cloud Platform", desc: "Google Kubernetes Engine (GKE), Shared VPC routing, Cloud Armor policies." },
      { name: "Microsoft Azure", desc: "Azure Kubernetes Service (AKS), Virtual WAN, Active Directory integrations." }
    ],
    visualType: "cloud"
  },
  {
    slug: "devops-automation",
    title: "DevOps Automation",
    headline: "Version-Controlled Delivery Pipelines for Stable Release Operations.",
    description: "Eliminate manual operational tasks and deployment bottlenecks through structured CI/CD pipelines, GitOps reconciliation engines, and automated rollback triggers.",
    contentFocus: "We design delivery workflows that turn deployments into non-events. Code changes undergo parallel validation tests and automated environment promotions without manual interventions.",
    capabilities: [
      "Continuous Integration validation check pipelines",
      "GitOps-driven continuous deployment systems",
      "Automated canary releases & blue-green deployment gates",
      "Declarative target state reconciliation frameworks",
      "Automated rollback sequences triggered by metrics breaches",
      "Multi-environment deployment configuration standardization",
      "Automated container building, signing, and verification",
      "Infrastructure drift detection and automated remediation"
    ],
    outcomes: [
      { label: "Deployment Consistency", desc: "Verifies that every build undergoes identical validation and packaging steps." },
      { label: "Minimal Manual Operations", desc: "Allows engineers to focus on code rather than orchestration scripts." },
      { label: "Instant Failure Rollback", desc: "Detects pipeline abnormalities and automatically returns to the last stable state." }
    ],
    metrics: [
      { value: "< 12min", label: "Build to Deploy Time", desc: "Fast parallel testing execution inside isolated runner environments." },
      { value: "92%", label: "Reduction in Manual Interventions", desc: "Release promotions automated via pull request merges." },
      { value: "0", label: "Dirty Environments", desc: "Continuous reconciliation loops prevent untracked configuration drift." }
    ],
    tools: [
      { name: "GitHub Actions", desc: "Parallel testing runner matrices, container builds, secure key integrations." },
      { name: "GitLab CI", desc: "Integrated pipelines, container registries, dynamic environment creations." },
      { name: "ArgoCD", desc: "GitOps engine synchronizing Kubernetes states directly from Git sources." }
    ],
    visualType: "pipeline"
  },
  {
    slug: "kubernetes-containerization",
    title: "Kubernetes & Containerization",
    headline: "Production-Ready Container Orchestration Built for Scalable Workloads.",
    description: "Containerize application processes and schedule workloads on production-hardened Kubernetes clusters engineered for high resource utilization and runtime security.",
    contentFocus: "We build and operate production Kubernetes environments. We design cluster controls, horizontal pod scaling architectures, service meshes, and Helm charts to run critical microservices.",
    capabilities: [
      "EKS, GKE, and AKS cluster provisioning & operations",
      "Workload request and limit sizing optimizations",
      "Ingress routing configuration & SSL certificate linkages",
      "Service mesh implementation for private microservice calls",
      "Horizontal Pod Autoscaling (HPA) using target metrics",
      "Multi-tenant cluster configurations with network isolation",
      "Admission controllers enforcing cluster security standards",
      "Helm chart development for standardized service packaging"
    ],
    outcomes: [
      { label: "Workload Portability", desc: "Standardizes runtimes so workloads run identically across all cloud environments." },
      { label: "Optimized Compute Utilisation", desc: "Schedules pods based on request metrics to minimize idle CPU/Memory." },
      { label: "Resilient Microservices", desc: "Isolates pod failures and schedules backups dynamically on available nodes." }
    ],
    metrics: [
      { value: "2.4s", label: "Average Auto-scale Time", desc: "Pod replication scale-out triggered on cpu or traffic increases." },
      { value: "100%", label: "Isolated Tenants", desc: "Network policies prevent unauthorized namespaces from communicating." },
      { value: "10x", label: "Improved Pod Pack Density", desc: "Proper resource scheduling reduces node counts while running more containers." }
    ],
    tools: [
      { name: "Kubernetes Core", desc: "Ingress Controller, Horizontal Pod Autoscalers, Network Policies." },
      { name: "Helm", desc: "Package manager packaging declarative application templates." },
      { name: "Istio / Linkerd", desc: "Service mesh controlling security and routing between services." }
    ],
    visualType: "k8s"
  },
  {
    slug: "platform-engineering",
    title: "Platform Engineering",
    headline: "Internal Developer Platforms Designed for Engineering Velocity.",
    description: "Establish self-service developer templates, deployment abstractions, and platform APIs that allow engineering teams to provision infrastructure safely.",
    contentFocus: "We design internal developer platforms that eliminate request queues. Developers spin up databases, pipelines, and environments through standardized interfaces while platform constraints prevent security drift.",
    capabilities: [
      "Internal Developer Platform (IDP) architecture design",
      "Self-service infrastructure provisioning portals",
      "Standardized deployment template ecosystems",
      "Automated ephemeral environment provisioning tools",
      "Platform APIs abstraction complexity from cloud consoles",
      "Workload configuration standards enforcement patterns",
      "Self-service database & queuing connection templates",
      "Developer dashboard tracking deployment states"
    ],
    outcomes: [
      { label: "Zero-Queue Provisioning", desc: "Developers launch resources instantly without waiting for operations tickets." },
      { label: "Standardized Configurations", desc: "Ensures all projects deploy with identical security controls and logging." },
      { label: "Accelerated Onboarding", desc: "Reduces onboarding time by giving engineers ready-made templates." }
    ],
    metrics: [
      { value: "< 5min", label: "Environment Provisioning", desc: "Developers launch verified testing environments automatically." },
      { value: "100%", label: "Template Adherence", desc: "Enforced compliance via unified base configurations." },
      { value: "82%", label: "Ops Ticket Reduction", desc: "Self-service workflows eliminate infrastructure configuration queues." }
    ],
    tools: [
      { name: "Crossplane", desc: "Kubernetes-native cloud resources controller managing external APIs." },
      { name: "Backstage", desc: "Developer portal framework consolidating microservices and documentation." },
      { name: "Terraform Modules", desc: "Standardized templates provisioning compliant cloud configurations." }
    ],
    visualType: "portal"
  },
  {
    slug: "monitoring-observability",
    title: "Monitoring & Observability",
    headline: "High-Telemetry Infrastructure Insights for Proactive Systems Control.",
    description: "Establish centralized logging structures, distributed tracing boundaries, and telemetry dashboards to detect and diagnose anomalies before failures occur.",
    contentFocus: "We build observability systems that tell you why an incident happened. We collect and link metrics, logs, and distributed traces to create a searchable history of system behavior.",
    capabilities: [
      "Centralized metrics aggregation & TSDB storage setups",
      "Centralized logging streams with metadata mapping",
      "Distributed request tracing across microservice calls",
      "SLO / SLA measurement dashboards & alert engines",
      "High-cardinality analysis structures detecting anomalies",
      "Synthetics and browser endpoint uptime monitoring",
      "Infrastructure compute utilization metrics collecting",
      "Distributed profiling tracking runtime execution timings"
    ],
    outcomes: [
      { label: "Rapid Anomaly Diagnosis", desc: "Links traces directly to error logs to pinpoint failing lines of code." },
      { label: "Proactive Warning Triggers", desc: "Identifies trends like memory leaks before they trigger crash loops." },
      { label: "Complete System Visibility", desc: "Maps microservice interactions and p99 response times in real time." }
    ],
    metrics: [
      { value: "< 60s", label: "Anomaly Alert Latency", desc: "Alert configurations notify systems teams immediately on thresholds breach." },
      { value: "95%", label: "Faster Root-Cause Analysis", desc: "Correlated traces point directly to the database or service boundary." },
      { value: "100%", label: "Telemetry Coverage", desc: "All servers and application runtimes instrumented with OpenTelemetry agents." }
    ],
    tools: [
      { name: "Prometheus & Grafana", desc: "Metric collection stores and customized visualization dashboards." },
      { name: "OpenTelemetry", desc: "Ecosystem-standard instrumentation collecting unified metrics and traces." },
      { name: "Loki / ELK", desc: " central logs servers parsing system outputs and audit trails." }
    ],
    visualType: "observability"
  },
  {
    slug: "devsecops",
    title: "DevSecOps",
    headline: "Automated Compliance and Hardened Pipeline Security Boundaries.",
    description: "Secure deployment pipelines, manage configuration secrets dynamically, and enforce runtime security policies without slowing developer velocity.",
    contentFocus: "We integrate security into delivery. We build automated vulnerability checkers, static code policy analyzers, container scanners, and dynamic secrets rotators into pipelines.",
    capabilities: [
      "Centralized dynamic secret management & rotators",
      "Static Application Security Testing (SAST) in pipelines",
      "Container image layer vulnerability scanning integrations",
      "Kubernetes admission controller security policies",
      "Least-privileged IAM role configuration boundaries",
      "Infrastructure security policy-as-code configurations",
      "Audit trail tracking and configuration logs storage",
      "Automated dependency vulnerability warning systems"
    ],
    outcomes: [
      { label: "Continuous Compliance", desc: "Verifies dependencies and cluster configurations on every single commit." },
      { label: "Zero Hardcoded Secrets", desc: "Encrypts credentials in transit and provisions database access keys dynamically." },
      { label: "Hardened Cluster Boundaries", desc: "Blocks container privilege escalations at the Kubernetes API layer." }
    ],
    metrics: [
      { value: "0", label: "Hardcoded Secrets in Git", desc: "Enforced checks reject commits containing API tokens or passwords." },
      { value: "100%", label: "Pipeline Security Scanning", desc: "Every image build is scanned for CVEs before cluster scheduling." },
      { value: "0s", label: "Secret Rotation Overhead", desc: "Vault schedules automated dynamic password updates without service downtime." }
    ],
    tools: [
      { name: "HashiCorp Vault", desc: "Dynamic secrets engine encrypting credentials in transit." },
      { name: "Trivy / Snyk", desc: "Vulnerability analysis scanners checking files and base images." },
      { name: "Kyverno", desc: "Policy controller blocking non-compliant container configs." }
    ],
    visualType: "security"
  },
  {
    slug: "cloud-cost-optimization",
    title: "Cloud Cost Optimization",
    headline: "Resource Alignment Strategies Reducing Idle Cloud Waste.",
    description: "Align infrastructure configurations with workload realities. Audit compute utilization, right-size cluster nodes, and design scaling models to reduce cloud spending.",
    contentFocus: "We connect engineering decisions directly to business margins. We audit system resource usage, configure auto-scaling rules, remove orphaned storage volumes, and optimize instance types to save budget.",
    capabilities: [
      "Cloud resource utilization audits and analysis reports",
      "Workload compute and memory dimension rightsizing",
      "Kubernetes horizontal and vertical auto-scaling tuning",
      "Orphaned volume and unassigned elastic IP cleanup",
      "Reserved instances & Savings Plans commit forecasting",
      "Dynamic dev/staging environments automated shutdown",
      "Network data transfer cost analysis & optimization",
      "Spot instance scheduling templates for batch workloads"
    ],
    outcomes: [
      { label: "Lower Infrastructure Spend", desc: "Slashes monthly cloud bills by identifying and deleting idle resource allocation." },
      { label: "Efficient Compute Sizing", desc: "Tunes CPU and Memory requests to match actual code profiles under load." },
      { label: "Scale-Down Automation", desc: "Configures staging environments to scale to zero during non-working hours." }
    ],
    metrics: [
      { value: "35%+", label: "Average Cost Reduction", desc: "Achieved through right-sizing profiles and cleanup routines." },
      { value: "98%", label: "Instance Utilization Rate", desc: "Auto-scalers adjust cluster shapes to keep nodes fully utilized." },
      { value: "0", label: "Orphaned Resources", desc: "Automation checks and warns teams of untracked storage costs." }
    ],
    tools: [
      { name: "Kubernetes Karpenter", desc: "Dynamic node autoscaler matching compute requirements with optimized types." },
      { name: "AWS Cost Explorer", desc: "Telemetry API tracking budget allocation and savings commitments." },
      { name: "Prometheus Metrics", desc: "Provides microservice resource footprints tracking raw compute waste." }
    ],
    visualType: "cost"
  }
];
