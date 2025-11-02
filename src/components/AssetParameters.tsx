import React from 'react';
import '../styles/AssetParameters.css';

interface Parameters {
  'Instrument Name': string;
  'Instrument Type': string;
  'IO Type': string;
  'Data Type': string;
  Parent: string;
}

interface AssetParametersProps {
  parameters: Parameters | null;
}

const AssetParameters: React.FC<AssetParametersProps> = ({ parameters }) => {
  if (!parameters) {
    return <div className="asset-container">Select an instrument to view details</div>;
  }

  return (
    <div className="asset-container">
      <div className="asset-header">
        <h2>Instrument - {parameters['Instrument Name']}</h2>
        <p className="subtitle">{parameters['Instrument Type']}</p>
      </div>
      <div className="parameters-section">
        <div className="section-title">Parameters</div>
        <div className="parameters">
          {Object.entries(parameters).map(([key, value]) => (
            <div className="parameter-row" key={key}>
              <span className="label">{key}:</span>
              <span className="value">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssetParameters;