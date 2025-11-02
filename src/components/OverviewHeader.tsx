import "../styles/OverviewHeader.css";
import data from "../Data/asset.json";

interface TreeNode {
  id: number;
  name: string;
  type: string;
  status?: string;
  children?: TreeNode[];
}

const OverviewHeader: React.FC = () => {

    const countTotalAssets = (Nodes: TreeNode[]) => {
        let count =0;
        const traverse = (nodes: TreeNode[]) => {
            for (const node of nodes) {
                if(node.type === "Equipment" || node.type === "Instrument")
                count++;
                if (node.children) {
                    traverse(node.children);
                }
            }
        };
        traverse(Nodes);
        return count;
    }

    const countTotalUnmappedAssets = (Nodes: TreeNode[]) => {
        let count =0;
        const traverse = (nodes: TreeNode[]) => {
            for (const node of nodes) {
                if((node.type === "Equipment" || node.type === "Instrument") && node.status === "Needs Review")
                count++;
                if (node.children) {
                    traverse(node.children);
                }
            }
        };
        traverse(Nodes);
        return count;
    }

    const uploadNewFile = () => {
        
    }

    return (
        <div className='overview-header'>
            <h5 className='overview-title'>Packaging Assets - An Overview</h5>
            <div className='overview-subtitle'>
            <div className='total-asset-title'>Total assets
                <div className='total-asset'>{countTotalAssets(data)}</div>
            </div>
            
            <div className='total-unmapped-title'> 
                <div className='text-line'>
                  <span className='blinking-dot'></span>
                  Unmapped assets
                  </div>
                <div className='total-unmapped-asset'>{countTotalUnmappedAssets(data)}</div>
            </div>
            </div>
            <button className='review-map-btn'>Review and Map</button>
            <label htmlFor="file-upload" className='upload-asset-btn'
             >Upload New File</label>
            <input 
                type="file" 
                id="file-upload" 
                accept="application/json"
                style={{ display: 'none' }} 
                onClick={uploadNewFile}
            />

        </div>
    );
};

export default OverviewHeader;