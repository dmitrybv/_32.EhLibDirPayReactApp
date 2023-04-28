import React from 'react';

interface ErrorBoundaryState
{
  hasError: boolean;
  ErrorText: Error | null;
}

///
///
///
export class ErrorBoundary extends React.Component<any, ErrorBoundaryState> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, ErrorText : null };
  }

  static getDerivedStateFromError(error: Error) : ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, ErrorText: error };
  }

  logComponentStackToMyService(componentStack: string)
  {

  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    this.logComponentStackToMyService(errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
      <div>
        <h1>Application Error!!!</h1>
        <br/>
        <div>{this.state.ErrorText?.message}</div>
        <br/>
        <div>{this.state.ErrorText?.stack}</div>
        {/* <span>{this.state.ErrorText} </span> */}
      </div>
      );
    }

    return this.props.children;
  }
}