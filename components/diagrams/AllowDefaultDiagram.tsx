import React from "react"
import ReactFlow, { Node, Edge, MarkerType } from "reactflow"

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
    id: "default",
    position: { x: 150, y: 20 },
    data: { label: "Default" },
    style: nodeStyle,
  },
  {
    id: "tank",
    position: { x: 10, y: 160 },
    data: { label: "Tank" },
    style: nodeStyle,
  },
  {
    id: "zion",
    position: { x: 150, y: 160 },
    data: { label: "Zion" },
    style: nodeStyle,
  },
  {
    id: "sentinel",
    position: { x: 290, y: 160 },
    data: { label: "Sentinel" },
    style: nodeStyle,
  },
]

const edges: Edge[] = [
  {
    id: "e-default-tank",
    source: "default",
    target: "tank",
    style: { stroke: "#a3e635", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#a3e635" },
    type: "smoothstep",
  },
  {
    id: "e-default-zion",
    source: "default",
    target: "zion",
    style: { stroke: "#a3e635", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#a3e635" },
    type: "smoothstep",
  },
  {
    id: "e-default-sentinel",
    source: "default",
    target: "sentinel",
    style: { stroke: "#a3e635", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#a3e635" },
    type: "smoothstep",
  },
]

export default function AllowDefaultDiagram() {
  return (
    <div className="my-8 rounded-2xl border border-green-900/50 overflow-hidden">
      <div
        style={{
          background: "#1B5E3A",
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
          Rule 2: Allow Default to All
        </span>
      </div>
      <div style={{ height: 260, background: "#1B5E3A" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          fitViewOptions={{ padding: 0.35 }}
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
