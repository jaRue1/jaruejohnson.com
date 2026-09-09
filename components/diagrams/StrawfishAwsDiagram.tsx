import React, { useEffect, useState } from "react"
import mermaid from "mermaid"

const definition = `
flowchart TB
  staff["Operations Staff"]
  partners["Trading Partners"]

  subgraph aws["Cloud Infrastructure · Client-Owned Account"]
    direction TB
    waf["Web Application Firewall"] --> cf["CDN · Global Edge"]
    s3erp[("Object Storage · ERP UI")]
    s3crm[("Object Storage · CRM UI")]
    subgraph vpc["VPC · Multi-AZ"]
      direction TB
      subgraph pub["Public Subnets"]
        alb["Load Balancer"]
      end
      subgraph priv["Private Subnets"]
        subgraph ecs["Container Orchestration"]
          erp["erp-api + worker"]
          crm["crm-api + worker"]
          comms["comms-api"]
        end
        aurora[("Managed PostgreSQL")]
        redis[("Redis · 11 Queues")]
      end
    end
    s3[("Object Storage · Documents")]
    cw["Observability · Logs + Alarms"]
  end

  orderful["EDI Trading Partner"]
  fedex["Carrier API"]
  qb["Accounting Software"]
  resend["Transactional Email"]
  gha["CI/CD Pipelines"]

  staff --> waf
  cf -->|"serves the UIs"| s3erp
  cf --> s3crm
  cf -->|"API traffic"| alb
  alb --> erp
  alb --> crm
  erp --> aurora
  erp --> redis
  crm --> aurora
  erp --> s3
  partners <--> orderful
  orderful <-->|"850 in · 855 856 810 out"| erp
  erp --> fedex
  erp --> qb
  comms --> resend
  gha -->|"deploys · gated migrations"| ecs
  ecs -.-> cw

  classDef default fill:#1a1a2e,stroke:#64748b,color:#e2e8f0
  classDef svc fill:#0d3d30,stroke:#1a8a6a,color:#e2e8f0
  classDef data fill:#3a2a0f,stroke:#b45309,color:#e2e8f0
  classDef ext fill:#1e1b4b,stroke:#6366f1,color:#e2e8f0
  classDef actor fill:#0f172a,stroke:#64748b,stroke-dasharray:4 3,color:#e2e8f0
  class erp,crm,comms svc
  class aurora,redis,s3,s3erp,s3crm data
  class orderful,fedex,qb,resend,gha ext
  class staff,partners actor
  style aws fill:#0b1220,stroke:#f59e0b,color:#f8fafc
  style vpc fill:#0d1526,stroke:#6366f1,color:#e2e8f0
  style pub fill:#101b30,stroke:#475569,color:#cbd5e1
  style priv fill:#0c1424,stroke:#475569,color:#cbd5e1
  style ecs fill:#0d2233,stroke:#1a8a6a,color:#e2e8f0
`

export default function StrawfishAwsDiagram() {
  const [svg, setSvg] = useState("")

  useEffect(() => {
    let cancelled = false
    mermaid.initialize({
      startOnLoad: false,
      theme: "dark",
      themeVariables: {
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: "13px",
        lineColor: "#64748b",
        edgeLabelBackground: "#0f172a",
      },
      flowchart: { curve: "basis", useMaxWidth: true },
    })
    document.fonts.ready
      .then(() => mermaid.render("strawfish-aws-diagram", definition))
      .then(({ svg: rendered }) => {
        if (!cancelled) setSvg(rendered)
      })
      .catch(() => {
        if (!cancelled) setSvg("")
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div
      className="my-8 rounded-2xl border border-gray-700/40 overflow-x-auto p-4"
      style={{ background: "#0f172a", minHeight: 400 }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
