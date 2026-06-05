export const capabilities = [
  ["CI/CD Implementation", "Release pipelines, preview environments, rollback paths, and deployment automation."],
  ["Cloud Infrastructure", "AWS, GCP, Azure, networking, runtime environments, and scalable foundations."],
  ["Kubernetes & Containers", "Cluster setup, workload deployment, service routing, and operational patterns."],
  ["Infrastructure as Code", "Terraform-first infrastructure that can be reviewed, repeated, and recovered."],
  ["Observability", "Logs, metrics, alerts, dashboards, and visibility into system behavior."],
  ["Managed Infrastructure", "Ongoing improvements, reliability work, automation, and infrastructure care."]
] as const;

export const processSteps = [
  ["Audit", "Map the current deployment path, infrastructure risks, and operational bottlenecks."],
  ["Architect", "Design the pipeline, cloud, cluster, and automation structure around your product."],
  ["Implement", "Build CI/CD, infrastructure as code, runtime configuration, and observability."],
  ["Operate", "Improve reliability, reduce manual work, and keep deployment systems healthy."]
] as const;
