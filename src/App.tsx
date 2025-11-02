import './App.css';
import LeftNav from './components/LeftNav';
import HierarchyHeader from './components/HierarchyHeader';
import downArrow from './assets/down-arrow.png';
import HierarchyMainList from './components/HierarchyMainList';
import OverviewHeader from './components/OverviewHeader';
import OverviewMain from './components/OverviewMain';
import { useState } from 'react';

interface Parameters {
  'Instrument Name': string;
  'Instrument Type': string;
  'IO Type': string;
  'Data Type': string;
  Parent: string;
}

const App: React.FC = () => {
  const [selectedInstrument, setSelectedInstrument] = useState<Parameters | null>(null);

  return (
    <div className="app">
      <LeftNav />
      <div className="main-wrapper">
        <div className="header-row">
          <h6 className="text-header">Brewery / Packaging</h6>
          <span className="static-btn">
            <span className="x-icon">&times;</span>
            <span>Main</span>
            <span className="arrow">
              <img src={downArrow} />
            </span>
          </span>
        </div>
        <div className="main-container">
          <div className="hierarchy-container">
            <HierarchyHeader />
            <HierarchyMainList onSelectInstrument={setSelectedInstrument} />
          </div>
          <div className="detail-container">
            <OverviewHeader />
            <OverviewMain selectedInstrument={selectedInstrument} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;