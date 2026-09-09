import React from "react"
import ReactFlow, {
  Node,
  Edge,
  MarkerType,
  Position,
  Background,
  BackgroundVariant,
} from "reactflow"

const NODE_W = 230
const NODE_H = 64
const PITCH = 256

const baseStyle = {
  borderRadius: 8,
  color: "#e2e8f0",
  fontSize: 13,
  fontWeight: 600,
  padding: "8px 10px",
  textAlign: "center" as const,
  fontFamily: "Inter, system-ui, sans-serif",
  width: NODE_W,
  height: NODE_H,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

const builtStyle = {
  ...baseStyle,
  background: "#0d3d30",
  border: "1px solid #1a8a6a",
}

const queueStyle = {
  ...baseStyle,
  background: "#3a2a0f",
  border: "1px solid #b45309",
}

const externalStyle = {
  ...baseStyle,
  background: "#1e1b4b",
  border: "1px solid #6366f1",
}

const reviewStyle = {
  ...baseStyle,
  background: "#3d0d0d",
  border: "1px solid #b91c1c",
}

function nodeLabel(title: string, subtitle?: string) {
  return (
    <div>
      <div style={{ fontWeight: 700 }}>{title}</div>
      {subtitle && (
        <div style={{ fontSize: 11, marginTop: 4, color: "#94a3b8" }}>
          {subtitle}
        </div>
      )}
    </div>
  )
}

const lr = { sourcePosition: Position.Right, targetPosition: Position.Left }

const ROW1 = 30
const ROW2 = 300

const nodes: Node[] = [
  {
    id: "partner",
    position: { x: 0, y: ROW1 },
    data: { label: nodeLabel("Trading Partner", "sends an 850") },
    style: externalStyle,
    ...lr,
  },
  {
    id: "orderful-in",
    position: { x: PITCH, y: ROW1 },
    data: { label: nodeLabel("EDI Trading Partner", "EDI network") },
    style: externalStyle,
    ...lr,
  },
  {
    id: "poll",
    position: { x: PITCH * 2, y: ROW1 },
    data: { label: nodeLabel("EDI poll cron", "every 10 minutes") },
    style: builtStyle,
    ...lr,
  },
  {
    id: "idempotency",
    position: { x: PITCH * 3, y: ROW1 },
    data: { label: nodeLabel("Idempotency check", "seen it? drop it") },
    style: queueStyle,
    ...lr,
  },
  {
    id: "handler",
    position: { x: PITCH * 4, y: ROW1 },
    data: { label: nodeLabel("850 handler", "resolve buyer items") },
    style: builtStyle,
    ...lr,
  },
  {
    id: "po",
    position: { x: PITCH * 5, y: ROW1 },
    data: { label: nodeLabel("Purchase order created", "lines · ship-to · carrier") },
    style: builtStyle,
    ...lr,
  },
  {
    id: "invcheck",
    position: { x: PITCH * 6, y: ROW1 },
    data: { label: nodeLabel("inventory-check queue", "serialized · row locks") },
    style: queueStyle,
    ...lr,
  },
  {
    id: "accepted",
    position: { x: PITCH * 7, y: ROW1 },
    data: { label: nodeLabel("Accepted + allocated", "stock covers it") },
    style: builtStyle,
    sourcePosition: Position.Bottom,
    targetPosition: Position.Left,
  },
  {
    id: "flagged",
    position: { x: PITCH * 6 + 12, y: 190 },
    data: { label: nodeLabel("Flagged for review", "never auto-accepted") },
    style: reviewStyle,
    targetPosition: Position.Top,
  },
  {
    id: "ack855",
    position: { x: 128, y: ROW2 },
    data: { label: nodeLabel("855 Acknowledgment", "order confirmed") },
    style: builtStyle,
    sourcePosition: Position.Right,
    targetPosition: Position.Top,
  },
  {
    id: "fedex",
    position: { x: 128 + PITCH, y: ROW2 },
    data: { label: nodeLabel("Carrier API", "shipment + label") },
    style: externalStyle,
    ...lr,
  },
  {
    id: "asn856",
    position: { x: 128 + PITCH * 2, y: ROW2 },
    data: { label: nodeLabel("856 Advance Ship Notice", "pallets on a truck") },
    style: builtStyle,
    ...lr,
  },
  {
    id: "inv810",
    position: { x: 128 + PITCH * 3, y: ROW2 },
    data: { label: nodeLabel("810 Invoice") },
    style: builtStyle,
    ...lr,
  },
  {
    id: "qb",
    position: { x: 128 + PITCH * 4, y: ROW2 },
    data: { label: nodeLabel("Accounting Software", "invoice synced") },
    style: externalStyle,
    ...lr,
  },
  {
    id: "orderful-out",
    position: { x: 128 + PITCH * 5, y: ROW2 },
    data: { label: nodeLabel("Back through EDI network", "to the trading partner") },
    style: externalStyle,
    ...lr,
  },
]

const edgeLabelStyle = {
  fontSize: 11,
  fontWeight: 600,
  fill: "#cbd5e1",
  fontFamily: "Inter, system-ui, sans-serif",
}
const labelBgStyle = { fill: "#0f172a", fillOpacity: 0.8 }

const greenEdge = {
  labelStyle: edgeLabelStyle,
  labelBgStyle,
  style: { stroke: "#1a8a6a" },
  markerEnd: { type: MarkerType.ArrowClosed, color: "#1a8a6a" },
}

const indigoEdge = {
  labelStyle: edgeLabelStyle,
  labelBgStyle,
  style: { stroke: "#6366f1", strokeDasharray: "6 3" },
  markerEnd: { type: MarkerType.ArrowClosed, color: "#6366f1" },
}

const redEdge = {
  labelStyle: edgeLabelStyle,
  labelBgStyle,
  style: { stroke: "#b91c1c" },
  markerEnd: { type: MarkerType.ArrowClosed, color: "#b91c1c" },
}

const edges: Edge[] = [
  { id: "e-partner-orderful", source: "partner", target: "orderful-in", ...indigoEdge },
  { id: "e-orderful-poll", source: "orderful-in", target: "poll", ...indigoEdge },
  { id: "e-poll-idem", source: "poll", target: "idempotency", ...greenEdge },
  { id: "e-idem-handler", source: "idempotency", target: "handler", ...greenEdge },
  { id: "e-handler-po", source: "handler", target: "po", ...greenEdge },
  { id: "e-po-inv", source: "po", target: "invcheck", ...greenEdge },
  { id: "e-inv-accepted", source: "invcheck", target: "accepted", ...greenEdge },
  { id: "e-inv-flagged", source: "invcheck", target: "flagged", label: "shortfall", ...redEdge },
  {
    id: "e-accepted-855",
    source: "accepted",
    target: "ack855",
    label: "acceptance triggers the return leg",
    animated: true,
    ...greenEdge,
  },
  { id: "e-855-fedex", source: "ack855", target: "fedex", ...greenEdge },
  { id: "e-fedex-856", source: "fedex", target: "asn856", ...greenEdge },
  { id: "e-856-810", source: "asn856", target: "inv810", ...greenEdge },
  { id: "e-810-qb", source: "inv810", target: "qb", ...indigoEdge },
  { id: "e-qb-orderful", source: "qb", target: "orderful-out", ...indigoEdge },
]

export default function EdiLifecycleDiagram() {
  return (
    <div
      className="my-8 rounded-2xl border border-gray-700/40 overflow-x-auto"
      style={{ background: "#0f172a" }}
    >
      <div style={{ width: 2080, height: 430 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          fitViewOptions={{ padding: 0.05 }}
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
    </div>
  )
}
