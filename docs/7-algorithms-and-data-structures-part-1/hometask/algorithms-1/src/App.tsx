import React, { useRef, useState } from 'react';
import './App.css';
import { Graph } from './graph';
import { Node, Path } from './types';
import View from './view';
import { Dijkstra } from './dijkstra';


function App() {
  const stateRef = useRef(new Graph());
  const [state, setState] = useState<{ [key: string]: Node }>({});
  const [inputState, setInputState] = useState({ create: '', v1: '', v2: '', weight: '', p1: '', p2: '', allPathVertex: ''});
  const [shortPathState, setShortPathState] = useState<Path | null>(null);
  const [allShortPathState, setAllShortPathState] = useState('');
  const updateState = () => setState((s) => ({...stateRef.current.vertexes}));
  const clearPath = () => {
    setShortPathState(null);
    setInputState((s) => ({...s, p1: '', p2: ''}));
  };
  return (
    <div className="App">
      <View nodes={state} shortPath={shortPathState} />
      <div className="form">
        <input value={inputState.create} placeholder="Enter key" onChange={(v) => setInputState((s) => ({...s, create: v.target.value}))}/>
        <button
          disabled={!inputState.create || !!state[inputState.create]}
          onClick={() => {
          stateRef.current.addVertex(inputState.create);
          setInputState((s) => ({ ...s, create: ''}))
          updateState()
        }}>create</button>
      </div>
      <div className="form">
        <input value={inputState.v1} placeholder="Enter key 1" onChange={(v) => setInputState((s) => ({...s, v1: v.target.value}))}/>
        <input value={inputState.v2} placeholder="Enter key 2" onChange={(v) => setInputState((s) => ({...s, v2: v.target.value}))}/>
        <input value={inputState.weight} placeholder="Enter weight" onChange={(v) => setInputState((s) => ({...s, weight: v.target.value}))}/>
        <button
          disabled={!inputState.weight || !stateRef.current.vertexes[inputState.v1] || !stateRef.current.vertexes[inputState.v2] || inputState.v1 === inputState.v2}
          onClick={() => {
          stateRef.current.addEdge(inputState.v1, inputState.v2, +inputState.weight);
          setInputState((s) => ({ ...s, weight: '', v1: '', v2: ''}))
          updateState()
        }}>connect</button>
      </div>

      <div className="form">
        <input
          value={inputState.p1}
          placeholder="Enter from"
          onChange={(v) => setInputState((s) => ({...s, p1: v.target.value}))}
        />
        <input value={inputState.p2} placeholder="Enter to" onChange={(v) => setInputState((s) => ({...s, p2: v.target.value}))}/>
        <button
          disabled={!stateRef.current.vertexes[inputState.p1] || !stateRef.current.vertexes[inputState.p2] || inputState.p1 === inputState.p2}
          onClick={() => {
          clearPath();
          setShortPathState(new Dijkstra(stateRef.current).findShortestPath(inputState.p1, inputState.p2))
        }}>shortest path</button>
        <button onClick={clearPath} disabled={!inputState.p1 && !inputState.p2}>Clear</button>
        <h2>{shortPathState && `The path is ${shortPathState?.distance}`}</h2>
      </div>

      <div className="form">
        <input value={inputState.allPathVertex} placeholder="Enter from" onChange={(v) => setInputState((s) => ({...s, allPathVertex: v.target.value}))}/>
        <button
          disabled={!stateRef.current.vertexes[inputState.allPathVertex]}
          onClick={() => {
          setAllShortPathState(JSON.stringify(new Dijkstra(stateRef.current).findAllShortestPaths(inputState.allPathVertex), null, '\t'))
        }}>find All Shortest Paths</button>
        <button onClick={() => {
          const DEFAULT_TIME = 300;
          let timer = -DEFAULT_TIME;
          stateRef.current.visitAllNodes((node, fromNode) => {
            timer += DEFAULT_TIME;
            setTimeout(() => {
              document.querySelector(`#id_${node.key}`)?.classList.add('isActive');
              console.log(node, `${node.key} is visited from ${fromNode.key}`);
            }, timer)

            setTimeout(() => {
              document.querySelector(`#id_${node.key}`)?.classList.remove('isActive');
            }, timer + DEFAULT_TIME)
          }, stateRef.current.vertexes[inputState.allPathVertex]);
          updateState()
        }}>visit all nodes</button>
        <button
          disabled={!inputState.allPathVertex}
          onClick={() => {
          setAllShortPathState('');
          setInputState((s) => ({ ...s, allPathVertex: '' }))
        }}>Clear</button>
        <pre>{allShortPathState}</pre>
      </div>
    </div>
  );
}

export default App;
