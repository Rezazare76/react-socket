import { useEffect, useState, lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
const LazyAlert = lazy(() => import("../../components/Alert/Alert"));
const Layout = () => {
  const [offline, setOffline] = useState<string>("");
  // check user internet
  useEffect(() => {
    const handleOnline = () => {
      setOffline("");
    };
    const handleOffline = () => {
      setOffline("you are offline");
    };
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <main className="vw-100 vh-100 d-flex align-items-center justify-content-center overflow-auto">
      <Suspense fallback={<div>Loading...</div>}>
        <LazyAlert message={offline} />
      </Suspense>
      <Outlet />
    </main>
  );
};

export default Layout;
