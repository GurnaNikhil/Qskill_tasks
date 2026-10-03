import React, { useState } from 'react';
import { Database, Search, ArrowUpDown, Download, Check, ShieldCheck, HelpCircle } from 'lucide-react';
import { RAW_HOUSES, HouseRecord } from '../data/houseDataset';

export const DatasetExplorer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof HouseRecord>('price');
  const [sortAsc, setSortAsc] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filter
  const filteredHouses = RAW_HOUSES.filter((h) => {
    const term = searchTerm.toLowerCase();
    return (
      h.zipcode.toString().includes(term) ||
      h.bedrooms.toString().includes(term) ||
      h.price.toString().includes(term) ||
      h.grade.toString().includes(term)
    );
  });

  // Sort
  const sortedHouses = [...filteredHouses].sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];
    if (typeof valA === 'number' && typeof valB === 'number') {
      return sortAsc ? valA - valB : valB - valA;
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedHouses.length / itemsPerPage);
  const displayedHouses = sortedHouses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSort = (field: keyof HouseRecord) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const downloadCsv = () => {
    const header = 'id,date,price,bedrooms,bathrooms,sqft_living,sqft_lot,floors,waterfront,view,condition,grade,sqft_above,sqft_basement,yr_built,yr_renovated,zipcode,lat,long,sqft_living15,sqft_lot15\n';
    const rows = RAW_HOUSES.map(h =>
      `${h.id},${h.date},${h.price},${h.bedrooms},${h.bathrooms},${h.sqft_living},${h.sqft_lot},${h.floors},${h.waterfront},${h.view},${h.condition},${h.grade},${h.sqft_above},${h.sqft_basement},${h.yr_built},${h.yr_renovated},${h.zipcode},${h.lat},${h.long},${h.sqft_living15},${h.sqft_lot15}`
    ).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'house_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Step 1 & Important Requirements Explanation Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div className="text-xs uppercase tracking-wider text-blue-400 font-semibold mb-1">
              Dataset Verification & Specifications
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">Kaggle Dataset Identification & Column Schema</h2>
            <p className="text-xs text-slate-400">Authentic real-world dataset metadata and verification details</p>
          </div>
          <button
            onClick={downloadCsv}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download house_data.csv</span>
          </button>
        </div>

        {/* 5 Specific Required Questions Answered in Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/60">
            <span className="text-slate-400 block font-medium">1. Kaggle Dataset Used</span>
            <strong className="text-white text-sm block mt-0.5">House Sales in King County, USA</strong>
            <p className="text-[11px] text-slate-400 mt-1">Source file: <code className="text-cyan-400 font-mono">kc_house_data.csv</code> (Seattle metropolitan area, WA).</p>
          </div>

          <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/60">
            <span className="text-slate-400 block font-medium">2. Why It Is Suitable</span>
            <strong className="text-white text-sm block mt-0.5">Real Transactions & Rich Features</strong>
            <p className="text-[11px] text-slate-400 mt-1">Contains room counts, living area, construction grade, view ratings, and geographic coordinates.</p>
          </div>

          <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/60">
            <span className="text-slate-400 block font-medium">3. Target Column</span>
            <strong className="text-emerald-400 text-sm block mt-0.5">price (US Dollars $)</strong>
            <p className="text-[11px] text-slate-400 mt-1">Continuous numeric sale price of each residential unit. Currency is USD ($).</p>
          </div>
        </div>

        {/* Column Glossary */}
        <div className="pt-2">
          <h4 className="text-xs uppercase font-semibold text-slate-300 mb-2">Important Features Dictionary:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
            <div className="p-2 bg-slate-800/40 rounded border border-slate-800">
              <span className="font-mono text-cyan-400 font-semibold">sqft_living</span>
              <p className="text-[11px] text-slate-400 mt-0.5">Square footage of interior living space</p>
            </div>
            <div className="p-2 bg-slate-800/40 rounded border border-slate-800">
              <span className="font-mono text-amber-400 font-semibold">grade (1-13)</span>
              <p className="text-[11px] text-slate-400 mt-0.5">King County design & construction quality score</p>
            </div>
            <div className="p-2 bg-slate-800/40 rounded border border-slate-800">
              <span className="font-mono text-blue-400 font-semibold">bedrooms & bathrooms</span>
              <p className="text-[11px] text-slate-400 mt-0.5">Room capacity and fixture bathroom count</p>
            </div>
            <div className="p-2 bg-slate-800/40 rounded border border-slate-800">
              <span className="font-mono text-purple-400 font-semibold">waterfront & view</span>
              <p className="text-[11px] text-slate-400 mt-0.5">Waterfront indicator (0/1) & scenic view score (0-4)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Table Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by zipcode, bedrooms, price..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg pl-9 pr-3 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Showing {displayedHouses.length} of {sortedHouses.length} records</span>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-800/80 text-slate-300 font-semibold">
              <tr>
                <th onClick={() => handleSort('price')} className="p-3 cursor-pointer hover:text-white">
                  <div className="flex items-center gap-1">
                    <span>Price ($)</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th onClick={() => handleSort('bedrooms')} className="p-3 cursor-pointer hover:text-white">
                  <div className="flex items-center gap-1">
                    <span>Beds</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th onClick={() => handleSort('bathrooms')} className="p-3 cursor-pointer hover:text-white">
                  <div className="flex items-center gap-1">
                    <span>Baths</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th onClick={() => handleSort('sqft_living')} className="p-3 cursor-pointer hover:text-white">
                  <div className="flex items-center gap-1">
                    <span>Living Sqft</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th onClick={() => handleSort('grade')} className="p-3 cursor-pointer hover:text-white">
                  <div className="flex items-center gap-1">
                    <span>Grade</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th onClick={() => handleSort('floors')} className="p-3 cursor-pointer hover:text-white">
                  <div className="flex items-center gap-1">
                    <span>Floors</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th onClick={() => handleSort('yr_built')} className="p-3 cursor-pointer hover:text-white">
                  <div className="flex items-center gap-1">
                    <span>Built</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th onClick={() => handleSort('zipcode')} className="p-3 cursor-pointer hover:text-white">
                  <div className="flex items-center gap-1">
                    <span>Zipcode</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="p-3 text-right">Features</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono">
              {displayedHouses.map((h) => (
                <tr key={h.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-bold text-emerald-400">
                    ${h.price.toLocaleString()}
                  </td>
                  <td className="p-3 text-slate-300">{h.bedrooms}</td>
                  <td className="p-3 text-slate-300">{h.bathrooms}</td>
                  <td className="p-3 text-cyan-300">{h.sqft_living.toLocaleString()}</td>
                  <td className="p-3">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${h.grade >= 10 ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-300'}`}>
                      {h.grade}/13
                    </span>
                  </td>
                  <td className="p-3 text-slate-400">{h.floors}</td>
                  <td className="p-3 text-slate-400">{h.yr_built}</td>
                  <td className="p-3 text-blue-400 font-sans">{h.zipcode}</td>
                  <td className="p-3 text-right font-sans">
                    {h.waterfront === 1 && (
                      <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-medium mr-1">
                        Waterfront
                      </span>
                    )}
                    {h.view > 0 && (
                      <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-medium">
                        View {h.view}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-3 border-t border-slate-800 flex items-center justify-between text-xs">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 transition-colors"
            >
              Previous
            </button>
            <span className="text-slate-400">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
