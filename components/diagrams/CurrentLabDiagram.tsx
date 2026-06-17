import React from "react"
import ReactFlow, {
  Node,
  Edge,
  MarkerType,
  Background,
  BackgroundVariant,
} from "reactflow"

const baseStyle = {
  borderRadius: 8,
  color: "#e2e8f0",
  fontSize: 13,
  fontWeight: 600,
  padding: "10px 16px",
  textAlign: "center" as const,
  fontFamily: "Inter, system-ui, sans-serif",
}

const infraStyle = {
  ...baseStyle,
  background: "#1a1a2e",
  border: "1px solid #555",
}

const existingStyle = {
  ...baseStyle,
  background: "#0d3d30",
  border: "1px solid #1a8a6a",
}

const nodes: Node[] = [
  {
    id: "gateway",
    position: { x: 210, y: 0 },
    data: { label: "Cloud Gateway Max" },
    style: { ...infraStyle, width: 200 },
  },
  {
    id: "switch",
    position: { x: 195, y: 110 },
    data: { label: "USW Enterprise 8 PoE" },
    style: { ...infraStyle, width: 230 },
  },
  {
    id: "macmini",
    position: { x: 20, y: 270 },
    data: {
      label: (
        <div>
          <div style={{ fontWeight: 700 }}>Mac Mini</div>
          <div style={{ fontSize: 11, marginTop: 4, color: "#6ee7b7" }}>
            10.10.30.244
          </div>
          <div style={{ fontSize: 10, marginTop: 4, color: "#94a3b8", fontStyle: "italic" }}>
            Orchestration
          </div>
        </div>
      ),
    },
    style: { ...existingStyle, width: 170 },
  },
  {
    id: "ap",
    position: { x: 235, y: 270 },
    data: { label: "U7 Lite AP" },
    style: { ...infraStyle, width: 140 },
  },
  {
    id: "spark",
    position: { x: 420, y: 270 },
    data: {
      label: (
        <div>
          <div style={{ fontWeight: 700 }}>DGX Spark</div>
          <div style={{ fontSize: 11, marginTop: 4, color: "#6ee7b7" }}>
            10.10.30.100
          </div>
          <div style={{ fontSize: 10, marginTop: 4, color: "#94a3b8", fontStyle: "italic" }}>
            Inference
          </div>
        </div>
      ),
    },
    style: { ...existingStyle, width: 170 },
  },
  {
    id: "macbook",
    position: { x: 210, y: 440 },
    data: {
      label: (
        <div>
          <div style={{ fontWeight: 700 }}>MacBook Pro</div>
          <div style={{ fontSize: 11, marginTop: 4, color: "#94a3b8" }}>
            mobile dev workstation
          </div>
        </div>
      ),
    },
    style: { ...infraStyle, width: 200 },
  },
]

const edgeLabelStyle = {
  fontSize: 11,
  fontWeight: 600,
  fill: "#cbd5e1",
  fontFamily: "Inter, system-ui, sans-serif",
}
const labelBgStyle = { fill: "#0f172a", fillOpacity: 0.8 }

const edges: Edge[] = [
  {
    id: "e-gw-sw",
    source: "gateway",
    target: "switch",
    label: "LAN Trunk",
    labelStyle: edgeLabelStyle,
    labelBgStyle,
    style: { stroke: "#64748b" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#64748b" },
  },
  {
    id: "e-sw-mac",
    source: "switch",
    target: "macmini",
    label: "Port 2 · VLAN 30",
    labelStyle: edgeLabelStyle,
    labelBgStyle,
    style: { stroke: "#1a8a6a" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#1a8a6a" },
  },
  {
    id: "e-sw-ap",
    source: "switch",
    target: "ap",
    label: "Port 3 · PoE",
    labelStyle: edgeLabelStyle,
    labelBgStyle,
    style: { stroke: "#64748b" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#64748b" },
  },
  {
    id: "e-sw-spark",
    source: "switch",
    target: "spark",
    label: "Port 4 · VLAN 30",
    labelStyle: edgeLabelStyle,
    labelBgStyle,
    style: { stroke: "#1a8a6a" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#1a8a6a" },
  },
  {
    id: "e-macbook-switch",
    source: "macbook",
    target: "switch",
    label: "Tailscale mesh",
    labelStyle: edgeLabelStyle,
    labelBgStyle,
    style: { stroke: "#6366f1", strokeDasharray: "6 3" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#6366f1" },
  },
]

export default function CurrentLabDiagram() {
  return (
    <div
      className="my-8 rounded-2xl border border-gray-700/40 overflow-hidden"
      style={{ height: 560, background: "#0f172a" }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        preventScrolling={false}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1}
          color="#334155"
        />
      </ReactFlow>
    </div>
  )
}
