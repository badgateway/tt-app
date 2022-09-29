import * as React from 'react';
import { Component, ErrorInfo } from 'react';

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Record<string, any>, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('Uncaught error: ', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <h3>An error occured. Please check the Javascript console for more information.</h3>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
