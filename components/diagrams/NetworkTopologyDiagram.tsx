import React from "react"
import ReactFlow, {
  Node,
  Edge,
  MarkerType,
  Background,
  BackgroundVariant,
} from "reactflow"

const nodeDefaults = {
  style: {
    background: "#1a1a2e",
    border: "1px solid #555",
    borderRadius: 8,
    color: "#e2e8f0",
    fontSize: 13,
    fontWeight: 600,
    padding: "10px 16px",
    textAlign: "center" as const,
    fontFamily: "Inter, system-ui, sans-serif",
  },
}

const nodes: Node[] = [
  {
    id: "modem",
    position: { x: 220, y: 0 },
    data: { label: "AT&T Modem" },
    style: { ...nodeDefaults.style, width: 160 },
  },
  {
    id: "gateway",
    position: { x: 195, y: 110 },
    data: { label: "Cloud Gateway Max" },
    style: { ...nodeDefaults.style, width: 210 },
  },
  {
    id: "switch",
    position: { x: 185, y: 220 },
    data: { label: "USW-Enterprise-8-PoE" },
    style: { ...nodeDefaults.style, width: 230 },
  },
  {
    id: "macmini",
    position: { x: 50, y: 360 },
    data: { label: "Mac Mini - Wired Only" },
    style: { ...nodeDefaults.style, width: 200 },
  },
  {
    id: "ap",
    position: { x: 370, y: 360 },
    data: { label: "U7 Lite AP" },
    style: { ...nodeDefaults.style, width: 160 },
  },
  {
    id: "sentinel",
    position: { x: 0, y: 500 },
    data: {
      label: (
        <div>
          <div style={{ fontWeight: 700 }}>Sentinel - VLAN</div>
          <div style={{ fontSize: 11, marginTop: 4, opacity: 0.9 }}>
            30 | 10.10.30.0/24
          </div>
        </div>
      ),
    },
    style: {
      background: "#7B1B1B",
      border: "1px solid #a33",
      borderRadius: 6,
      color: "#fff",
      fontSize: 13,
      padding: "10px 14px",
      textAlign: "center" as const,
      width: 170,
    },
  },
  {
    id: "tank",
    position: { x: 210, y: 500 },
    data: {
      label: (
        <div>
          <div style={{ fontWeight: 700 }}>Tank - VLAN</div>
          <div style={{ fontSize: 11, marginTop: 4, opacity: 0.9 }}>
            10 | 10.10.10.0/24
          </div>
        </div>
      ),
    },
    style: {
      background: "#1E3A5F",
      border: "1px solid #2a6",
      borderRadius: 6,
      color: "#fff",
      fontSize: 13,
      padding: "10px 14px",
      textAlign: "center" as const,
      width: 170,
      borderColor: "#3b6fa8",
    },
  },
  {
    id: "zion",
    position: { x: 420, y: 500 },
    data: {
      label: (
        <div>
          <div style={{ fontWeight: 700 }}>Zion - VLAN</div>
          <div style={{ fontSize: 11, marginTop: 4, opacity: 0.9 }}>
            20 | 10.10.20.0/24
          </div>
        </div>
      ),
    },
    style: {
      background: "#1B4D3E",
      border: "1px solid #2a8a5f",
      borderRadius: 6,
      color: "#fff",
      fontSize: 13,
      padding: "10px 14px",
      textAlign: "center" as const,
      width: 170,
    },
  },
]

const edgeLabelStyle = {
  fontSize: 11,
  fontWeight: 600,
  fill: "#cbd5e1",
  fontFamily: "Inter, system-ui, sans-serif",
}

const edges: Edge[] = [
  {
    id: "e-modem-gw",
    source: "modem",
    target: "gateway",
    label: "WAN",
    labelStyle: edgeLabelStyle,
    labelBgStyle: { fill: "#0f172a", fillOpacity: 0.8 },
    style: { stroke: "#64748b" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#64748b" },
  },
  {
    id: "e-gw-sw",
    source: "gateway",
    target: "switch",
    label: "LAN - Trunk",
    labelStyle: edgeLabelStyle,
    labelBgStyle: { fill: "#0f172a", fillOpacity: 0.8 },
    style: { stroke: "#64748b" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#64748b" },
  },
  {
    id: "e-sw-mac",
    source: "switch",
    target: "macmini",
    label: "Port 2 - VLAN 30",
    labelStyle: edgeLabelStyle,
    labelBgStyle: { fill: "#0f172a", fillOpacity: 0.8 },
    style: { stroke: "#64748b" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#64748b" },
  },
  {
    id: "e-sw-ap",
    source: "switch",
    target: "ap",
    label: "Port 3 - PoE",
    labelStyle: edgeLabelStyle,
    labelBgStyle: { fill: "#0f172a", fillOpacity: 0.8 },
    style: { stroke: "#64748b" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#64748b" },
  },
  {
    id: "e-mac-sentinel",
    source: "macmini",
    target: "sentinel",
    style: { stroke: "#7B1B1B", strokeDasharray: "6 3" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#7B1B1B" },
  },
  {
    id: "e-ap-tank",
    source: "ap",
    target: "tank",
    label: "SSID",
    labelStyle: edgeLabelStyle,
    labelBgStyle: { fill: "#0f172a", fillOpacity: 0.8 },
    style: { stroke: "#3b6fa8" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#3b6fa8" },
  },
  {
    id: "e-ap-zion",
    source: "ap",
    target: "zion",
    label: "SSID",
    labelStyle: edgeLabelStyle,
    labelBgStyle: { fill: "#0f172a", fillOpacity: 0.8 },
    style: { stroke: "#2a8a5f" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#2a8a5f" },
  },
]

export default function NetworkTopologyDiagram() {
  return (
    <div
      className="my-8 rounded-2xl border border-gray-700/40 overflow-hidden"
      style={{ height: 620, background: "#0f172a" }}
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
