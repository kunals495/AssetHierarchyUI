import '../styles/OverviewMain.css';
import AssetParameters from './AssetParameters';

interface Parameters {
  'Instrument Name': string;
  'Instrument Type': string;
  'IO Type': string;
  'Data Type': string;
  Parent: string;
}

interface OverviewMainProps {
  selectedInstrument: Parameters | null;
}

const OverviewMain: React.FC<OverviewMainProps> = ({ selectedInstrument }) => {
  return (
    <>
      {selectedInstrument ? (
        <AssetParameters parameters={selectedInstrument} />
      ) : (
        <div className="overview-main">
          <h2 className="success-text">Asset hierarchy generated successfully!</h2>
          <p className="info-text">You can manage the assets by</p>
          <ul className="checklist">
            <li>Validate the unmapped instruments</li>
            <li>Add a new equipment or an instrument</li>
            <li>Edit instrument parameters</li>
            <li>Remove an equipment or instrument</li>
          </ul>
        </div>
      )}
    </>
  );
};

export default OverviewMain;