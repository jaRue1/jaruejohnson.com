import React from "react"
import ReactFlow, { Node, Edge } from "reactflow"

const nodeStyle = {
  background: "#fff",
  border: "1px solid #ccc",
  borderRadius: 6,
  color: "#1a1a2e",
  fontSize: 14,
  fontWeight: 700,
  padding: "10px 28px",
  textAlign: "center" as const,
  fontFamily: "Inter, system-ui, sans-serif",
}

const nodes: Node[] = [
  {
    id: "tank",
    position: { x: 120, y: 30 },
    data: { label: "Tank" },
    style: nodeStyle,
  },
  {
    id: "zion",
    position: { x: 120, y: 140 },
    data: { label: "Zion" },
    style: nodeStyle,
  },
  {
    id: "sentinel",
    position: { x: 120, y: 250 },
    data: { label: "Sentinel" },
    style: nodeStyle,
  },
]

const blockedLabel = {
  fontSize: 14,
  fontWeight: 800,
  fill: "#fff",
  fontFamily: "Inter, system-ui, sans-serif",
}

const edges: Edge[] = [
  {
    id: "e-tank-zion",
    source: "tank",
    target: "zion",
    sourceHandle: "right",
    targetHandle: "right",
    label: "\u2715",
    labelStyle: blockedLabel,
    labelBgStyle: { fill: "#5a1111", fillOpacity: 0.9 },
    style: { stroke: "#ff6b6b", strokeWidth: 2 },
    type: "smoothstep",
  },
  {
    id: "e-zion-sentinel",
    source: "zion",
    target: "sentinel",
    sourceHandle: "right",
    targetHandle: "right",
    label: "\u2715",
    labelStyle: blockedLabel,
    labelBgStyle: { fill: "#5a1111", fillOpacity: 0.9 },
    style: { stroke: "#ff6b6b", strokeWidth: 2 },
    type: "smoothstep",
  },
  {
    id: "e-tank-sentinel",
    source: "tank",
    target: "sentinel",
    label: "\u2715",
    labelStyle: blockedLabel,
    labelBgStyle: { fill: "#5a1111", fillOpacity: 0.9 },
    style: { stroke: "#ff6b6b", strokeWidth: 2 },
    type: "smoothstep",
  },
]

export default function BlockInterVlanDiagram() {
  return (
    <div className="my-8 rounded-2xl border border-red-900/50 overflow-hidden">
      <div
        style={{
          background: "#7B1B1B",
          padding: "12px 0 0 0",
          textAlign: "center",
        }}
      >
        <span
          style={{
            color: "#fff",
            fontSize: 15,
            fontWeight: 700,
            fontFamily: "Inter, system-ui, sans-serif",
            letterSpacing: "0.02em",
          }}
        >
          Rule 1: Block Inter-VLAN
        </span>
      </div>
      <div style={{ height: 340, background: "#7B1B1B" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          panOnDrag={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          preventScrolling={false}
        />
      </div>
    </div>
  )
}
