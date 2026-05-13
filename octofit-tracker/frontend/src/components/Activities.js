import React, { useCallback, useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const endpoint = `${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
  const url = `https://${endpoint}`;

  const fetchData = useCallback(() => {
    setIsLoading(true);
    console.log('Fetching Activities from:', url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const results = Array.isArray(data) ? data : (data.results || []);
        setActivities(results);
        console.log('Fetched Activities:', results);
      })
      .catch((err) => console.error('Error fetching activities:', err))
      .finally(() => setIsLoading(false));
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filtered = activities.filter((item) => JSON.stringify(item).toLowerCase().includes(search.toLowerCase()));

  const toText = (value) => {
    if (value === null || value === undefined) {
      return '-';
    }
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    return String(value);
  };

  return (
    <div className="card border-0 shadow-sm rounded-4">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
          <h2 className="h4 mb-0">Activities</h2>
          <div className="d-flex gap-2">
            <a className="btn btn-outline-secondary btn-sm" href={url} target="_blank" rel="noreferrer">Open API</a>
            <button type="button" className="btn btn-primary btn-sm" onClick={fetchData} disabled={isLoading}>
              {isLoading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>

        <form className="row g-2 mb-3" onSubmit={(e) => e.preventDefault()}>
          <div className="col-md-8">
            <input
              type="text"
              className="form-control"
              placeholder="Search activities"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <input className="form-control" value={`Total: ${filtered.length}`} readOnly />
          </div>
        </form>

        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Summary</th>
                <th scope="col" className="text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, idx) => (
                <tr key={item.id || idx}>
                  <td>{toText(item.id || idx + 1)}</td>
                  <td>{toText(item.name || item.activity_name || item.title || 'Activity')}</td>
                  <td>{toText(item.description || item.type || item.date || 'No summary')}</td>
                  <td className="text-end">
                    <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => setSelectedItem(item)}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedItem && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title h5">Activity Details</h3>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setSelectedItem(null)} />
                </div>
                <div className="modal-body">
                  <pre className="mb-0 small">{JSON.stringify(selectedItem, null, 2)}</pre>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedItem(null)}>Close</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" />
        </>
      )}
    </div>
  );
};

export default Activities;
