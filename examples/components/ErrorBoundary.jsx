import React, { Component } from 'react';

/**
 * AI-Generated Error Boundary Component
 * Demonstrates proper error handling and user-friendly error states
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
    
    // You can also log to external services here
    // logErrorToService(error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  toggleDetails = () => {
    this.setState(prevState => ({
      showDetails: !prevState.showDetails
    }));
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h2 className="error-title">Oops! Something went wrong</h2>
            <p className="error-message">
              We're sorry, but something unexpected happened. 
              Our team has been notified and we're working on a fix.
            </p>
            
            <div className="error-actions">
              <button onClick={this.handleReset} className="retry-button">
                Try Again
              </button>
              <button onClick={() => window.location.reload()} className="reload-button">
                Reload Page
              </button>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <div className="error-details">
                <button onClick={this.toggleDetails} className="details-toggle">
                  {this.state.showDetails ? 'Hide Details' : 'Show Details'}
                </button>
                
                {this.state.showDetails && (
                  <div className="error-stack">
                    <h4>Error Details:</h4>
                    <pre>{this.state.error?.toString()}</pre>
                    {this.state.errorInfo?.componentStack && (
                      <div>
                        <h4>Component Stack:</h4>
                        <pre>{this.state.errorInfo.componentStack}</pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Functional Error Boundary using React 16.8+ hooks
 * Alternative to class-based error boundary
 */
const useErrorHandler = (errorCallback) => {
  const [error, setError] = React.useState(null);
  
  if (error) {
    throw error;
  }
  
  return {
    error,
    setError,
    clearError: () => setError(null)
  };
};

const FunctionalErrorBoundary = ({ children, fallback, onError }) => {
  const [hasError, setHasError] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleError = (error, errorInfo) => {
    setHasError(true);
    setError(error);
    
    if (onError) {
      onError(error, errorInfo);
    }
    
    // Log to external service
    console.error('Error in functional boundary:', error);
  };

  const resetError = () => {
    setHasError(false);
    setError(null);
  };

  if (hasError) {
    if (fallback) {
      return React.cloneElement(fallback, { error, resetError });
    }

    return (
      <div className="error-fallback">
        <h2>Something went wrong</h2>
        <p>{error?.message || 'An unexpected error occurred'}</p>
        <button onClick={resetError}>Try Again</button>
      </div>
    );
  }

  return children;
};

/**
 * Error Fallback Component
 * Can be used independently or with FunctionalErrorBoundary
 */
const ErrorFallback = ({ error, resetError, title = "Something went wrong" }) => {
  return (
    <div className="error-fallback">
      <div className="error-content">
        <div className="error-icon">😔</div>
        <h2>{title}</h2>
        <p className="error-message">
          {error?.message || 'An unexpected error occurred'}
        </p>
        {process.env.NODE_ENV === 'development' && error?.stack && (
          <details className="error-details">
            <summary>Error Stack Trace</summary>
            <pre className="error-stack">{error.stack}</pre>
          </details>
        )}
        <div className="error-actions">
          <button onClick={resetError} className="retry-button">
            Try Again
          </button>
          <button onClick={() => window.location.reload()} className="reload-button">
            Reload Page
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Example usage of ErrorBoundary
 */
class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <div className="app">
          <Header />
          <MainContent />
          <Footer />
        </div>
      </ErrorBoundary>
    );
  }
}

/**
 * Example with functional component
 */
const FunctionalApp = () => {
  const handleError = (error, errorInfo) => {
    // Send error to monitoring service
    console.error('App error:', error);
  };

  return (
    <FunctionalErrorBoundary onError={handleError}>
      <div className="app">
        <Header />
        <MainContent />
        <Footer />
      </div>
    </FunctionalErrorBoundary>
  );
};

/**
 * Component that might throw errors
 */
const UnstableComponent = () => {
  const [shouldError, setShouldError] = useState(false);
  
  if (shouldError) {
    throw new Error("This component has errored intentionally!");
  }
  
  return (
    <div>
      <h3>Unstable Component</h3>
      <button onClick={() => setShouldError(true)}>
        Trigger Error
      </button>
    </div>
  );
};

/**
 * Example with error logging service
 */
class LoggingErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log to external service
    this.logErrorToService(error, errorInfo);
  }

  logErrorToService = (error, errorInfo) => {
    // Example: Send to Sentry, LogRocket, or custom service
    const errorData = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      userId: this.getCurrentUserId()
    };

    // Send to your error logging service
    fetch('/api/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(errorData)
    }).catch(console.error);
  };

  getCurrentUserId = () => {
    // Get from your auth system
    return localStorage.getItem('userId') || 'anonymous';
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          error={this.state.error}
          resetError={() => this.setState({ hasError: false, error: null })}
          title="Application Error"
        />
      );
    }

    return this.props.children;
  }
}

export { 
  ErrorBoundary, 
  FunctionalErrorBoundary, 
  ErrorFallback, 
  LoggingErrorBoundary,
  useErrorHandler 
};