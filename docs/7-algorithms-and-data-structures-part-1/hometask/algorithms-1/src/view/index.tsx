import React, { useEffect, useState } from 'react';
import { Node, Path } from '../types';
import drawConnections from '../drawConnections';
import classNames from 'classnames';

interface IView {
  nodes: {[key: string]: Node};
  shortPath: Path | null;
}

interface IState {
  activeNodes: Node[];
  enterNode: Node | null;
}

const View: React.FC<IView> = ({ nodes, shortPath }) => {
  const initState = {activeNodes: [], enterNode: null};
  const [{activeNodes, enterNode}, setState] = useState<IState>({...initState});
  const redraw = () => {
    const connections = document.querySelectorAll('.connection');
    Array.from(connections).forEach(drawConnections);
  }
  useEffect(redraw, [nodes, activeNodes, enterNode]);
  useEffect(() => {
    window.addEventListener('resize', redraw);
  }, [])
  const added: string[] = [];

  const addActiveClass = (key: string) => {
    setState((s) => ({
      ...s,
      activeNodes: [nodes[key], ...nodes[key].connections.map((c) => nodes[c.neighbor.key])],
      enterNode: nodes[key]
    }))
  }

  return <div className={'container'}>
    {
      Object.values(nodes).map(({key, connections}) => {
        added.push(key);
        return <div key={key}
          className={classNames('node', {'isActive': activeNodes.length ? activeNodes.some(a => a.key === key) : shortPath?.path.some(s => s === key)})}
          id={`id_${key}`}
          onMouseEnter={() => addActiveClass(key)}
          onMouseLeave={() => setState(() => ({...initState}))}
        >
          <h2>{key}</h2>
          {connections.
            filter((c) => added.some((a) => a === c.neighbor.key))
            .map(c => {
              return <div
                className={classNames('connection', {'isActive': enterNode?.key === c.neighbor.key || key === enterNode?.key})}
                data-from={key} data-to={c.neighbor.key}
                key={`${key} ${c.neighbor.key}`}
              >
                <div className="weight">{c.weight}</div>
              </div>
          })}
        </div>
      })
    }
  </div>
}

export default View;
