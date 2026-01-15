import React, { useState, useEffect } from 'react';

/**
 * AI-Generated Data Fetching Component
 * Demonstrates loading states, error handling, and data fetching patterns
 */
const DataFetcher = ({ 
  url, 
  method = 'GET', 
  headers = {}, 
  body = null,
  refreshInterval = null,
  onSuccess = null,
  onError = null,
  children 
}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState(null);

  const fetchData = async (showLoading = true) => {
    if (showLoading) {
      setLoading(true);
    }
    setError(null);

    try {
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        ...(body && { body: JSON.stringify(body) })
      };

      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      setLastFetch(new Date());
      
      if (onSuccess) {
        onSuccess(result);
      }
    } catch (err) {
      const errorMessage = err.message || 'Failed to fetch data';
      setError(errorMessage);
      
      if (onError) {
        onError(err);
      }
      
      console.error('Data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Set up automatic refresh if interval is provided
    let intervalId;
    if (refreshInterval && refreshInterval > 0) {
      intervalId = setInterval(() => {
        fetchData(false); // Don't show loading state for automatic refresh
      }, refreshInterval);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [url, method, JSON.stringify(headers), JSON.stringify(body), refreshInterval]);

  const refresh = () => {
    fetchData();
  };

  const clearData = () => {
    setData(null);
    setError(null);
    setLastFetch(null);
  };

  return children({
    data,
    loading,
    error,
    refresh,
    clearData,
    lastFetch
  });
};

/**
 * Example usage of DataFetcher component
 */
const UserProfile = ({ userId }) => {
  return (
    <DataFetcher
      url={`/api/users/${userId}`}
      onSuccess={(data) => console.log('User data loaded:', data)}
      onError={(error) => console.error('Failed to load user:', error)}
    >
      {({ data, loading, error, refresh }) => {
        if (loading) {
          return <div className="loading">Loading user profile...</div>;
        }

        if (error) {
          return (
            <div className="error">
              <p>Failed to load user profile</p>
              <button onClick={refresh}>Try Again</button>
            </div>
          );
        }

        if (!data) {
          return <div>No user data available</div>;
        }

        return (
          <div className="user-profile">
            <h2>{data.name}</h2>
            <p>{data.email}</p>
            <button onClick={refresh}>Refresh</button>
          </div>
        );
      }}
    </DataFetcher>
  );
};

/**
 * Example with automatic refresh
 */
const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Real-time Dashboard</h1>
      
      <DataFetcher
        url="/api/dashboard/metrics"
        refreshInterval={5000} // Refresh every 5 seconds
      >
        {({ data, loading, error }) => {
          if (loading && !data) {
            return <div className="loading">Loading dashboard...</div>;
          }

          if (error && !data) {
            return <div className="error">Failed to load dashboard data</div>;
          }

          if (!data) {
            return <div>No data available</div>;
          }

          return (
            <div className="metrics">
              <div className="metric">
                <h3>Active Users</h3>
                <p>{data.activeUsers}</p>
              </div>
              <div className="metric">
                <h3>Revenue</h3>
                <p>${data.revenue}</p>
              </div>
              <div className="metric">
                <h3>Orders</h3>
                <p>{data.orders}</p>
              </div>
              {loading && <div className="refresh-indicator">Updating...</div>}
            </div>
          );
        }}
      </DataFetcher>
    </div>
  );
};

/**
 * Example with POST request
 */
const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // This would be used with DataFetcher for the POST request
    const postData = { title, content };
    
    // In a real app, you'd use DataFetcher here
    console.log('Creating post:', postData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Post content"
        required
      />
      <button type="submit">Create Post</button>
    </form>
  );
};

export { DataFetcher, UserProfile, Dashboard, CreatePost };