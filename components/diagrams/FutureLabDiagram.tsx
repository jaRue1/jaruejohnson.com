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

const futureStyle = {
  ...baseStyle,
  background: "#2d2a5e",
  border: "2px dashed #6c63ff",
}

const nodes: Node[] = [
  {
    id: "gateway",
    position: { x: 230, y: 0 },
    data: { label: "Cloud Gateway Max" },
    style: { ...infraStyle, width: 200 },
  },
  {
    id: "switch",
    position: { x: 215, y: 110 },
    data: { label: "USW Enterprise 8 PoE" },
    style: { ...infraStyle, width: 230 },
  },
  {
    id: "macmini",
    position: { x: 0, y: 270 },
    data: {
      label: (
        <div>
          <div style={{ fontWeight: 700 }}>Mac Mini</div>
          <div style={{ fontSize: 10, marginTop: 3, color: "#94a3b8", fontStyle: "italic" }}>
            Orchestration
          </div>
        </div>
      ),
    },
    style: { ...existingStyle, width: 140 },
  },
  {
    id: "ap",
    position: { x: 155, y: 270 },
    data: { label: "U7 Lite AP" },
    style: { ...infraStyle, width: 120 },
  },
  {
    id: "spark1",
    position: { x: 290, y: 270 },
    data: {
      label: (
        <div>
          <div style={{ fontWeight: 700 }}>DGX Spark #1</div>
          <div style={{ fontSize: 10, marginTop: 3, color: "#94a3b8", fontStyle: "italic" }}>
            Inference
          </div>
        </div>
      ),
    },
    style: { ...existingStyle, width: 150 },
  },
  {
    id: "spark2",
    position: { x: 460, y: 270 },
    data: {
      label: (
        <div>
          <div style={{ fontWeight: 700 }}>DGX Spark #2</div>
          <div style={{ fontSize: 10, marginTop: 3, color: "#a5b4fc", fontStyle: "italic" }}>
            256GB combined
          </div>
        </div>
      ),
    },
    style: { ...futureStyle, width: 150 },
  },
  {
    id: "minirack",
    position: { x: 10, y: 430 },
    data: {
      label: (
        <div>
          <div style={{ fontWeight: 700 }}>Mini Rack</div>
          <div style={{ fontSize: 10, marginTop: 3, color: "#a5b4fc" }}>
            Raspberry Pi · Infrastructure
          </div>
        </div>
      ),
    },
    style: { ...futureStyle, width: 165 },
  },
  {
    id: "nas",
    position: { x: 195, y: 430 },
    data: {
      label: (
        <div>
          <div style={{ fontWeight: 700 }}>ZimaCube NAS</div>
          <div style={{ fontSize: 10, marginTop: 3, color: "#a5b4fc" }}>
            8TB RAID 1 · Storage
          </div>
        </div>
      ),
    },
    style: { ...futureStyle, width: 165 },
  },
  {
    id: "laptoprack",
    position: { x: 385, y: 430 },
    data: {
      label: (
        <div>
          <div style={{ fontWeight: 700 }}>Laptop Rack</div>
          <div style={{ fontSize: 10, marginTop: 3, color: "#a5b4fc" }}>
            3 workers · Compute
          </div>
        </div>
      ),
    },
    style: { ...futureStyle, width: 165 },
  },
  {
    id: "macbook",
    position: { x: 220, y: 580 },
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
  fontSize: 10,
  fontWeight: 600,
  fill: "#cbd5e1",
  fontFamily: "Inter, system-ui, sans-serif",
}
const labelBgStyle = { fill: "#0f172a", fillOpacity: 0.8 }

const solidEdge = { stroke: "#64748b" }
const greenEdge = { stroke: "#1a8a6a" }
const futureEdge = { stroke: "#6c63ff", strokeDasharray: "6 3" }
const meshEdge = { stroke: "#6366f1", strokeDasharray: "6 3" }

const edges: Edge[] = [
  {
    id: "e-gw-sw",
    source: "gateway",
    target: "switch",
    label: "LAN Trunk",
    labelStyle: edgeLabelStyle,
    labelBgStyle,
    style: solidEdge,
    markerEnd: { type: MarkerType.ArrowClosed, color: "#64748b" },
  },
  {
    id: "e-sw-mac",
    source: "switch",
    target: "macmini",
    label: "Port 2",
    labelStyle: edgeLabelStyle,
    labelBgStyle,
    style: greenEdge,
    markerEnd: { type: MarkerType.ArrowClosed, color: "#1a8a6a" },
  },
  {
    id: "e-sw-ap",
    source: "switch",
    target: "ap",
    label: "Port 3",
    labelStyle: edgeLabelStyle,
    labelBgStyle,
    style: solidEdge,
    markerEnd: { type: MarkerType.ArrowClosed, color: "#64748b" },
  },
  {
    id: "e-sw-spark1",
    source: "switch",
    target: "spark1",
    label: "Port 4",
    labelStyle: edgeLabelStyle,
    labelBgStyle,
    style: greenEdge,
    markerEnd: { type: MarkerType.ArrowClosed, color: "#1a8a6a" },
  },
  {
    id: "e-sw-spark2",
    source: "switch",
    target: "spark2",
    label: "Port 5",
    labelStyle: edgeLabelStyle,
    labelBgStyle,
    style: futureEdge,
    markerEnd: { type: MarkerType.ArrowClosed, color: "#6c63ff" },
  },
  {
    id: "e-spark-link",
    source: "spark1",
    target: "spark2",
    label: "ConnectX-7 DAC",
    labelStyle: { ...edgeLabelStyle, fill: "#a5b4fc" },
    labelBgStyle,
    style: { stroke: "#818cf8", strokeWidth: 2, strokeDasharray: "4 2" },
  },
  {
    id: "e-sw-minirack",
    source: "switch",
    target: "minirack",
    label: "PoE",
    labelStyle: edgeLabelStyle,
    labelBgStyle,
    style: futureEdge,
    markerEnd: { type: MarkerType.ArrowClosed, color: "#6c63ff" },
  },
  {
    id: "e-sw-nas",
    source: "switch",
    target: "nas",
    label: "10GbE",
    labelStyle: edgeLabelStyle,
    labelBgStyle,
    style: futureEdge,
    markerEnd: { type: MarkerType.ArrowClosed, color: "#6c63ff" },
  },
  {
    id: "e-laptop-sw",
    source: "laptoprack",
    target: "switch",
    label: "NetBird",
    labelStyle: edgeLabelStyle,
    labelBgStyle,
    style: meshEdge,
    markerEnd: { type: MarkerType.ArrowClosed, color: "#6366f1" },
  },
  {
    id: "e-macbook-sw",
    source: "macbook",
    target: "switch",
    label: "NetBird mesh",
    labelStyle: edgeLabelStyle,
    labelBgStyle,
    style: meshEdge,
    markerEnd: { type: MarkerType.ArrowClosed, color: "#6366f1" },
  },
]

export default function FutureLabDiagram() {
  return (
    <div
      className="my-8 rounded-2xl border border-gray-700/40 overflow-hidden"
      style={{ height: 700, background: "#0f172a" }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        fitViewOptions={{ padding: 0.15 }}
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
