const Dashboard = () => {
  const [data, setData] = useState();
  const [refreshInterval, setRefreshInterval] = useState(refreshInUrl || 0);
  const fetchMetrics = () => {
    // retrieve and then setData()
  }
  useEffect(() => {
    if (refreshInterval && refreshInterval > 0) {
      const interval = setInterval(fetchMetrics, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [refreshInterval]);
  return (
    <div>
      // dashboard content, including a dropdown for the
      // refresh interval, which calls setRefreshInterval()
    </div>
  );
}





Initial call to component — component is rendered for the 1st time
useEffect() is triggered — refreshInterval is 0, so no call to setInterval()
User selects a refresh interval (10s = 10000ms), setRefreshInterval(10000) triggers another call to the component function and a re-render
useEffect() from the 2nd component function call is triggered — refreshInterval is > 0, so setInterval() is now called and we return a function which will clear the created interval and which will be called whenever React unmounts the component.
fetchMetrics is called after 10s, component function called a 3rd time due to setData() being called
clearInterval() is called as React unmounts and re-renders the component
useEffect() from the 3rd component function call is triggered and a new setInterval() is created
(Fewer than 10s later) User selects a new refresh interval (30s), setRefreshInterval(30000) triggering a 4th call to the component function
clearInterval() is called as React re-renders the component (this occurs before the 10s timer has expired, preventing the fetchMetrics() call associated with that timer from ever being made)
useEffect() from the 4th component function call is triggered and a new setInterval() is created
fetchMetrics is called after 30s, component function called a 5th time due to setData() being called
fetchMetrics calls continue to be made every 30s and component is re-rendered as data changes
