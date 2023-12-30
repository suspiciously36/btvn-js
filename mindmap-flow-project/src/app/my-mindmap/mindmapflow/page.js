"use client";

import { useCallback, useRef } from "react";
import ReactFlow, {
  Controls,
  MiniMap,
  Background,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "reactflow";

import TextUpdaterNode from "./components/textUpdaterNode/textUpdaterNode";
import "reactflow/dist/style.css";
import NodeAdder from "./components/AddNode/NodeAdder";

const nodeTypes = {
  textUpdater: TextUpdaterNode,
};

let id = 1;
const getId = () => `${id++}`;

function AddNodeOnEdgeDrop() {
  const initialNodes = [
    {
      deletable: false,
      id: "0",
      position: { x: 0, y: 0 },
      data: {
        isEditable: false,
        isFatherNode: true,
        onNodesBlur() {},
        onNodesSubmit() {},
      },
      type: "textUpdater",
      style: {
        background: "green",
        border: "1px solid #000",
        borderRadius: "5px",
      },
    },
  ];

  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();

  const onNodesClick = useCallback((_, { id }) => {
    setNodes((nds) => {
      const newNds = [...nds];
      newNds[id].data = { ...newNds[id].data };
      newNds[id].style = {
        background: "green",
        border: "1px solid orangered",
        borderRadius: "5px",
      };

      return newNds;
    });
  });

  const onNodesDblClick = useCallback((_, { id }) => {
    setNodes((nds) => {
      const newNds = [...nds];
      newNds[id].data = { ...newNds[id].data };
      newNds[id].data.isEditable = true;
      newNds[id].data.onNodesBlur = () => {
        setNodes((nds) => {
          const newNds = [...nds];
          newNds[id].data = { ...newNds[id].data };
          newNds[id].data.isEditable = false;
          return newNds;
        });
      };
      newNds[id].data.onNodesSubmit = (e) => {
        if (e.code === "Enter") {
          setNodes((nds) => {
            const newNds = [...nds];
            newNds[id].data = { ...newNds[id].data };
            newNds[id].data.isEditable = false;
            return newNds;
          });
        }
      };
      return newNds;
    });
  }, []);

  const onConnect = useCallback((params) => {
    connectingNodeId.current = null;
    setEdges((eds) => addEdge(params, eds));
  }, []);

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      if (!connectingNodeId.current) return;

      const targetIsPane = event.target.classList.contains("react-flow__pane");

      if (targetIsPane) {
        const id = getId();
        const newNode = {
          deletable: true,
          id,
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          }),
          data: { isEditable: false, isFatherNode: false, deletable: true },
          origin: [0.5, 0.0],
          type: "textUpdater",
          style: {
            background: "green",
            border: "1px solid #000",
            borderRadius: "5px",
          },
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds.concat({ id, source: connectingNodeId.current, target: id })
        );
      }
    },
    [screenToFlowPosition]
  );

  const nodeColor = (node) => {
    switch (node.type) {
      default:
        return "orange";
    }
  };

  return (
    <div className="wrapper py-5" ref={reactFlowWrapper}>
      <NodeAdder />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        deleteKeyCode={"Delete"}
        onNodeClick={onNodesClick}
        onNodeDoubleClick={onNodesDblClick}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        fitView
        fitViewOptions={{ padding: 2 }}
        nodeOrigin={[0.5, 0]}
        nodeTypes={nodeTypes}
      >
        <Controls />
        <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}

function AddNode() {
  return (
    <ReactFlowProvider>
      <AddNodeOnEdgeDrop />
    </ReactFlowProvider>
  );
}

export default AddNode;
