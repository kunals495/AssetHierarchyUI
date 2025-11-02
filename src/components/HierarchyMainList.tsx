import { useState, useEffect, useRef } from 'react';
import '../styles/HierarchyMainList.css';
import arrow from '../assets/down-arrow.png';
import location from '../assets/location.png';
import packageIcon from '../assets/package-box.png';
import data from '../Data/asset.json';

interface Parameters {
  'Instrument Name': string;
  'Instrument Type': string;
  'IO Type': string;
  'Data Type': string;
  Parent: string;
}

interface TreeNode {
  id: number;
  name: string;
  type: string;
  status?: string;
  children?: TreeNode[];
  parameters?: Parameters;
}

interface HierarchyMainListProps {
  onSelectInstrument: (parameters: Parameters | null) => void;
}

const HierarchyMainList: React.FC<HierarchyMainListProps> = ({ onSelectInstrument }) => {
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number } | null>(null);
  const [menuOptions, setMenuOptions] = useState<string[]>([]);
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuPosition(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleExpand = (id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelect = (node: TreeNode) => {
    if (node.type === 'Instrument' && node.parameters) {
      setSelectedId(node.id);
      onSelectInstrument(node.parameters);
    } else {
      setSelectedId(null);
      onSelectInstrument(null);
    }
  };

  const handleMenuClick = (e: React.MouseEvent, node: TreeNode) => {
    e.stopPropagation();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setMenuPosition({
      top: rect.top + window.scrollY,
      left: rect.right + 5,
    });
    setActiveNodeId(node.id);

    if (node.type === 'Equipment') {
      setMenuOptions(['Add Equipment', 'Add Instrument', 'Move', 'Delete']);
    } else if (node.type === 'Instrument') {
      setMenuOptions(['Approve', 'Move', 'Delete']);
    } else {
      setMenuOptions([]);
    }
  };

  const getIcon = (type: string) => {
    if (type === 'Area') return location;
    if (type === 'Unit') return packageIcon;
    return null;
  };

  const getArrowClass = (level: number) => {
    if (level === 0) return 'arrow-icon-area';
    if (level === 1) return 'arrow-icon-unit';
    return 'arrow-icon';
  };

  const renderTree = (nodes: TreeNode[], level: number = 0) => {
    return nodes.map((node) => {
      const hasChildren = node.children && node.children.length > 0;
      const isExpanded = expanded[node.id];
      const icon = getIcon(node.type);
      const isSelected = selectedId === node.id;

      return (
        <div key={node.id}>
          <div
            className={`asset-item ${isSelected ? 'selected' : ''}`}
            onClick={() => handleSelect(node)}
          >
            {hasChildren ? (
              <img
                className={getArrowClass(level)}
                src={arrow}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpand(node.id);
                }}
                style={{
                  transform: isExpanded ? 'rotate(0deg)' : 'rotate(270deg)',
                  transition: 'transform 0.2s',
                }}
              />
            ) : (
              <div className={getArrowClass(level)} style={{ width: '15px' }}></div>
            )}
            {icon && <img className={level === 0 ? 'area-icon' : 'unit-icon'} src={icon} />}
            {!icon && (
              <label className="check-item">
                <input type="checkbox" />
              </label>
            )}
            <div className="area-text">
              <span className="area-title">{node.name}</span>
              <span className="area-subtitle">{node.status || node.type}</span>
            </div>
            {!icon && (
              <button
                className="three-dots-btn"
                onClick={(e) => handleMenuClick(e, node)}
              >
                ⋮
              </button>
            )}
          </div>
          {hasChildren && isExpanded && <div>{renderTree(node.children!, level + 1)}</div>}
        </div>
      );
    });
  };

  return (
    <div className="asset-list" style={{ position: 'relative' }}>
      {data && data.length > 0 ? (
        renderTree(data)
      ) : (
        <div className="no-asset-message">No assets available</div>
      )}

     {menuPosition && menuOptions.length > 0 && (
  <div
    ref={menuRef}
    className="context-menu"
    style={{
      top: `${menuPosition.top}px`,
      left: `${menuPosition.left}px`,
      position: 'fixed',  
      zIndex: 1,       
    }}
  >
    {menuOptions.map((option, idx) => (
      <div
        key={idx}
        className="context-menu-item"
        onClick={() => {
          console.log(`Selected: ${option} for node ${activeNodeId}`);
          setMenuPosition(null);
        }}
      >
        {option}
      </div>
    ))}
  </div>
)}

    </div>
  );
};

export default HierarchyMainList;
